using FastEndpoints;
using PersonalDevelopmentPlan.Api.Infrastructure.Database;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("AppDb")
    ?? throw new InvalidOperationException("Missing connection string 'AppDb'.");

builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddDatabase(connectionString);
builder.Services.AddFastEndpoints();
builder.Services.AddOpenApi();

var app = builder.Build();

var migrationResult = DatabaseInitializer.Migrate(connectionString);
if (!migrationResult.Successful)
{
    app.Logger.LogCritical(migrationResult.Error, "Database migration failed.");
    return 1;
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseFastEndpoints();

app.Run();
return 0;
