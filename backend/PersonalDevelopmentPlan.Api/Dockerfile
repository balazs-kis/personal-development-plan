FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["PersonalDevelopmentPlan.Api/PersonalDevelopmentPlan.Api.csproj", "PersonalDevelopmentPlan.Api/"]
RUN dotnet restore "PersonalDevelopmentPlan.Api/PersonalDevelopmentPlan.Api.csproj"
COPY . .
WORKDIR "/src/PersonalDevelopmentPlan.Api"
RUN dotnet build "./PersonalDevelopmentPlan.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./PersonalDevelopmentPlan.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PersonalDevelopmentPlan.Api.dll"]
