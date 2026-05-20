using System.Data;
using Dapper;

namespace PersonalDevelopmentPlan.Api.Features.Auth;

internal static class LoginOrLink
{
    public static async Task<Guid> ExecuteAsync(
        IDbConnection conn,
        TimeProvider time,
        string provider,
        string providerUserId,
        string? providerEmail,
        bool emailVerified,
        string? displayName,
        string? avatarUrl,
        CancellationToken ct)
    {
        var now = time.GetUtcNow().UtcDateTime;

        var existingUserId = await conn.QuerySingleOrDefaultAsync<Guid?>(new CommandDefinition(
            "SELECT user_id FROM identities WHERE provider = @Provider AND provider_user_id = @ProviderUserId",
            new { Provider = provider, ProviderUserId = providerUserId },
            cancellationToken: ct));

        if (existingUserId.HasValue)
        {
            await conn.ExecuteAsync(new CommandDefinition(
                "UPDATE users SET last_login_at = @Now WHERE id = @Id",
                new { Id = existingUserId.Value, Now = now },
                cancellationToken: ct));
            return existingUserId.Value;
        }

        Guid userId;
        if (emailVerified && !string.IsNullOrWhiteSpace(providerEmail))
        {
            var matchingUserId = await conn.QuerySingleOrDefaultAsync<Guid?>(new CommandDefinition(
                "SELECT id FROM users WHERE email = @Email",
                new { Email = providerEmail },
                cancellationToken: ct));

            if (matchingUserId.HasValue)
            {
                userId = matchingUserId.Value;
                await conn.ExecuteAsync(new CommandDefinition(
                    "UPDATE users SET last_login_at = @Now WHERE id = @Id",
                    new { Id = userId, Now = now },
                    cancellationToken: ct));
            }
            else
            {
                userId = await CreateUserAsync(conn, providerEmail, displayName, avatarUrl, now, ct);
            }
        }
        else
        {
            userId = await CreateUserAsync(conn, null, displayName, avatarUrl, now, ct);
        }

        await conn.ExecuteAsync(new CommandDefinition(
            """
            INSERT INTO identities (id, user_id, provider, provider_user_id, provider_email, linked_at)
            VALUES (@Id, @UserId, @Provider, @ProviderUserId, @ProviderEmail, @Now)
            """,
            new
            {
                Id = Guid.CreateVersion7(),
                UserId = userId,
                Provider = provider,
                ProviderUserId = providerUserId,
                ProviderEmail = providerEmail,
                Now = now,
            },
            cancellationToken: ct));

        return userId;
    }

    private static async Task<Guid> CreateUserAsync(
        IDbConnection conn,
        string? email,
        string? displayName,
        string? avatarUrl,
        DateTime now,
        CancellationToken ct)
    {
        var userId = Guid.CreateVersion7();
        await conn.ExecuteAsync(new CommandDefinition(
            """
            INSERT INTO users (id, email, display_name, avatar_url, created_at, last_login_at)
            VALUES (@Id, @Email, @DisplayName, @AvatarUrl, @Now, @Now)
            """,
            new { Id = userId, Email = email, DisplayName = displayName, AvatarUrl = avatarUrl, Now = now },
            cancellationToken: ct));
        return userId;
    }
}
