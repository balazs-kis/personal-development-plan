using Dapper;
using PersonalDevelopmentPlan.Api.Infrastructure.Database.Connections;

namespace PersonalDevelopmentPlan.Api.Infrastructure.Database;

internal static class DependencyInjection
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, string connectionString)
    {
        DefaultTypeMap.MatchNamesWithUnderscores = true;
        SqlMapper.AddTypeHandler(new GuidAsTextTypeHandler());

        services.AddSingleton<IDbConnectionFactory>(_ => new SqliteConnectionFactory(connectionString));

        return services;
    }
}
