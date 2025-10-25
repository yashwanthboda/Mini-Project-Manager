# 🚀 Deployment Guide: GitHub Pages + Render

This guide will help you deploy your **Mini Project Manager** with:
- **Frontend**: GitHub Pages (React + Vite)
- **Backend**: Render (ASP.NET Core)

---

## 📋 Prerequisites

- GitHub account
- Render account (free tier available at [render.com](https://render.com))
- Your code pushed to GitHub repository

---

## Part 1: Deploy Backend to Render

### Step 1: Create Render Account
1. Go to [render.com](https://render.com) and sign up (you can use your GitHub account)
2. Confirm your email address

### Step 2: Create a New Web Service
1. Click **"New +"** button in the top right
2. Select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your **Mini-Project-Manager** repository
5. Configure the service:

   **Basic Settings:**
   - **Name**: `mini-project-manager-api` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `.NET`
   
   **Build Settings:**
   - **Build Command**: `dotnet restore && dotnet publish -c Release -o out`
   - **Start Command**: `cd out && dotnet ProjectManager.dll`
   
   **Instance Type:**
   - Select **Free** (or paid if you prefer better performance)

6. Click **"Advanced"** and add Environment Variables:

   ```
   ASPNETCORE_ENVIRONMENT=Production
   Jwt__Key=YOUR_SUPER_SECRET_JWT_KEY_HERE_AT_LEAST_32_CHARACTERS_LONG
   Jwt__Issuer=ProjectManagerAPI
   Jwt__Audience=ProjectManagerClient
   FrontendUrl=https://yourusername.github.io/Mini-Project-Manager
   ```
   
   ⚠️ **IMPORTANT**: 
   - Replace `YOUR_SUPER_SECRET_JWT_KEY_HERE_AT_LEAST_32_CHARACTERS_LONG` with a secure random string (at least 32 characters)
   - Replace `yourusername` with your actual GitHub username in FrontendUrl
   - You can generate a secure key using: `openssl rand -base64 64` (in terminal)

7. Click **"Create Web Service"**

### Step 3: Wait for Deployment
- Render will automatically build and deploy your backend
- This takes 5-10 minutes for the first deployment
- Once complete, you'll see a green "Live" status
- Copy your backend URL (e.g., `https://mini-project-manager-api.onrender.com`)

### Step 4: Test Your Backend
Visit `https://your-app-name.onrender.com/swagger` to see the API documentation.

⚠️ **Note**: Free tier services on Render spin down after 15 minutes of inactivity. First request after spin-down may take 30-60 seconds.

---

## Part 2: Deploy Frontend to GitHub Pages

### Step 1: Update Configuration Files

1. **Update `client/vite.config.js`**:
   - The `base` property should match your repository name
   - Already set to `/Mini-Project-Manager/`
   - If your repo name is different, change it accordingly

2. **Update `client/.env.production`**:
   ```env
   VITE_PM_API_URL=https://your-app-name.onrender.com/api
   ```
   Replace `your-app-name` with your actual Render service name

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages** (in left sidebar)
3. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
4. Save changes

### Step 3: Add GitHub Secret

1. In your repository, go to **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add the following secret:
   - **Name**: `VITE_PM_API_URL`
   - **Value**: `https://your-app-name.onrender.com/api`
   
   Replace `your-app-name` with your Render service name

### Step 4: Commit and Push Changes

```powershell
# Add all changes
git add .

# Commit changes
git commit -m "Configure deployment for GitHub Pages and Render"

# Push to main branch
git push origin main
```

### Step 5: Deploy via GitHub Actions

The GitHub Actions workflow will automatically trigger when you push to main:

1. Go to your repository on GitHub
2. Click **Actions** tab
3. You should see "Deploy to GitHub Pages" workflow running
4. Wait for it to complete (usually 2-3 minutes)
5. Once complete, your site will be live at:
   ```
   https://yourusername.github.io/Mini-Project-Manager/
   ```

### Step 6: Verify Deployment

1. Visit your GitHub Pages URL
2. Try to register a new user
3. Login and create a project
4. Test all functionality

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- Check Render logs: Dashboard → Your Service → Logs
- Verify environment variables are set correctly
- Ensure JWT key is at least 32 characters

**Problem**: CORS errors
- Verify `FrontendUrl` environment variable matches your GitHub Pages URL exactly
- Check that your GitHub Pages URL is correct (including `/Mini-Project-Manager/`)

**Problem**: Database errors
- SQLite database is stored in Render's ephemeral storage
- For production, consider upgrading to PostgreSQL (Render offers free tier)

### Frontend Issues

**Problem**: Blank page or routing issues
- Verify `base` in `vite.config.js` matches your repo name
- Check browser console for errors
- Ensure `VITE_PM_API_URL` secret is set correctly

**Problem**: API calls failing
- Check that backend URL in `.env.production` is correct
- Verify backend is running on Render
- Check CORS settings in backend

**Problem**: 404 errors on page refresh
- This is normal for GitHub Pages with SPA
- Solution: Add a `404.html` that redirects to `index.html`

### GitHub Actions Issues

**Problem**: Build failing
- Check Actions tab for error logs
- Verify `VITE_PM_API_URL` secret is set
- Ensure `package-lock.json` exists in client directory (run `npm install` if missing)

---

## 🔐 Security Best Practices

1. **Never commit sensitive data**:
   - Add `.env.production` to `.gitignore` if it contains real values
   - Use environment variables for all secrets

2. **Use strong JWT keys**:
   - Generate cryptographically secure random strings
   - Never use the default key from `appsettings.json`

3. **Enable HTTPS**:
   - Both Render and GitHub Pages provide HTTPS by default
   - Never use HTTP in production

4. **Rate limiting**:
   - Consider adding rate limiting to your API
   - Use Render's built-in DDoS protection

---

## 💰 Cost Considerations

### Free Tier Limitations

**Render (Free)**:
- Services spin down after 15 minutes of inactivity
- 750 hours/month (enough for one service)
- Slower performance compared to paid tiers
- Database storage is ephemeral (resets on redeploy)

**GitHub Pages (Free)**:
- Unlimited bandwidth for public repos
- 1GB repository size limit
- No backend processing

### Upgrade Options

**When to upgrade Render**:
- If you need 24/7 uptime without spin-down
- If you need persistent database storage
- If you need better performance

**Render Paid Plans** start at $7/month for:
- No spin-down
- Persistent storage
- Better performance

---

## 🔄 Updating Your App

### Backend Updates
1. Make changes to backend code
2. Commit and push to GitHub
3. Render automatically detects changes and redeploys

### Frontend Updates
1. Make changes to frontend code
2. Commit and push to GitHub
3. GitHub Actions automatically builds and deploys

---

## 📊 Monitoring

### Render Monitoring
- **Dashboard**: View service status, metrics, and logs
- **Logs**: Real-time log streaming
- **Metrics**: CPU, memory, and request metrics (paid plans)

### GitHub Actions
- **Actions tab**: View deployment history and status
- **Badges**: Add deployment status badges to README

---

## 🎉 Next Steps

1. **Add Custom Domain** (optional):
   - GitHub Pages: Settings → Pages → Custom domain
   - Render: Settings → Custom domain

2. **Set Up PostgreSQL** (recommended for production):
   - Render offers free PostgreSQL database
   - Migrate from SQLite to PostgreSQL

3. **Add CI/CD Tests**:
   - Add test step to GitHub Actions workflow
   - Ensure tests pass before deployment

4. **Enable Analytics**:
   - Add Google Analytics or similar
   - Monitor user behavior and errors

5. **Set Up Error Tracking**:
   - Consider Sentry or similar service
   - Track and fix production errors

---

## 📞 Support

If you encounter issues:
1. Check Render logs for backend errors
2. Check browser console for frontend errors
3. Review GitHub Actions logs for deployment errors
4. Consult Render and GitHub Pages documentation

---

## ✅ Deployment Checklist

- [ ] Render account created
- [ ] Backend deployed on Render
- [ ] Environment variables set on Render
- [ ] Backend URL copied
- [ ] `.env.production` updated with backend URL
- [ ] GitHub Pages enabled
- [ ] GitHub secret added for API URL
- [ ] Changes committed and pushed
- [ ] GitHub Actions workflow completed
- [ ] Frontend accessible at GitHub Pages URL
- [ ] Login/Register functionality working
- [ ] API calls successful

---

**Congratulations! Your app is now deployed! 🎉**

Your frontend is live at: `https://yourusername.github.io/Mini-Project-Manager/`
Your backend is live at: `https://your-app-name.onrender.com`
