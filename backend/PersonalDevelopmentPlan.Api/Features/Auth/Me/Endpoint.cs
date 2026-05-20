using System.Security.Claims;
using FastEndpoints;

namespace PersonalDevelopmentPlan.Api.Features.Auth.Me;

internal sealed record MeResponse(bool Authenticated, Guid? Id, string? Name, string? Email, string? AvatarUrl);

internal sealed class Endpoint : EndpointWithoutRequest<MeResponse>
{
    public override void Configure()
    {
        Get("/api/me");
        AllowAnonymous();
    }

    public override Task HandleAsync(CancellationToken ct)
    {
        var user = HttpContext.User;
        if (user.Identity?.IsAuthenticated != true)
        {
            return Send.OkAsync(new MeResponse(false, null, null, null, null), cancellation: ct);
        }

        var idClaim = user.FindFirstValue(ClaimTypes.NameIdentifier);
        var id = Guid.TryParse(idClaim, out var parsed) ? parsed : (Guid?)null;
        var name = user.FindFirstValue(ClaimTypes.Name);
        var email = user.FindFirstValue(ClaimTypes.Email);
        var avatarUrl = user.FindFirstValue("avatar_url");

        return Send.OkAsync(new MeResponse(true, id, name, email, avatarUrl), cancellation: ct);
    }
}
