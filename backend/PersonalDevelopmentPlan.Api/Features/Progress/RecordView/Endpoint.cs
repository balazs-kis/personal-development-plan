using Dapper;
using FastEndpoints;
using FluentValidation;
using PersonalDevelopmentPlan.Api.Infrastructure.Authentication;
using PersonalDevelopmentPlan.Api.Infrastructure.Database.Connections;

namespace PersonalDevelopmentPlan.Api.Features.Progress.RecordView;

internal sealed record RecordViewRequest(string Slug);

internal sealed class RecordViewValidator : Validator<RecordViewRequest>
{
    public RecordViewValidator()
    {
        RuleFor(x => x.Slug).ValidSlug();
    }
}

// The frontend only calls this after the user has dwelled on a lesson for a few seconds,
// so every call counts as a view.
internal sealed class Endpoint(IDbConnectionFactory connFactory, TimeProvider time) : Endpoint<RecordViewRequest>
{
    public override void Configure()
    {
        Post("/api/progress/views");
    }

    public override async Task HandleAsync(RecordViewRequest req, CancellationToken ct)
    {
        var userId = User.GetUserId();
        var now = time.GetUtcNow().UtcDateTime;

        using var conn = connFactory.Create();
        var lessonId = await Lessons.EnsureIdAsync(conn, req.Slug, now, ct);

        await conn.ExecuteAsync(new CommandDefinition(
            """
            INSERT INTO user_lesson_state (user_id, lesson_id, first_viewed_at, last_viewed_at, view_count)
            VALUES (@UserId, @LessonId, @Now, @Now, 1)
            ON CONFLICT(user_id, lesson_id) DO UPDATE SET
                last_viewed_at = excluded.last_viewed_at,
                view_count = view_count + 1
            """,
            new { UserId = userId, LessonId = lessonId, Now = now },
            cancellationToken: ct));

        await Send.NoContentAsync(cancellation: ct);
    }
}
