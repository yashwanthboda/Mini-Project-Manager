# Smart Scheduler Quick Start Script for Windows
# Run this script with: .\quickstart.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Smart Scheduler - Quick Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Ensure we're in the correct directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath
Write-Host "Working directory: $scriptPath" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is NOT installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Red
    Write-Host "After installation, restart this script." -ForegroundColor Red
    pause
    exit
}

Write-Host ""

# Check if npm is installed
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm is installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm is NOT installed!" -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Installing Dependencies" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Backend installation failed!" -ForegroundColor Red
    pause
    exit
}
Write-Host "✓ Backend dependencies installed" -ForegroundColor Green

Write-Host ""

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location client
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Frontend installation failed!" -ForegroundColor Red
    Set-Location ..
    pause
    exit
}
Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
Set-Location ..

Write-Host ""
Write-Host "Returning to project root directory..." -ForegroundColor Yellow
Set-Location "C:\Users\yashr\Project 2"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Installation Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "To start the application, run:" -ForegroundColor Yellow
Write-Host "  npm run dev-all" -ForegroundColor White
Write-Host ""
Write-Host "Or run backend and frontend separately:" -ForegroundColor Yellow
Write-Host "  Terminal 1: npm run dev" -ForegroundColor White
Write-Host "  Terminal 2: npm run client" -ForegroundColor White
Write-Host ""
Write-Host "The application will be available at:" -ForegroundColor Yellow
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "  Backend:  http://localhost:3000" -ForegroundColor White
Write-Host ""

$response = Read-Host "Would you like to start the application now? (Y/N)"
if ($response -eq "Y" -or $response -eq "y") {
    Write-Host ""
    Write-Host "Starting Smart Scheduler..." -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop the servers" -ForegroundColor Yellow
    Write-Host ""
    npm run dev-all
}

Write-Host ""
Write-Host "Thank you for using Smart Scheduler!" -ForegroundColor Cyan
