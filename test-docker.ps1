# Test Dockerfile Locally
# Run this script to test if your Dockerfile works before deploying to Render

Write-Host "🐳 Testing Docker Build for .NET Backend" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is installed
Write-Host "Checking Docker installation..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker found: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed or not in PATH" -ForegroundColor Red
    Write-Host "   Please install Docker Desktop from: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check if in correct directory
if (-not (Test-Path "backend\Dockerfile")) {
    Write-Host "❌ Error: backend\Dockerfile not found" -ForegroundColor Red
    Write-Host "   Please run this script from the project root directory" -ForegroundColor Yellow
    exit 1
}

Write-Host "Step 1: Building Docker image..." -ForegroundColor Yellow
Write-Host "This may take 5-10 minutes on first build (downloading .NET SDK)..." -ForegroundColor Gray
Write-Host ""

Set-Location backend

try {
    docker build -t mini-project-manager-test .
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Docker build successful!" -ForegroundColor Green
    } else {
        Write-Host "❌ Docker build failed!" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
} catch {
    Write-Host "❌ Docker build error: $_" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Write-Host ""
Write-Host "Step 2: Starting container on port 8080..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop when done testing" -ForegroundColor Gray
Write-Host ""
Write-Host "Once running, test these URLs in your browser:" -ForegroundColor Cyan
Write-Host "  - http://localhost:8080/swagger" -ForegroundColor White
Write-Host "  - http://localhost:8080/api/auth/register (POST)" -ForegroundColor White
Write-Host ""

try {
    docker run -it --rm `
        -p 8080:8080 `
        -e ASPNETCORE_ENVIRONMENT=Development `
        -e Jwt__Key=TestKey_ThisIsJustForLocalTesting_Min32Chars `
        -e Jwt__Issuer=ProjectManagerAPI `
        -e Jwt__Audience=ProjectManagerClient `
        -e FrontendUrl=http://localhost:5173 `
        mini-project-manager-test
} catch {
    Write-Host "❌ Error running container: $_" -ForegroundColor Red
}

Set-Location ..

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Test complete!" -ForegroundColor Green
Write-Host ""
Write-Host "If the build and run were successful, you're ready to deploy to Render!" -ForegroundColor Cyan
Write-Host "Follow: RENDER_DOCKER_DEPLOYMENT.md" -ForegroundColor Cyan
