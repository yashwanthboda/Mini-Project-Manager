# 🚀 Quick Deployment Guide

Deploy your Mini Project Manager in 15 minutes!

## 🎯 What You'll Get

- **Frontend**: Hosted on GitHub Pages (Free, Fast, Reliable)
- **Backend**: Hosted on Render (Free tier available)
- **Database**: SQLite (included with backend)

## ⚡ Quick Start

### 1️⃣ Prepare Your Project (5 minutes)

Run the setup script:
```powershell
.\deploy-setup.ps1
```

This will:
- ✅ Install dependencies
- ✅ Check configuration
- ✅ Test build

### 2️⃣ Deploy Backend to Render (5 minutes)

1. Go to [render.com](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `dotnet restore && dotnet publish -c Release -o out`
   - **Start Command**: `cd out && dotnet ProjectManager.dll`
5. Add environment variables:
   ```
   ASPNETCORE_ENVIRONMENT=Production
   Jwt__Key=YOUR_SECRET_KEY_AT_LEAST_32_CHARS
   FrontendUrl=https://yourusername.github.io/Mini-Project-Manager
   ```
6. Click **"Create Web Service"**
7. Copy your backend URL (e.g., `https://your-app.onrender.com`)

### 3️⃣ Configure Frontend (2 minutes)

Update `client/.env.production`:
```env
VITE_PM_API_URL=https://your-app.onrender.com/api
```

### 4️⃣ Deploy Frontend to GitHub Pages (3 minutes)

1. Go to your GitHub repo → **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"
3. Go to **Settings** → **Secrets and variables** → **Actions**
4. Add secret:
   - **Name**: `VITE_PM_API_URL`
   - **Value**: `https://your-app.onrender.com/api`
5. Push your changes:
   ```powershell
   git add .
   git commit -m "Configure deployment"
   git push origin main
   ```
6. Wait 2-3 minutes for GitHub Actions to complete
7. Visit: `https://yourusername.github.io/Mini-Project-Manager/`

## 🎉 Done!

Your app is now live!
- **Frontend**: https://yourusername.github.io/Mini-Project-Manager/
- **Backend**: https://your-app.onrender.com

## 📖 Need More Help?

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for:
- Detailed step-by-step instructions
- Troubleshooting guide
- Security best practices
- Cost considerations
- Upgrade options

## 🔧 Common Issues

**Backend not responding?**
- Free tier spins down after 15 min of inactivity
- First request takes 30-60 seconds to wake up

**CORS errors?**
- Check `FrontendUrl` environment variable on Render
- Make sure it matches your GitHub Pages URL exactly

**Page blank?**
- Check browser console for errors
- Verify `base` in `vite.config.js` matches repo name

## 🆘 Support

Issues? Check:
1. Render logs for backend errors
2. GitHub Actions logs for build errors  
3. Browser console for frontend errors
4. [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for solutions

---

**Made with ❤️ | Deployed with GitHub Pages + Render**
