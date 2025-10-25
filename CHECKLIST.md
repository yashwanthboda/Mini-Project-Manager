# Smart Scheduler - Setup Checklist

Use this checklist to ensure everything is set up correctly.

## ✅ Pre-Installation Checklist

### System Requirements
- [ ] Windows operating system (you're using Windows ✓)
- [ ] Administrator access (if needed for installations)
- [ ] Internet connection (for downloading packages)
- [ ] At least 500MB free disk space

### Required Software
- [ ] Node.js (v16 or higher) installed
  - Check: Open PowerShell and run `node --version`
  - If not installed: Download from https://nodejs.org/
  
- [ ] npm (comes with Node.js)
  - Check: Run `npm --version` in PowerShell
  - Should show version 7.x or higher

## ✅ Installation Checklist

### Quick Method (Recommended)
- [ ] Open PowerShell in project directory
- [ ] Run: `.\quickstart.ps1`
- [ ] Follow on-screen prompts
- [ ] Choose to start application when prompted

### Manual Method
- [ ] Open PowerShell in project directory
- [ ] Run: `npm install` (installs backend dependencies)
- [ ] Check for any errors in console
- [ ] Run: `cd client`
- [ ] Run: `npm install` (installs frontend dependencies)
- [ ] Check for any errors in console
- [ ] Run: `cd ..` (return to root)

## ✅ Verification Checklist

### Backend Verification
- [ ] Start backend: `npm run dev`
- [ ] Check console for "🚀 Smart Scheduler API running on port 3000"
- [ ] Open browser to: http://localhost:3000
- [ ] Should see JSON welcome message
- [ ] Open: http://localhost:3000/api/health
- [ ] Should see: `{"status": "ok", "message": "Smart Scheduler API is running"}`
- [ ] No errors in console

### Frontend Verification (New Terminal)
- [ ] Start frontend: `npm run client`
- [ ] Check console for "Local: http://localhost:5173"
- [ ] Open browser to: http://localhost:5173
- [ ] Should see Smart Scheduler interface
- [ ] Page should load without errors
- [ ] Check browser console (F12) for errors

## ✅ Functionality Testing

### Basic Features
- [ ] Click "Load Example Data" button
- [ ] Verify 4 tasks are loaded with data
- [ ] Click "Generate Schedule" button
- [ ] See loading spinner appear
- [ ] Wait for results (should take 1-2 seconds)
- [ ] See success message with green checkmark
- [ ] See 4 metric cards (Total Tasks, Total Hours, Start Date, End Date)
- [ ] See ordered task list:
  1. Design API
  2. Implement Backend
  3. Build Frontend
  4. End-to-End Test

### Advanced Features
- [ ] Click "Download JSON" button
- [ ] Verify file downloads with schedule data
- [ ] Click "Create New Schedule" button
- [ ] Returns to task input form
- [ ] Try adding a new task with "Add Another Task"
- [ ] Try removing a task (X button)
- [ ] Test dependency selection (multi-select)

### Error Handling
- [ ] Try submitting empty task title
- [ ] Should show validation error
- [ ] Try circular dependency (Task A depends on B, B depends on A)
- [ ] Should show error message

## ✅ Project Files Checklist

### Root Directory Files
- [ ] `package.json` - Backend dependencies
- [ ] `server.js` - Express server code
- [ ] `.env` - Environment configuration
- [ ] `.gitignore` - Git ignore rules
- [ ] `README.md` - Project documentation
- [ ] `INSTALLATION.md` - Setup instructions
- [ ] `DEPLOYMENT.md` - Deployment guide
- [ ] `API_TESTING.md` - API testing guide
- [ ] `ARCHITECTURE.md` - System architecture
- [ ] `PROJECT_SUMMARY.md` - Complete summary
- [ ] `quickstart.ps1` - Quick start script
- [ ] `example-request.json` - Sample API request

### Client Directory Files
- [ ] `client/package.json` - Frontend dependencies
- [ ] `client/vite.config.js` - Vite configuration
- [ ] `client/tailwind.config.js` - Tailwind config
- [ ] `client/postcss.config.js` - PostCSS config
- [ ] `client/index.html` - HTML entry
- [ ] `client/src/main.jsx` - React entry
- [ ] `client/src/App.jsx` - Main component
- [ ] `client/src/index.css` - Global styles
- [ ] `client/src/api/scheduler.js` - API client
- [ ] `client/src/components/Header.jsx` - Header
- [ ] `client/src/components/TaskForm.jsx` - Task form
- [ ] `client/src/components/TaskInput.jsx` - Task input
- [ ] `client/src/components/ScheduleResult.jsx` - Results
- [ ] `client/src/components/LoadingSpinner.jsx` - Spinner

## ✅ Common Issues Resolution

### Issue: "node: command not found"
- [ ] Install Node.js from https://nodejs.org/
- [ ] Restart PowerShell after installation
- [ ] Verify with `node --version`

### Issue: "Cannot find module 'express'"
- [ ] Delete `node_modules` folder
- [ ] Delete `package-lock.json` file
- [ ] Run `npm install` again

### Issue: Port 3000 already in use
- [ ] Find and stop other process using port 3000
- [ ] Or change port in `.env` file to 3001
- [ ] Restart backend

### Issue: Port 5173 already in use
- [ ] Find and stop other process using port 5173
- [ ] Or change port in `client/vite.config.js`
- [ ] Restart frontend

### Issue: Frontend can't reach backend
- [ ] Ensure backend is running (check terminal)
- [ ] Check backend URL in browser: http://localhost:3000
- [ ] Check browser console for CORS errors
- [ ] Verify proxy in `client/vite.config.js`

### Issue: CSS not loading
- [ ] Clear browser cache (Ctrl + Shift + Delete)
- [ ] Hard refresh (Ctrl + F5)
- [ ] Restart frontend server

## ✅ Performance Checklist

### Expected Performance
- [ ] Backend starts in < 3 seconds
- [ ] Frontend starts in < 5 seconds
- [ ] Page loads in < 2 seconds
- [ ] API response in < 100ms
- [ ] Schedule generation in < 1 second
- [ ] UI interactions feel smooth

## ✅ Ready for Development

### Development Environment
- [ ] Both servers running without errors
- [ ] Hot reload working (changes auto-refresh)
- [ ] Console.log messages visible
- [ ] Browser DevTools accessible (F12)

### Code Editor Setup (Optional but Recommended)
- [ ] VS Code installed
- [ ] Extensions installed:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - ESLint

## ✅ Ready for Deployment

### Prerequisites
- [ ] Code committed to Git
- [ ] Pushed to GitHub
- [ ] Backend tested locally
- [ ] Frontend tested locally
- [ ] Environment variables documented
- [ ] README.md updated
- [ ] No hardcoded URLs (using env variables)

### Deployment Accounts
- [ ] GitHub account created
- [ ] Render account created (for backend)
- [ ] Vercel account created (for frontend)

## 🎉 Final Check

- [ ] Backend running: http://localhost:3000 ✓
- [ ] Frontend running: http://localhost:5173 ✓
- [ ] Example data works ✓
- [ ] Schedule generation works ✓
- [ ] No console errors ✓
- [ ] UI looks good ✓
- [ ] All features tested ✓

---

## ✅ You're Ready!

If all checkboxes above are checked, congratulations! 🎉

Your Smart Scheduler API is:
- ✅ Fully installed
- ✅ Properly configured
- ✅ Tested and working
- ✅ Ready for development
- ✅ Ready for deployment

## Next Steps

1. **Explore the code** - Look through the files to understand implementation
2. **Read documentation** - Check out README.md and other .md files
3. **Customize** - Modify colors, add features, experiment
4. **Deploy** - Follow DEPLOYMENT.md to publish online
5. **Share** - Show off your project!

## Need Help?

- Check `README.md` for API documentation
- Check `INSTALLATION.md` for detailed setup
- Check `API_TESTING.md` for testing examples
- Check `ARCHITECTURE.md` to understand the system
- Check `PROJECT_SUMMARY.md` for overview

## Support Commands

```powershell
# Check Node.js version
node --version

# Check npm version
npm --version

# View installed packages (backend)
npm list --depth=0

# View installed packages (frontend)
cd client; npm list --depth=0

# Clean install everything
rm -r node_modules, client/node_modules -Force; npm run install-all

# Start everything
npm run dev-all

# Stop servers
# Press Ctrl+C in terminal
```

---

**Status**: Ready to use! 🚀
