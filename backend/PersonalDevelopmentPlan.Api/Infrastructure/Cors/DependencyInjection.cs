namespace PersonalDevelopmentPlan.Api.Infrastructure.Cors;

internal static class DependencyInjection
{
    public const string DevPolicy = "pdp.dev-cors";

    public static IServiceCollection AddAppCors(this IServiceCollection services, IConfiguration configuration)
    {
        var allowedOrigins = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()!;

        services.AddCors(options =>
        {
            options.AddPolicy(DevPolicy, policy =>
            {
                policy
                    .WithOrigins(allowedOrigins)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

        return services;
    }
}
