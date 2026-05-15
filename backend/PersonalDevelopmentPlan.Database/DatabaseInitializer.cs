using DbUp;
using DbUp.Engine;

namespace PersonalDevelopmentPlan.Database;

public static class DatabaseInitializer
{
    public static DatabaseUpgradeResult Migrate(string connectionString)
    {
        EnsureDirectoryExists(connectionString);

        var upgrader = DeployChanges.To
            .SqliteDatabase(connectionString)
            .WithScriptsEmbeddedInAssembly(typeof(DatabaseInitializer).Assembly)
            .LogToConsole()
            .Build();

        return upgrader.PerformUpgrade();
    }

    private static void EnsureDirectoryExists(string connectionString)
    {
        var builder = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder(connectionString);
        var dataSource = builder.DataSource;
        var dir = Path.GetDirectoryName(Path.GetFullPath(dataSource));
        if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }
    }
}
