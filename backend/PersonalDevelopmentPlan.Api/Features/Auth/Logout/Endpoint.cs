using FastEndpoints;
using Microsoft.AspNetCore.Authentication;
using PersonalDevelopmentPlan.Api.Infrastructure.Authentication;

namespace PersonalDevelopmentPlan.Api.Features.Auth.Logout;

internal sealed class Endpoint : EndpointWithoutRequest
{
    public override void Configure()
    {
        Post("/auth/logout");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        await HttpContext.SignOutAsync(DependencyInjection.CookieScheme);
        await Send.NoContentAsync(cancellation: ct);
    }
}
