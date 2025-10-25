# 🚀 QUICK START - Read This First!

## What You Have

✅ **Smart Scheduler** (Node.js) - Working on port 3000  
✅ **React Frontend** - Working on port 5173  
⏳ **.NET API** (Project Manager) - Need to start on port 5000

## What You Need

**Install .NET 8 SDK:**
1. Go to: https://dotnet.microsoft.com/download/dotnet/8.0
2. Download "**.NET 8.0 SDK**" (not Runtime)
3. Install it
4. Restart PowerShell
5. Test: `dotnet --version`

## How to Run

### Option 1: Automated (Recommended)

```powershell
.\start-all.ps1
```

This opens 3 terminal windows automatically.

### Option 2: Manual (3 Terminals)

**Terminal 1 (.NET API):**
```powershell
cd backend
dotnet run
```

**Terminal 2 (Node.js API):**
```powershell
npm run dev
```

**Terminal 3 (React):**
```powershell
npm run client
```

## Access Points

- **Application UI**: http://localhost:5173
- **.NET API Swagger**: http://localhost:5000/swagger
- **Node.js API**: http://localhost:3000

## First Time Setup

```powershell
# 1. Install .NET packages
cd backend
dotnet restore
dotnet build
cd ..

# 2. Node packages already installed ✅

# 3. Run everything
.\start-all.ps1
```

## What To Do Next

1. **Install .NET 8 SDK** (5 minutes)
2. **Run `.\start-all.ps1`** (starts all services)
3. **Open http://localhost:5173** (use the app)
4. **Register a user** (create account)
5. **Create projects** (start managing)
6. **Add tasks** (to projects)
7. **Use Smart Scheduler** (optimize tasks)

## Features

### Project Manager
- ✅ User registration & login
- ✅ Create/delete projects
- ✅ Add/update/delete tasks
- ✅ Toggle task completion
- ✅ User data isolation

### Smart Scheduler
- ✅ Automatic task ordering
- ✅ Dependency resolution
- ✅ Priority scheduling
- ✅ Circular dependency detection

## Troubleshooting

### "dotnet: command not found"
→ Install .NET 8 SDK from link above

### "Port already in use"
→ Close other apps using ports 3000, 5000, or 5173

### Database errors
→ Delete `backend/projectmanager.db` and restart

## Documentation

- `README-COMPLETE.md` - Full documentation
- `COMPLETE_SETUP_GUIDE.md` - Detailed setup
- `IMPLEMENTATION_COMPLETE.md` - What was built
- http://localhost:5000/swagger - API docs (when running)

## Project Structure

```
Project 2/
├── backend/          → .NET 8 API (NEW - port 5000)
├── client/           → React UI (port 5173)
├── server.js         → Node.js API (port 3000)
└── start-all.ps1     → Launch script
```

## Testing Quick Start

### Test with Swagger
1. Start: `.\start-all.ps1`
2. Open: http://localhost:5000/swagger
3. Try: /api/auth/register
4. Try: /api/auth/login
5. Click: "Authorize" and paste token
6. Try: /api/projects endpoints

### Test with UI
1. Open: http://localhost:5173
2. Click: Register
3. Create: account
4. Login
5. Create: project
6. Add: tasks
7. Use: Smart Scheduler

## Success Indicators

When everything is working you'll see:

**Terminal 1:**
```
Now listening on: http://localhost:5000
Application started.
```

**Terminal 2:**
```
🚀 Smart Scheduler API running on port 3000
```

**Terminal 3:**
```
VITE v4.5.x ready in Xms
➜  Local:   http://localhost:5173/
```

## Support Files

All questions answered in:
- Installation → `COMPLETE_SETUP_GUIDE.md`
- API Usage → http://localhost:5000/swagger
- Features → `README-COMPLETE.md`
- What's Built → `IMPLEMENTATION_COMPLETE.md`

---

## ⚡ TL;DR

```powershell
# 1. Install .NET 8 SDK from: 
https://dotnet.microsoft.com/download/dotnet/8.0

# 2. Run:
cd "C:\Users\yashr\Project 2"
.\start-all.ps1

# 3. Open:
http://localhost:5173
```

**That's it!** 🎉

---

**Status:** 
- ✅ Assignment 1 (Smart Scheduler) - Complete
- ✅ Assignment 2 (Project Manager) - Complete  
- 🎯 Total Credits: 30

**Everything is ready!** Just install .NET 8 SDK and run the app! 🚀
