using FastEndpoints;

namespace PersonalDevelopmentPlan.Api.Features.Auth.Me;

internal sealed record MeResponse(bool Authenticated);

internal sealed class Endpoint : EndpointWithoutRequest<MeResponse>
{
    public override void Configure()
    {
        Get("/api/me");
        AllowAnonymous();
    }

    public override Task HandleAsync(CancellationToken ct)
    {
        return Send.OkAsync(new MeResponse(false), cancellation: ct);
    }
}
