using Dapper;
using PersonalDevelopmentPlan.Api.Infrastructure.Database.Connections;

namespace PersonalDevelopmentPlan.Api.Infrastructure.Database;

internal static class DependencyInjection
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetAppDbConnectionString();

        DefaultTypeMap.MatchNamesWithUnderscores = true;
        SqlMapper.AddTypeHandler(new GuidAsTextTypeHandler());

        services.AddSingleton<IDbConnectionFactory>(_ => new SqliteConnectionFactory(connectionString));

        return services;
    }

    internal static string GetAppDbConnectionString(this IConfiguration configuration) =>
        configuration.GetConnectionString("AppDb")
            ?? throw new InvalidOperationException("Missing connection string 'AppDb'.");
}
