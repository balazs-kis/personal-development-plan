using Dapper;
using FastEndpoints;
using FluentValidation;
using PersonalDevelopmentPlan.Api.Infrastructure.Authentication;
using PersonalDevelopmentPlan.Api.Infrastructure.Database.Connections;

namespace PersonalDevelopmentPlan.Api.Features.Progress.SetCompletion;

internal sealed record SetCompletionRequest(string Slug, bool Completed);

internal sealed class SetCompletionValidator : Validator<SetCompletionRequest>
{
    public SetCompletionValidator()
    {
        RuleFor(x => x.Slug).ValidSlug();
    }
}

internal sealed class Endpoint(IDbConnectionFactory connFactory, TimeProvider time) : Endpoint<SetCompletionRequest>
{
    public override void Configure()
    {
        Put("/api/progress/completion");
    }

    public override async Task HandleAsync(SetCompletionRequest req, CancellationToken ct)
    {
        var userId = User.GetUserId();
        var now = time.GetUtcNow().UtcDateTime;

        using var conn = connFactory.Create();
        var lessonId = await Lessons.EnsureIdAsync(conn, req.Slug, now, ct);

        if (req.Completed)
        {
            // Completing before the view has been recorded creates the state row with zero views;
            // re-completing keeps the original completion time.
            await conn.ExecuteAsync(new CommandDefinition(
                """
                INSERT INTO user_lesson_state (user_id, lesson_id, first_viewed_at, last_viewed_at, view_count, completed_at)
                VALUES (@UserId, @LessonId, @Now, @Now, 0, @Now)
                ON CONFLICT(user_id, lesson_id) DO UPDATE SET
                    completed_at = COALESCE(completed_at, excluded.completed_at)
                """,
                new { UserId = userId, LessonId = lessonId, Now = now },
                cancellationToken: ct));
        }
        else
        {
            await conn.ExecuteAsync(new CommandDefinition(
                "UPDATE user_lesson_state SET completed_at = NULL WHERE user_id = @UserId AND lesson_id = @LessonId",
                new { UserId = userId, LessonId = lessonId },
                cancellationToken: ct));
        }

        await Send.NoContentAsync(cancellation: ct);
    }
}
