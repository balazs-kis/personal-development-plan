using System.Data;
using Microsoft.Data.Sqlite;

namespace PersonalDevelopmentPlan.Api.Infrastructure.Database.Connections;

internal sealed class SqliteConnectionFactory : IDbConnectionFactory
{
    private readonly string _connectionString;

    public SqliteConnectionFactory(string connectionString)
    {
        _connectionString = connectionString;
    }

    public IDbConnection Create()
    {
        var conn = new SqliteConnection(_connectionString);
        conn.Open();
        return conn;
    }
}
