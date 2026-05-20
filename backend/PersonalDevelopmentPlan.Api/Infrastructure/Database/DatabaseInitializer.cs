using DbUp;

namespace PersonalDevelopmentPlan.Api.Infrastructure.Database;

internal static class DatabaseInitializer
{
    public static bool Migrate(this WebApplication app)
    {
        var connectionString = app.Configuration.GetAppDbConnectionString();
        EnsureDirectoryExists(connectionString);

        var upgrader = DeployChanges.To
            .SqliteDatabase(connectionString)
            .WithScriptsEmbeddedInAssembly(typeof(DatabaseInitializer).Assembly)
            .LogToConsole()
            .Build();

        var result = upgrader.PerformUpgrade();
        if (!result.Successful)
        {
            app.Logger.LogCritical(result.Error, "Database migration failed.");
            return false;
        }
        return true;
    }

    private static void EnsureDirectoryExists(string connectionString)
    {
        var builder = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder(connectionString);
        var dir = Path.GetDirectoryName(Path.GetFullPath(builder.DataSource));
        if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }
    }
}
