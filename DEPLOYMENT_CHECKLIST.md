# ✅ Deployment Checklist

Use this checklist to ensure you complete all deployment steps correctly.

## 🎯 Pre-Deployment

- [ ] Code is pushed to GitHub repository
- [ ] All dependencies are installed locally
- [ ] App runs successfully in development mode
- [ ] No uncommitted changes in git

## 🔧 Backend Deployment (Render)

### Setup
- [ ] Created Render account
- [ ] Connected GitHub account to Render
- [ ] Created new Web Service on Render
- [ ] Selected correct repository and branch (main)

### Configuration
- [ ] Set Root Directory to `backend`
- [ ] Set Build Command: `dotnet restore && dotnet publish -c Release -o out`
- [ ] Set Start Command: `cd out && dotnet ProjectManager.dll`
- [ ] Selected Free or Starter instance type

### Environment Variables
- [ ] Added `ASPNETCORE_ENVIRONMENT=Production`
- [ ] Added `Jwt__Key` (min 32 characters, secure random string)
- [ ] Added `Jwt__Issuer=ProjectManagerAPI`
- [ ] Added `Jwt__Audience=ProjectManagerClient`
- [ ] Added `FrontendUrl=https://YOUR-USERNAME.github.io/Mini-Project-Manager`

### Verification
- [ ] Backend deployment completed successfully (green "Live" status)
- [ ] Copied backend URL (e.g., https://your-app.onrender.com)
- [ ] Tested backend by visiting `/swagger` endpoint
- [ ] API responds correctly

## 🎨 Frontend Deployment (GitHub Pages)

### Configuration Files
- [ ] Updated `client/.env.production` with Render backend URL
- [ ] Verified `base` in `client/vite.config.js` matches repo name
- [ ] Checked `client/index.html` has redirect handler

### GitHub Settings
- [ ] Enabled GitHub Pages in repository settings
- [ ] Set Pages source to "GitHub Actions"
- [ ] Added repository secret `VITE_PM_API_URL` with backend URL

### Deployment
- [ ] Committed all configuration changes
- [ ] Pushed changes to main branch: `git push origin main`
- [ ] GitHub Actions workflow started automatically
- [ ] Workflow completed successfully (green checkmark)
- [ ] Copied GitHub Pages URL

### Verification
- [ ] Frontend is accessible at GitHub Pages URL
- [ ] No console errors in browser developer tools
- [ ] Static assets load correctly (CSS, images, etc.)

## 🧪 End-to-End Testing

### Authentication
- [ ] Can access registration page
- [ ] Can register new user successfully
- [ ] Can login with registered credentials
- [ ] JWT token is stored in localStorage
- [ ] Can logout successfully

### Projects
- [ ] Can create new project
- [ ] Project appears in dashboard
- [ ] Can view project details
- [ ] Can edit project information
- [ ] Can delete project

### Tasks
- [ ] Can add tasks to project
- [ ] Tasks display correctly
- [ ] Can mark tasks as complete
- [ ] Can edit task details
- [ ] Can delete tasks

### Smart Scheduler
- [ ] Smart scheduler page loads
- [ ] Can input tasks for scheduling
- [ ] Scheduler returns valid results
- [ ] Results display properly

### Cross-Browser Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Edge
- [ ] Tested on mobile device

## 🔒 Security Checklist

- [ ] `.env` files not committed to git
- [ ] JWT secret is strong and unique (not default)
- [ ] HTTPS enabled on both frontend and backend
- [ ] CORS configured correctly
- [ ] No sensitive data in frontend code
- [ ] No API keys exposed in client-side code

## 📊 Monitoring Setup (Optional)

- [ ] Set up error tracking (e.g., Sentry)
- [ ] Added analytics (e.g., Google Analytics)
- [ ] Configured uptime monitoring
- [ ] Set up alerts for downtime

## 📝 Documentation

- [ ] Updated README with deployment URLs
- [ ] Documented environment variables
- [ ] Created user guide (if needed)
- [ ] Added deployment date to changelog

## 🎉 Post-Deployment

- [ ] Announced deployment to team/users
- [ ] Shared access URLs
- [ ] Monitored initial user feedback
- [ ] Checked logs for any errors
- [ ] Created backup of database (if using persistent storage)

## 🔄 Maintenance Reminders

- [ ] Schedule regular dependency updates
- [ ] Plan for database backup strategy
- [ ] Consider upgrading from free tier if needed
- [ ] Monitor Render usage (750 hours/month limit on free tier)
- [ ] Review and rotate JWT secrets periodically

## 🆘 Troubleshooting Checklist

If something doesn't work:

### Backend Issues
- [ ] Checked Render logs for errors
- [ ] Verified all environment variables are set
- [ ] Confirmed build completed successfully
- [ ] Tested backend directly (via Swagger)
- [ ] Checked database connection

### Frontend Issues
- [ ] Checked browser console for errors
- [ ] Verified API URL is correct in `.env.production`
- [ ] Confirmed GitHub Actions completed successfully
- [ ] Checked network tab for failed requests
- [ ] Verified CORS configuration

### CORS Issues
- [ ] Verified `FrontendUrl` matches GitHub Pages URL exactly
- [ ] Checked for trailing slashes in URLs
- [ ] Confirmed CORS policy includes production URL
- [ ] Redeployed backend after changing CORS settings

### Database Issues
- [ ] Verified SQLite database was created
- [ ] Checked file permissions (if applicable)
- [ ] Considered migrating to PostgreSQL for persistence

---

## 🎊 Completion

When all items are checked:

**Your Mini Project Manager is successfully deployed! 🚀**

- Frontend: https://YOUR-USERNAME.github.io/Mini-Project-Manager/
- Backend: https://your-app.onrender.com
- API Docs: https://your-app.onrender.com/swagger

Next: Share with users and monitor for any issues!

---

**Last Updated**: October 26, 2025
**Deployment Method**: GitHub Pages + Render
**Status**: ✅ Ready for Deployment
