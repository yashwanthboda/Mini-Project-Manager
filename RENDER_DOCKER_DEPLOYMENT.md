# 🚀 CORRECTED: Deploy .NET Backend to Render using Docker

Since Render doesn't have native .NET runtime support, we'll use **Docker** to deploy your ASP.NET Core backend.

---

## ✅ Prerequisites

- [x] Dockerfile created in `backend/` directory
- [x] .dockerignore created in `backend/` directory
- [x] Code pushed to GitHub

---

## 📋 Step-by-Step: Deploy Backend to Render

### Step 1: Go to Render Dashboard

1. Visit [render.com](https://render.com) and sign in
2. Click **"New +"** button (top right)
3. Select **"Web Service"**

### Step 2: Connect Your Repository

1. Click **"Connect GitHub"** (if not already connected)
2. Find and select **"Mini-Project-Manager"** repository
3. Click **"Connect"**

### Step 3: Configure Service Settings

Fill in the form with these **EXACT** values:

#### **Basic Settings**

| Field | Value |
|-------|-------|
| **Name** | `mini-project-manager-api` (or your choice) |
| **Region** | Choose closest to your users (e.g., Singapore) |
| **Branch** | `main` |
| **Root Directory** | `backend` |

#### **Language/Runtime** ⚠️ IMPORTANT

| Field | Value |
|-------|-------|
| **Runtime** | **Docker** ⬅️ Select this from dropdown! |

> **Note**: Since .NET is not in the runtime list, we use Docker which is supported.

#### **Build & Deploy Settings**

Leave these **EMPTY** (Docker uses Dockerfile automatically):
- ❌ Build Command: Leave blank
- ❌ Start Command: Leave blank

> Render will automatically detect and use your Dockerfile.

#### **Instance Type**

| Field | Value |
|-------|-------|
| **Instance Type** | **Free** (or Starter for $7/month) |

### Step 4: Add Environment Variables

Click **"Advanced"** and add these environment variables:

| Key | Value |
|-----|-------|
| `ASPNETCORE_ENVIRONMENT` | `Production` |
| `Jwt__Key` | *(Generate secure key - see below)* |
| `Jwt__Issuer` | `ProjectManagerAPI` |
| `Jwt__Audience` | `ProjectManagerClient` |
| `FrontendUrl` | `https://YOUR-GITHUB-USERNAME.github.io/Mini-Project-Manager` |
| `PORT` | `8080` |

#### **🔐 Generating Secure JWT Key**

**Option 1: Online Generator**
- Visit: https://generate-random.org/api-key-generator
- Length: 64 characters
- Copy and use

**Option 2: PowerShell** (run this in terminal)
```powershell
# Generate random key
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

**Option 3: Use this secure default** (but change it!)
```
Your_Super_Secure_JWT_Key_Min_64_Chars_ChangeThis_ProductionKey123
```

⚠️ **IMPORTANT**: 
- Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username
- The JWT key MUST be at least 32 characters (64+ recommended)
- Never share or commit your JWT key

### Step 5: Create Web Service

1. Review all settings
2. Click **"Create Web Service"** button
3. Wait for deployment (5-10 minutes for first deploy)

### Step 6: Monitor Deployment

You'll see:
1. **Building** - Docker image is being built
2. **Deploying** - Container is starting
3. **Live** ✅ - Your backend is running!

Watch the logs for any errors.

### Step 7: Copy Your Backend URL

Once deployed, you'll see:
```
Your service is live at https://mini-project-manager-api.onrender.com
```

**Copy this URL!** You'll need it for frontend configuration.

### Step 8: Test Your Backend

1. Visit: `https://your-app-name.onrender.com/swagger`
2. You should see the Swagger API documentation
3. Test the `/api/auth/register` endpoint

---

## 🎯 What Render Does with Docker

1. Reads your `backend/Dockerfile`
2. Builds a Docker image with .NET 8.0 runtime
3. Runs the container on port 8080 (or PORT env variable)
4. Exposes it to the internet

---

## ⚠️ Important Notes

### Database Persistence

**Free Tier**: Database resets on each deploy (ephemeral storage)

**Solutions**:
1. **Upgrade to Starter plan** ($7/month) - gets persistent disk
2. **Use external database** - Render offers free PostgreSQL
3. **Accept data loss** - fine for testing/demos

### Cold Starts

**Free Tier**: Services spin down after 15 minutes of inactivity

- First request after spin-down takes 30-60 seconds
- Subsequent requests are fast
- Upgrade to paid plan for 24/7 uptime

---

## 🔧 Troubleshooting

### ❌ "Build failed"

**Check logs for**:
- Docker syntax errors in Dockerfile
- Missing files (ensure backend/ folder has ProjectManager.csproj)
- Network issues (try rebuilding)

**Solution**: 
```powershell
# Test Docker build locally
cd backend
docker build -t test-backend .
docker run -p 8080:8080 test-backend
```

### ❌ "Service not starting"

**Check**:
- PORT environment variable is set to `8080`
- Logs show any startup errors
- Environment variables are set correctly

### ❌ "Cannot connect to backend"

**Verify**:
- Service shows "Live" status in Render
- URL is correct (with https://)
- Swagger page loads at `/swagger`
- CORS is configured (check FrontendUrl)

### ❌ "Database errors"

**If you see "table not found"**:
- Database should auto-create on first run
- Check logs for Entity Framework errors
- Verify ConnectionStrings are correct

---

## 📊 Render Dashboard Features

### Logs Tab
- Real-time application logs
- Filter by level (info, error, etc.)
- Download logs for debugging

### Metrics Tab (Paid plans)
- CPU usage
- Memory usage
- Request count

### Settings Tab
- Update environment variables
- Change instance type
- Configure custom domains

### Manual Deploy
- Force redeploy from specific commit
- Useful for rollbacks

---

## 🔄 Automatic Deploys

Render automatically redeploys when you:
1. Push to main branch on GitHub
2. Any changes in `backend/` directory trigger rebuild
3. Frontend changes DON'T trigger backend rebuild (efficient!)

---

## 💾 Upgrading to PostgreSQL (Recommended)

For production, migrate from SQLite to PostgreSQL:

### 1. Create PostgreSQL Database on Render

1. In Render Dashboard: **"New +"** → **"PostgreSQL"**
2. Name: `mini-project-manager-db`
3. Region: Same as your web service
4. Plan: **Free** (1GB storage)
5. Click **"Create Database"**

### 2. Update Backend Code

Install PostgreSQL package:
```powershell
cd backend
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

Update `Program.cs`:
```csharp
// Replace SQLite with PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
```

### 3. Update Environment Variables

In Render web service settings, update:
```
ConnectionStrings__DefaultConnection=<Internal Database URL from PostgreSQL>
```

Copy the "Internal Database URL" from your PostgreSQL database page.

---

## ✅ Deployment Checklist

- [ ] Dockerfile exists in `backend/` directory
- [ ] Code pushed to GitHub
- [ ] Created Web Service on Render
- [ ] Selected **Docker** as runtime
- [ ] Set Root Directory to `backend`
- [ ] Added all environment variables
- [ ] Generated secure JWT key (64+ characters)
- [ ] Set correct FrontendUrl
- [ ] Deployment completed successfully
- [ ] Service shows "Live" status
- [ ] Copied backend URL
- [ ] Tested `/swagger` endpoint
- [ ] API responds correctly

---

## 🎉 Success!

Your backend should now be live at:
```
https://your-app-name.onrender.com
```

API documentation available at:
```
https://your-app-name.onrender.com/swagger
```

---

## 📝 Next Steps

1. ✅ Backend deployed on Render
2. ⏭️ Update frontend configuration with backend URL
3. ⏭️ Deploy frontend to GitHub Pages
4. ⏭️ Test end-to-end functionality

**Continue to**: `DEPLOYMENT_GUIDE.md` Part 2 (Frontend Deployment)

---

## 🆘 Still Having Issues?

1. **Check Render Logs**: Dashboard → Your Service → Logs tab
2. **Test Locally**: 
   ```powershell
   cd backend
   docker build -t test .
   docker run -p 8080:8080 -e ASPNETCORE_ENVIRONMENT=Development test
   ```
3. **Verify Environment Variables**: Settings → Environment
4. **Check GitHub repo**: Ensure latest code is pushed

---

**Last Updated**: October 26, 2025
**Method**: Docker deployment on Render
**Status**: ✅ Ready to Deploy
