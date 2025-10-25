# Quick Deployment Setup Script
# Run this script to prepare your project for deployment

Write-Host "🚀 Mini Project Manager - Deployment Setup" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Check if in correct directory
if (-not (Test-Path "client") -or -not (Test-Path "backend")) {
    Write-Host "❌ Error: Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

Write-Host "Step 1: Installing client dependencies..." -ForegroundColor Yellow
Set-Location client
if (-not (Test-Path "package-lock.json")) {
    npm install
} else {
    npm ci
}
Set-Location ..

Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

Write-Host "Step 2: Checking configuration files..." -ForegroundColor Yellow

# Check .env.production
if (Test-Path "client\.env.production") {
    $envContent = Get-Content "client\.env.production" -Raw
    if ($envContent -match "your-app-name") {
        Write-Host "⚠️  Warning: Please update client/.env.production with your Render backend URL" -ForegroundColor Yellow
    } else {
        Write-Host "✅ Production environment configured" -ForegroundColor Green
    }
} else {
    Write-Host "❌ Error: client/.env.production not found" -ForegroundColor Red
}

# Check vite.config.js
if (Test-Path "client\vite.config.js") {
    $viteConfig = Get-Content "client\vite.config.js" -Raw
    if ($viteConfig -match "base:\s*'/Mini-Project-Manager/'") {
        Write-Host "⚠️  Note: Vite base is set to '/Mini-Project-Manager/'" -ForegroundColor Yellow
        Write-Host "   If your repo name is different, update client/vite.config.js" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Step 3: Testing build..." -ForegroundColor Yellow
Set-Location client
npm run build
Set-Location ..
Write-Host "✅ Build successful" -ForegroundColor Green
Write-Host ""

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Deploy backend to Render (see DEPLOYMENT_GUIDE.md Part 1)"
Write-Host "2. Update client/.env.production with your Render URL"
Write-Host "3. Enable GitHub Pages (see DEPLOYMENT_GUIDE.md Part 2)"
Write-Host "4. Add VITE_PM_API_URL secret to GitHub"
Write-Host "5. Push changes: git add . && git commit -m 'Deploy setup' && git push"
Write-Host ""
Write-Host "📖 Full guide: DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
