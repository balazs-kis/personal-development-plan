# Single image for the whole site: the Astro build is served as static files by the ASP.NET app.
# Build from the repo root:  docker build -t pdp .

# --- Frontend: static site -> /src/frontend/dist
FROM --platform=$BUILDPLATFORM node:24-slim AS frontend
WORKDIR /src/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# --- Backend: publish the API
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:10.0 AS backend
ARG TARGETARCH
WORKDIR /src/backend
COPY backend/PersonalDevelopmentPlan.Api/PersonalDevelopmentPlan.Api.csproj PersonalDevelopmentPlan.Api/
RUN dotnet restore PersonalDevelopmentPlan.Api/PersonalDevelopmentPlan.Api.csproj -a $TARGETARCH
COPY backend/ ./
# -a: only the target's native libraries (SQLite otherwise ships builds for ~20 platforms, 33 MB).
RUN dotnet publish PersonalDevelopmentPlan.Api/PersonalDevelopmentPlan.Api.csproj -c Release -a $TARGETARCH --self-contained false -o /app/publish --no-restore /p:UseAppHost=false
# The runtime image has no shell, so the data directory is prepared here.
RUN mkdir -p /app/data

# --- Runtime: chiseled = distroless Ubuntu with just the .NET runtime; no shell or package manager,
# runs as the non-root "app" user. Has no ICU, so the app runs with invariant globalization (it only
# uses invariant culture anyway).
FROM mcr.microsoft.com/dotnet/aspnet:10.0-noble-chiseled AS final
WORKDIR /app
COPY --from=backend /app/publish ./
COPY --from=frontend /src/frontend/dist ./wwwroot
# SQLite DB and DataProtection keys live here (appsettings: data/app.db, data/keys); mount a volume on it.
# Owned by the app user so a fresh named volume inherits that ownership.
COPY --from=backend --chown=$APP_UID:$APP_UID /app/data ./data
VOLUME /app/data
# Always runs behind a reverse proxy (Caddy) that terminates TLS: trust its X-Forwarded-For/-Proto,
# so OAuth callback URLs are https and cookies get the Secure flag. Only safe because the container
# port is never published publicly (see deploy/compose.yaml).
ENV ASPNETCORE_FORWARDEDHEADERS_ENABLED=true
EXPOSE 8080
ENTRYPOINT ["dotnet", "PersonalDevelopmentPlan.Api.dll"]
