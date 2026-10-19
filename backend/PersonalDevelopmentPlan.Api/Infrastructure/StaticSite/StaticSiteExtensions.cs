using Microsoft.Net.Http.Headers;

namespace PersonalDevelopmentPlan.Api.Infrastructure.StaticSite;

/// <summary>
/// Serves the Astro build from wwwroot (copied in by the Dockerfile). In development wwwroot doesn't
/// exist and the Astro dev server serves the site instead, so this is a no-op there.
/// </summary>
internal static class StaticSiteExtensions
{
    private const string Immutable = "public, max-age=31536000, immutable";
    private const string OneDay = "public, max-age=86400";
    private const string Revalidate = "no-cache";

    public static WebApplication UseStaticSite(this WebApplication app)
    {
        // /some/lesson -> /some/lesson/index.html. Astro emits only absolute URLs, so the default
        // redirect to /some/lesson/ would just cost every navigation an extra round trip.
        app.UseDefaultFiles(new DefaultFilesOptions { RedirectToAppendTrailingSlash = false });
        app.UseStaticFiles(new StaticFileOptions
        {
            RedirectToAppendTrailingSlash = false,
            OnPrepareResponse = context =>
                context.Context.Response.Headers[HeaderNames.CacheControl] = CacheControlFor(context.Context.Request),
        });

        return app;
    }

    private static string CacheControlFor(HttpRequest request)
    {
        var path = request.Path.Value!;

        // Content-hashed by Astro (/_astro/Name.Hash.js), or versioned by the page that references it
        // (/sidebar.js?v=hash): a changed file always gets a new URL, so these never need rechecking.
        if (path.StartsWith("/_astro/", StringComparison.Ordinal) || request.Query.ContainsKey("v"))
        {
            return Immutable;
        }

        // Pages: always revalidate, so a deploy shows up immediately. Unchanged pages cost a 304
        // (ETag / Last-Modified are sent by the static file middleware).
        if (path.EndsWith(".html", StringComparison.Ordinal))
        {
            return Revalidate;
        }

        // Unversioned files from public/ (icons, background): rarely change, a day of staleness is fine.
        return OneDay;
    }
}
