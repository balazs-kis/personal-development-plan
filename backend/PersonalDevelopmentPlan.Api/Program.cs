using FastEndpoints;
using PersonalDevelopmentPlan.Api.Infrastructure.Authentication;
using PersonalDevelopmentPlan.Api.Infrastructure.Cors;
using PersonalDevelopmentPlan.Api.Infrastructure.Database;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddHttpClient();
builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddAppAuthentication(builder.Configuration);
builder.Services.AddAppCors(builder.Configuration);
builder.Services.AddFastEndpoints();
builder.Services.AddOpenApi();

var app = builder.Build();

if (!app.Migrate())
{
    return 1;
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors(PersonalDevelopmentPlan.Api.Infrastructure.Cors.DependencyInjection.DevPolicy);
}

app.UseAuthentication();
app.UseAuthorization();
app.UseFastEndpoints();

app.Run();
return 0;
