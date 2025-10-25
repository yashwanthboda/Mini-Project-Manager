# Deployment Guide

## Backend Deployment (Render)

### Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Make sure `.gitignore` includes `node_modules/` and `.env`

### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

### Step 3: Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name:** smart-scheduler-api
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

4. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (or leave empty, Render sets automatically)

5. Click "Create Web Service"

6. Wait for deployment (5-10 minutes)

7. Copy your backend URL (e.g., `https://smart-scheduler-api.onrender.com`)

### Important Notes for Render:
- Free tier: Service sleeps after 15 min of inactivity
- First request after sleep takes ~30 seconds
- Consider upgrading for production use

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend
1. Update `client/src/api/scheduler.js`:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'YOUR_RENDER_URL';
   ```

### Step 2: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub

### Step 3: Deploy Frontend
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. Add Environment Variables:
   - `VITE_API_URL`: Your Render backend URL

5. Click "Deploy"

6. Wait for deployment (2-3 minutes)

7. Your site will be live at `https://your-project.vercel.app`

### Step 4: Update CORS
Update `server.js` to allow your Vercel domain:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-project.vercel.app'
  ]
}));
```

Commit and push - Render will auto-redeploy.

## Alternative Deployment Options

### Netlify (Frontend)
1. Go to https://netlify.com
2. Drag & drop `client/dist` folder
3. Set environment variables in Site Settings

### Heroku (Backend)
1. Install Heroku CLI
2. `heroku create smart-scheduler-api`
3. `git push heroku main`
4. `heroku config:set NODE_ENV=production`

### Railway (Backend)
1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select repository
4. Railway auto-detects and deploys

## Post-Deployment Checklist

- ✅ Backend health check works: `YOUR_BACKEND_URL/api/health`
- ✅ Frontend loads properly
- ✅ CORS is configured for frontend domain
- ✅ Environment variables are set
- ✅ API calls work from frontend to backend
- ✅ Test task scheduling functionality

## Monitoring

### Backend (Render)
- View logs in Render dashboard
- Monitor uptime and response times
- Set up alerts for failures

### Frontend (Vercel)
- View deployment logs
- Analytics available in Vercel dashboard
- Automatic HTTPS and CDN

## Custom Domain (Optional)

### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS with your registrar

### Render:
1. Go to Service → Settings → Custom Domain
2. Add your domain
3. Configure DNS

## Cost Estimates

### Free Tier Limits:
- **Render:** 750 hours/month, sleeps after inactivity
- **Vercel:** 100 GB bandwidth, unlimited deployments
- **Both:** Suitable for demo/portfolio projects

### Paid Tiers:
- **Render:** $7/month (always-on, more resources)
- **Vercel:** $20/month (more bandwidth, analytics)

## Troubleshooting

### Backend won't start:
- Check Render logs
- Verify `package.json` scripts
- Ensure environment variables are set

### Frontend can't reach backend:
- Check CORS configuration
- Verify `VITE_API_URL` is correct
- Check browser console for errors

### 500 errors:
- Check backend logs in Render
- Test API endpoints directly
- Verify JSON format in requests
