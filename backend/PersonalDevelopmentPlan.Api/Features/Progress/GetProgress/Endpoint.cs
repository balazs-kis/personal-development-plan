using Dapper;
using FastEndpoints;
using PersonalDevelopmentPlan.Api.Infrastructure.Authentication;
using PersonalDevelopmentPlan.Api.Infrastructure.Database;
using PersonalDevelopmentPlan.Api.Infrastructure.Database.Connections;

namespace PersonalDevelopmentPlan.Api.Features.Progress.GetProgress;

internal sealed record LessonProgress(
    string Slug,
    DateTime FirstViewedAt,
    DateTime LastViewedAt,
    int ViewCount,
    DateTime? CompletedAt);

internal sealed record GetProgressResponse(IReadOnlyList<LessonProgress> Lessons);

// Raw SQLite column types; Dapper won't convert TEXT/INTEGER into the response record's ctor parameters.
internal sealed record LessonProgressRow(
    string Slug,
    string FirstViewedAt,
    string LastViewedAt,
    long ViewCount,
    string? CompletedAt);

internal sealed class Endpoint(IDbConnectionFactory connFactory) : EndpointWithoutRequest<GetProgressResponse>
{
    public override void Configure()
    {
        Get("/api/progress");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = User.GetUserId();

        using var conn = connFactory.Create();
        var rows = await conn.QueryAsync<LessonProgressRow>(new CommandDefinition(
            """
            SELECT l.slug, s.first_viewed_at, s.last_viewed_at, s.view_count, s.completed_at
            FROM user_lesson_state s
            JOIN lessons l ON l.id = s.lesson_id
            WHERE s.user_id = @UserId
            ORDER BY s.last_viewed_at DESC
            """,
            new { UserId = userId },
            cancellationToken: ct));

        var lessons = rows
            .Select(r => new LessonProgress(
                r.Slug,
                SqliteTimestamp.Parse(r.FirstViewedAt),
                SqliteTimestamp.Parse(r.LastViewedAt),
                (int)r.ViewCount,
                SqliteTimestamp.ParseNullable(r.CompletedAt)))
            .ToList();

        await Send.OkAsync(new GetProgressResponse(lessons), cancellation: ct);
    }
}
