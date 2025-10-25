# Complete Project Manager Setup and Run Script
# This script will start all three services

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Mini Project Manager - Launcher" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check .NET installation
Write-Host "Checking .NET installation..." -ForegroundColor Yellow
try {
    $dotnetVersion = dotnet --version
    Write-Host "✓ .NET is installed: $dotnetVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ .NET is NOT installed!" -ForegroundColor Red
    Write-Host "Please install .NET 8 SDK from: https://dotnet.microsoft.com/download/dotnet/8.0" -ForegroundColor Red
    pause
    exit
}

Write-Host ""

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is NOT installed!" -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Starting All Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = "C:\Users\yashr\Project 2"

Write-Host "Starting .NET API (Project Manager Backend) on port 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\backend'; dotnet run"
Start-Sleep -Seconds 2

Write-Host "Starting Node.js API (Smart Scheduler) on port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot'; npm run dev"
Start-Sleep -Seconds 2

Write-Host "Starting React Frontend on port 5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot'; npm run client"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   All Services Starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Opening in 5 seconds..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Services:" -ForegroundColor Cyan
Write-Host "  .NET API:        http://localhost:5000/swagger" -ForegroundColor White
Write-Host "  Node.js API:     http://localhost:3000" -ForegroundColor White
Write-Host "  React Frontend:  http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to open the application in your browser..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "To stop services, close the PowerShell windows or press Ctrl+C in each." -ForegroundColor Yellow
