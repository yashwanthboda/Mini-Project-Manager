# Dockerfile for ASP.NET Core Backend
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["ProjectManager.csproj", "./"]
RUN dotnet restore "ProjectManager.csproj"
COPY . .
RUN dotnet build "ProjectManager.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ProjectManager.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Create directory for SQLite database
RUN mkdir -p /app/data

# Set environment variable for database path
ENV ConnectionStrings__DefaultConnection="Data Source=/app/data/projectmanager.db"

ENTRYPOINT ["dotnet", "ProjectManager.dll"]
