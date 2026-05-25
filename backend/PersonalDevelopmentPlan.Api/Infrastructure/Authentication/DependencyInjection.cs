using System.Security.Claims;
using AspNet.Security.OAuth.GitHub;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.DataProtection;
using PersonalDevelopmentPlan.Api.Features.Auth;
using PersonalDevelopmentPlan.Api.Infrastructure.Database.Connections;

namespace PersonalDevelopmentPlan.Api.Infrastructure.Authentication;

internal static class DependencyInjection
{
    public const string CookieScheme = "pdp.cookie";
    public const string GoogleScheme = GoogleDefaults.AuthenticationScheme;
    public const string GitHubScheme = GitHubAuthenticationDefaults.AuthenticationScheme;

    public static IServiceCollection AddAppAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var keysPath = configuration["DataProtection:KeysPath"]!;
        Directory.CreateDirectory(keysPath);

        services
            .AddDataProtection()
            .PersistKeysToFileSystem(new DirectoryInfo(keysPath))
            .SetApplicationName("personal-development-plan");

        services
            .AddAuthentication(CookieScheme)
            .AddCookie(CookieScheme, options =>
            {
                options.Cookie.Name = "pdp_auth";
                options.Cookie.HttpOnly = true;
                options.Cookie.SameSite = SameSiteMode.Lax;
                options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
                options.ExpireTimeSpan = TimeSpan.FromDays(30);
                options.SlidingExpiration = true;

                options.Events.OnRedirectToLogin = ctx =>
                {
                    ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    return Task.CompletedTask;
                };
                options.Events.OnRedirectToAccessDenied = ctx =>
                {
                    ctx.Response.StatusCode = StatusCodes.Status403Forbidden;
                    return Task.CompletedTask;
                };
            })
            .AddGoogle(GoogleScheme, options =>
            {
                options.ClientId = configuration["Authentication:Google:ClientId"]!;
                options.ClientSecret = configuration["Authentication:Google:ClientSecret"]!;
                options.CallbackPath = "/auth/callback/google";
                options.SignInScheme = CookieScheme;
                options.Events.OnCreatingTicket = ctx => ProcessTicketAsync(ctx, GoogleScheme);
            })
            .AddGitHub(GitHubScheme, options =>
            {
                options.ClientId = configuration["Authentication:GitHub:ClientId"]!;
                options.ClientSecret = configuration["Authentication:GitHub:ClientSecret"]!;
                options.CallbackPath = "/auth/callback/github";
                options.SignInScheme = CookieScheme;
                options.Scope.Add("user:email");
                options.Events.OnCreatingTicket = ctx => ProcessTicketAsync(ctx, GitHubScheme);
            });

        services.AddAuthorization();
        return services;
    }

    private static async Task ProcessTicketAsync(OAuthCreatingTicketContext ctx, string provider)
    {
        var ct = ctx.HttpContext.RequestAborted;
        var sp = ctx.HttpContext.RequestServices;
        var connFactory = sp.GetRequiredService<IDbConnectionFactory>();
        var time = sp.GetRequiredService<TimeProvider>();
        var httpFactory = sp.GetRequiredService<IHttpClientFactory>();

        var providerUserId = ctx.Identity?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrWhiteSpace(providerUserId))
        {
            ctx.Fail("OAuth provider did not return a user identifier.");
            return;
        }

        var email = ctx.Identity!.FindFirst(ClaimTypes.Email)?.Value;
        var displayName = ctx.Identity.FindFirst(ClaimTypes.Name)?.Value;
        var avatarUrl = provider switch
        {
            GoogleScheme => ctx.User.TryGetProperty("picture", out var p) ? p.GetString() : null,
            GitHubScheme => ctx.User.TryGetProperty("avatar_url", out var a) ? a.GetString() : null,
            _ => null,
        };

        var emailVerified = !string.IsNullOrEmpty(email) && provider switch
        {
            GoogleScheme => ctx.User.TryGetProperty("email_verified", out var ev) && ev.GetBoolean(),
            // GitHub only marks a verified email as the user's "primary" email,
            // and the OAuth library returns the primary one when user:email scope is requested.
            GitHubScheme => true,
            _ => false,
        };

        if (string.IsNullOrEmpty(avatarUrl) && emailVerified)
        {
            avatarUrl = await GravatarLookup.TryGetUrlAsync(httpFactory.CreateClient(), email!, ct);
        }

        using var conn = connFactory.Create();
        var userId = await LoginOrLink.ExecuteAsync(
            conn, time, provider, providerUserId, email, emailVerified, displayName, avatarUrl, ct);

        var identity = new ClaimsIdentity(CookieScheme);
        identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, userId.ToString()));
        if (!string.IsNullOrEmpty(displayName)) identity.AddClaim(new Claim(ClaimTypes.Name, displayName));
        if (!string.IsNullOrEmpty(email)) identity.AddClaim(new Claim(ClaimTypes.Email, email));
        if (!string.IsNullOrEmpty(avatarUrl)) identity.AddClaim(new Claim("avatar_url", avatarUrl));

        ctx.Principal = new ClaimsPrincipal(identity);
    }
}
