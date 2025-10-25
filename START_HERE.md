# 🚀 START HERE - Smart Scheduler API

Welcome! This guide will get you up and running in **5 minutes**.

## 📋 What You're Building

A full-stack web application that:
- Automatically schedules tasks based on dependencies
- Uses smart algorithms to optimize task order
- Has a beautiful, mobile-friendly interface
- Is ready to deploy to the cloud

## ⚡ Quick Start (Choose One Path)

### Path 1: Automated Setup (Easiest) ⭐ RECOMMENDED

1. **Open PowerShell** in this folder (c:\Users\yashr\Project 2)
   - Right-click in folder → "Open in Terminal"
   - Or open PowerShell and navigate here

2. **Run the quick start script:**
   ```powershell
   .\quickstart.ps1
   ```

3. **Follow the prompts** - it will:
   - Check if Node.js is installed
   - Install all dependencies
   - Ask if you want to start the app

4. **Open your browser** to:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

**That's it!** You're done! 🎉

---

### Path 2: Manual Setup (If Path 1 doesn't work)

1. **Check if Node.js is installed:**
   ```powershell
   node --version
   ```
   
   If you see an error, install Node.js:
   - Go to: https://nodejs.org/
   - Download LTS version
   - Install and restart PowerShell

2. **Install backend dependencies:**
   ```powershell
   npm install
   ```
   Wait for completion (1-2 minutes)

3. **Install frontend dependencies:**
   ```powershell
   cd client
   npm install
   cd ..
   ```
   Wait for completion (2-3 minutes)

4. **Start the application:**
   
   Option A - Both at once:
   ```powershell
   npm run dev-all
   ```
   
   Option B - Separate terminals:
   ```powershell
   # Terminal 1
   npm run dev
   
   # Terminal 2 (new terminal window)
   npm run client
   ```

5. **Open your browser:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000/api/health

---

## 🎯 First Test

Once the app is running:

1. **Open** http://localhost:5173 in your browser

2. **Click** "Load Example Data" button

3. **Click** "Generate Schedule" button

4. **See** the magic happen! ✨
   - Tasks automatically ordered
   - Dependencies resolved
   - Beautiful results displayed

---

## 📚 What's Included

Your project has everything you need:

### Documentation Files
- `README.md` - Main project documentation
- `INSTALLATION.md` - Detailed setup guide
- `DEPLOYMENT.md` - How to deploy online
- `API_TESTING.md` - Test the API
- `ARCHITECTURE.md` - System design
- `PROJECT_SUMMARY.md` - Complete overview
- `CHECKLIST.md` - Verify everything works
- `START_HERE.md` - This file!

### Code Files
- `server.js` - Backend API
- `client/` - React frontend
- `package.json` - Dependencies
- Configuration files

### Helper Files
- `quickstart.ps1` - Automated setup
- `example-request.json` - Sample API data
- `.env` - Configuration

---

## 🎓 Learning Path

**New to this?** Follow this order:

1. **START_HERE.md** ← You are here!
2. **INSTALLATION.md** - If you need help installing
3. **README.md** - Understand what the API does
4. **CHECKLIST.md** - Verify everything works
5. **API_TESTING.md** - Learn to test the API
6. **ARCHITECTURE.md** - Understand how it works
7. **DEPLOYMENT.md** - Put it online!
8. **PROJECT_SUMMARY.md** - Complete reference

---

## ❓ Troubleshooting

### "node: command not found"

**Problem:** Node.js is not installed

**Solution:**
1. Download from https://nodejs.org/
2. Install (click "Next" through wizard)
3. Restart PowerShell
4. Try again

---

### "Port already in use"

**Problem:** Another app is using the port

**Solution for Backend (port 3000):**
1. Open `.env` file
2. Change `PORT=3000` to `PORT=3001`
3. Restart backend

**Solution for Frontend (port 5173):**
1. Open `client/vite.config.js`
2. Change `port: 5173` to `port: 5174`
3. Restart frontend

---

### "Cannot find module"

**Problem:** Dependencies not installed

**Solution:**
```powershell
# Clean install
rm -r node_modules -Force
rm package-lock.json -Force
npm install

# Same for frontend
cd client
rm -r node_modules -Force
rm package-lock.json -Force
npm install
cd ..
```

---

### "Frontend can't connect to backend"

**Problem:** Backend not running or CORS issue

**Solution:**
1. Make sure backend is running in another terminal
2. Check http://localhost:3000/api/health in browser
3. Look for errors in backend terminal
4. Restart both servers

---

## 🎮 Try These Features

Once running, test these:

### Basic Features
- ✅ Load example data
- ✅ Generate schedule
- ✅ View results
- ✅ Download JSON
- ✅ Create new schedule

### Advanced Features
- ✅ Add multiple tasks
- ✅ Set dependencies
- ✅ Change dates
- ✅ See task prioritization
- ✅ Test error handling

### Mobile Testing
- ✅ Open on phone (same WiFi)
- ✅ Check responsive design
- ✅ Test touch interactions

---

## 📱 Access from Phone

Want to test on your phone?

1. **Find your computer's IP address:**
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. **Update Vite config** (`client/vite.config.js`):
   ```javascript
   server: {
     host: '0.0.0.0',
     port: 5173
   }
   ```

3. **Restart frontend**

4. **On your phone** (same WiFi):
   - Open: http://YOUR-IP:5173
   - Example: http://192.168.1.100:5173

---

## 🚀 Deploy Online

Ready to share with the world?

**Backend** → Deploy to Render.com (free)
**Frontend** → Deploy to Vercel.com (free)

Full instructions in `DEPLOYMENT.md`

---

## 📊 Project Stats

- **Total Files:** 30+
- **Lines of Code:** ~2,500
- **Technologies:** Node.js, React, Express, Tailwind
- **Features:** All requirements + extras
- **Status:** Production ready ✅

---

## 🎯 Success Criteria

You'll know it's working when:

1. ✅ Backend shows: "🚀 Smart Scheduler API running on port 3000"
2. ✅ Frontend opens in browser with no errors
3. ✅ Example data loads correctly
4. ✅ Schedule generates with beautiful results
5. ✅ No red errors in console

---

## 💡 What's Next?

After you have it running:

1. **Explore the code** - See how it works
2. **Customize it** - Change colors, add features
3. **Deploy it** - Put it online
4. **Add to portfolio** - Show off your work
5. **Keep learning** - Build more features!

---

## 🎉 You're Ready!

Everything you need is here. Just run:

```powershell
.\quickstart.ps1
```

Or if you prefer manual:

```powershell
npm run install-all
npm run dev-all
```

Then open: **http://localhost:5173**

---

## 📞 Need Help?

Check these files in order:
1. `INSTALLATION.md` - Detailed setup help
2. `CHECKLIST.md` - Verify your setup
3. `README.md` - Understand the project
4. `API_TESTING.md` - Test the API

---

**Happy Coding! 🚀**

Your Smart Scheduler API is ready to impress!
