using System.Data;
using System.Text.RegularExpressions;
using Dapper;
using FluentValidation;

namespace PersonalDevelopmentPlan.Api.Features.Progress;

internal static partial class Lessons
{
    // Matches Astro content ids, e.g. "01-advanced-dotnet/0101-modern-csharp-features/010101-pattern-matching".
    [GeneratedRegex("^[a-z0-9]+(?:-[a-z0-9]+)*(?:/[a-z0-9]+(?:-[a-z0-9]+)*)*$")]
    private static partial Regex SlugRegex();

    public const int MaxSlugLength = 200;

    public static IRuleBuilderOptions<T, string> ValidSlug<T>(this IRuleBuilder<T, string> rule) =>
        rule
            .NotEmpty()
            .MaximumLength(MaxSlugLength)
            .Matches(SlugRegex())
            .WithMessage("Slug must be lowercase path segments of letters, digits and dashes.");

    // Lessons are created lazily on first reference; the backend never syncs with the content build.
    public static async Task<Guid> EnsureIdAsync(IDbConnection conn, string slug, DateTime now, CancellationToken ct) =>
        await conn.QuerySingleAsync<Guid>(new CommandDefinition(
            """
            INSERT INTO lessons (id, slug, created_at) VALUES (@Id, @Slug, @Now)
            ON CONFLICT(slug) DO NOTHING;
            SELECT id FROM lessons WHERE slug = @Slug;
            """,
            new { Id = Guid.CreateVersion7(), Slug = slug, Now = now },
            cancellationToken: ct));
}
