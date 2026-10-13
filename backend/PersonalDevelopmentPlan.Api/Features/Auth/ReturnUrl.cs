namespace PersonalDevelopmentPlan.Api.Features.Auth;

internal static class ReturnUrl
{
    // Only same-site paths are allowed, so the login endpoints can't be used as an open redirect.
    // "//host" and "/\host" are protocol-relative URLs in browsers, so they're rejected too.
    public static string Sanitize(string? returnUrl) =>
        returnUrl is not null
        && returnUrl.StartsWith('/')
        && !returnUrl.StartsWith("//")
        && !returnUrl.StartsWith("/\\")
            ? returnUrl
            : "/";
}
