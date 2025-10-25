# ⚡ Quick Reference: Render Docker Deployment

## 🎯 The Correct Settings for Render

```
┌─────────────────────────────────────────────┐
│         RENDER WEB SERVICE CONFIG           │
├─────────────────────────────────────────────┤
│ Name:          mini-project-manager-api     │
│ Runtime:       Docker  ⬅️ IMPORTANT!        │
│ Branch:        main                          │
│ Root Dir:      backend                       │
│ Build Cmd:     (leave empty)                 │
│ Start Cmd:     (leave empty)                 │
│ Instance:      Free                          │
└─────────────────────────────────────────────┘
```

## 🔐 Environment Variables (in Render)

```env
ASPNETCORE_ENVIRONMENT=Production
PORT=8080
Jwt__Key=YOUR_64_CHAR_SECURE_KEY_HERE
Jwt__Issuer=ProjectManagerAPI
Jwt__Audience=ProjectManagerClient
FrontendUrl=https://yourusername.github.io/Mini-Project-Manager
```

## 📝 What You Need to Change

### 1. Generate JWT Key
```powershell
# Run this in PowerShell to generate a secure key
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

### 2. Update FrontendUrl
Replace `yourusername` with your GitHub username:
```
https://YOUR-GITHUB-USERNAME.github.io/Mini-Project-Manager
```

## 🚀 Deployment Flow

```
1. Push to GitHub
   ↓
2. Render detects change
   ↓
3. Pulls latest code
   ↓
4. Reads backend/Dockerfile
   ↓
5. Builds Docker image
   ↓
6. Starts container on port 8080
   ↓
7. Service goes LIVE ✅
```

## ✅ What Success Looks Like

### In Render Dashboard:
- Status: **Live** (green dot)
- Logs show: "Now listening on: http://0.0.0.0:8080"
- No error messages

### When Testing:
- `/swagger` page loads
- Shows API documentation
- Can expand endpoints

### URL Format:
```
https://your-app-name.onrender.com
https://your-app-name.onrender.com/swagger
https://your-app-name.onrender.com/api/auth/register
```

## ❌ Common Mistakes to Avoid

| ❌ Wrong | ✅ Correct |
|---------|----------|
| Runtime: Node | Runtime: Docker |
| Build Command: dotnet build | (leave empty) |
| Root Directory: (empty) | Root Directory: backend |
| PORT: 5000 | PORT: 8080 |
| JWT Key: 16 chars | JWT Key: 64 chars |

## 🔧 Quick Troubleshooting

### Build Failed?
```
→ Check: backend/Dockerfile exists
→ Check: backend/ProjectManager.csproj exists
→ Action: Redeploy from Render dashboard
```

### Service Won't Start?
```
→ Check: PORT=8080 in environment variables
→ Check: All required env vars are set
→ Action: View logs for error messages
```

### Can't Access /swagger?
```
→ Check: Service is "Live" (not Building/Deploying)
→ Check: URL is correct (with https://)
→ Action: Wait 30-60 seconds if just woke from sleep
```

### CORS Errors?
```
→ Check: FrontendUrl matches exactly
→ Check: No trailing slash in FrontendUrl
→ Action: Redeploy after changing env var
```

## 📊 File Structure (What Render Sees)

```
Mini-Project-Manager/
└── backend/              ← Root Directory points here
    ├── Dockerfile        ← Render uses this
    ├── .dockerignore
    ├── ProjectManager.csproj
    ├── Program.cs
    ├── appsettings.json
    ├── Controllers/
    ├── Models/
    └── Services/
```

## ⏱️ Timeline

- **First Deploy**: 5-10 minutes
- **Subsequent Deploys**: 3-5 minutes  
- **Cold Start (Free tier)**: 30-60 seconds
- **Warm Requests**: < 1 second

## 💰 Cost

**Free Tier**:
- ✅ 750 hours/month (enough for 1 service)
- ✅ Automatic HTTPS
- ⚠️ Spins down after 15min inactivity
- ⚠️ Database resets on redeploy

**Starter ($7/month)**:
- ✅ No spin-down (24/7 uptime)
- ✅ Persistent disk (database survives)
- ✅ Better performance

## 🎯 After Backend is Deployed

1. ✅ Copy your backend URL
2. ⏭️ Update `client/.env.production`:
   ```env
   VITE_PM_API_URL=https://your-app.onrender.com/api
   ```
3. ⏭️ Add GitHub Secret: `VITE_PM_API_URL`
4. ⏭️ Push to GitHub (triggers frontend deploy)

## 🔗 Quick Links

- **Render Dashboard**: https://dashboard.render.com
- **Documentation**: https://render.com/docs/docker
- **Support**: https://render.com/support

---

**Pro Tip**: Bookmark your Render service URL and logs page for quick access!

**Ready?** Follow → `RENDER_DOCKER_DEPLOYMENT.md` for full guide
