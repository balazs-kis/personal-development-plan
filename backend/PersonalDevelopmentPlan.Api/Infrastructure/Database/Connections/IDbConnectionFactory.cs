using System.Data;

namespace PersonalDevelopmentPlan.Api.Infrastructure.Database.Connections;

internal interface IDbConnectionFactory
{
    IDbConnection Create();
}
