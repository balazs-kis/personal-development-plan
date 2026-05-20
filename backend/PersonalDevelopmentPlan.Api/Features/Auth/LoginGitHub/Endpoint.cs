using FastEndpoints;
using Microsoft.AspNetCore.Authentication;
using PersonalDevelopmentPlan.Api.Infrastructure.Authentication;

namespace PersonalDevelopmentPlan.Api.Features.Auth.LoginGitHub;

internal sealed class Endpoint : EndpointWithoutRequest
{
    public override void Configure()
    {
        Get("/auth/login/github");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var returnUrl = Query<string>("returnUrl", isRequired: false) ?? "/";
        var props = new AuthenticationProperties { RedirectUri = returnUrl };
        await Send.ResultAsync(Results.Challenge(props, [DependencyInjection.GitHubScheme]));
    }
}
