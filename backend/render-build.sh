#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install .NET SDK if needed (Render provides this)
dotnet restore
dotnet publish -c Release -o out
