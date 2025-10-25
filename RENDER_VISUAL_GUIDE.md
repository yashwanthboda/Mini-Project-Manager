# 📸 Visual Guide: Render Configuration

## Step-by-Step with Form Field Examples

Based on the screenshot you shared, here's what to fill in:

---

## 🎯 Form Field: Name
```
┌─────────────────────────────────────────┐
│ Mini-Project-Manager                    │
└─────────────────────────────────────────┘
```
✅ This is fine! Or use: `mini-project-manager-api`

---

## 🎯 Form Field: Language (Runtime Environment)

**What you saw:**
```
┌─────────────────────────────────────────┐
│ Node            [▼]                     │
│ ├── Docker                              │
│ ├── Elixir                              │
│ ├── Go                                  │
│ ├── Node                                │
│ ├── Python 3                            │
│ ├── Ruby                                │
│ └── Rust                                │
└─────────────────────────────────────────┘
```

**What to select:**
```
┌─────────────────────────────────────────┐
│ Docker          [✓]  ⬅️ SELECT THIS!    │
└─────────────────────────────────────────┘
```

❗ **CRITICAL**: You MUST select **Docker** because .NET is not in the list!

---

## 🎯 Form Field: Branch
```
┌─────────────────────────────────────────┐
│ main                                    │
└─────────────────────────────────────────┘
```
✅ Leave as `main` (your default branch)

---

## 🎯 Form Field: Region
```
┌─────────────────────────────────────────┐
│ Singapore       [▼]                     │
└─────────────────────────────────────────┘
```
✅ Choose closest to your users (Singapore is good for Asia)

---

## 🎯 Form Field: Root Directory

**What you saw:**
```
┌─────────────────────────────────────────┐
│ backend                                 │
└─────────────────────────────────────────┘
```

✅ **CORRECT!** Keep this as `backend`

This tells Render to:
- Look in the `backend/` folder
- Find `Dockerfile` there
- Build from that location

---

## 🎯 Form Field: Build Command

**What you saw:**
```
┌─────────────────────────────────────────┐
│ backend/ $ npm install                  │
└─────────────────────────────────────────┘
```

❌ **WRONG!** This is for Node.js

**What to do:**
```
┌─────────────────────────────────────────┐
│ (leave completely empty)                │
└─────────────────────────────────────────┘
```

✅ **DELETE** the npm install command!

When using Docker, Render reads the Dockerfile and ignores this field.

---

## 🎯 Form Field: Start Command

**What you saw:**
```
┌─────────────────────────────────────────┐
│ backend/ $ node server.js               │
└─────────────────────────────────────────┘
```

❌ **WRONG!** This is for Node.js

**What to do:**
```
┌─────────────────────────────────────────┐
│ (leave completely empty)                │
└─────────────────────────────────────────┘
```

✅ **DELETE** the node server.js command!

When using Docker, the Dockerfile's `ENTRYPOINT` is used instead.

---

## 🎯 Complete Configuration Summary

```
╔═══════════════════════════════════════════════════════╗
║             RENDER CONFIGURATION                      ║
╠═══════════════════════════════════════════════════════╣
║ Name:          Mini-Project-Manager                   ║
║ Language:      Docker  ⬅️ NOT Node!                   ║
║ Branch:        main                                    ║
║ Region:        Singapore (or your choice)             ║
║ Root Dir:      backend                                 ║
║ Build Cmd:     (empty - delete npm install)           ║
║ Start Cmd:     (empty - delete node server.js)        ║
╚═══════════════════════════════════════════════════════╝
```

---

## ⚙️ Environment Variables Section

Click **"Advanced"** button, then add these:

```
╔═══════════════════════════════════════════════════════╗
║        ENVIRONMENT VARIABLES                          ║
╠═══════════════════════════════════════════════════════╣
║ Key: ASPNETCORE_ENVIRONMENT                           ║
║ Value: Production                                     ║
╠═══════════════════════════════════════════════════════╣
║ Key: PORT                                             ║
║ Value: 8080                                           ║
╠═══════════════════════════════════════════════════════╣
║ Key: Jwt__Key                                         ║
║ Value: [64-character secure random string]           ║
╠═══════════════════════════════════════════════════════╣
║ Key: Jwt__Issuer                                      ║
║ Value: ProjectManagerAPI                              ║
╠═══════════════════════════════════════════════════════╣
║ Key: Jwt__Audience                                    ║
║ Value: ProjectManagerClient                           ║
╠═══════════════════════════════════════════════════════╣
║ Key: FrontendUrl                                      ║
║ Value: https://yourusername.github.io/Mini-Project-  ║
║        Manager                                        ║
╚═══════════════════════════════════════════════════════╝
```

---

## 🔄 Before and After

### ❌ BEFORE (Wrong - Node.js config)
```
Runtime: Node
Build: backend/ $ npm install
Start: backend/ $ node server.js
```
**Result**: Build fails! (No package.json for Node.js)

### ✅ AFTER (Correct - Docker config)
```
Runtime: Docker
Build: (empty)
Start: (empty)
```
**Result**: Build succeeds! Uses Dockerfile

---

## 🎬 What Happens When You Deploy

```
1. You click "Create Web Service"
   ↓
2. Render clones your GitHub repo
   ↓
3. Goes to backend/ folder (Root Directory)
   ↓
4. Finds Dockerfile
   ↓
5. Runs: docker build -t your-app .
   ↓
6. Downloads .NET 8.0 SDK
   ↓
7. Restores packages
   ↓
8. Builds your app
   ↓
9. Creates runtime image
   ↓
10. Starts container: dotnet ProjectManager.dll
   ↓
11. Listens on 0.0.0.0:8080
   ↓
12. Shows "Live" ✅
```

---

## 📋 Pre-Deploy Checklist

Before clicking "Create Web Service":

- [ ] Selected **Docker** from Language dropdown
- [ ] Root Directory is set to `backend`
- [ ] Build Command is **completely empty**
- [ ] Start Command is **completely empty**
- [ ] Clicked "Advanced" button
- [ ] Added all 6 environment variables
- [ ] Generated secure 64-char JWT key
- [ ] Updated FrontendUrl with your GitHub username
- [ ] Double-checked all values

---

## 🆘 If It Still Doesn't Work

### Check these files exist in your repo:

```powershell
# Run this to verify
ls backend\Dockerfile
ls backend\ProjectManager.csproj
ls backend\Program.cs
```

All three should exist!

### Check Git commit:

```powershell
git status
git add .
git commit -m "Add Dockerfile for Render deployment"
git push origin main
```

Make sure latest changes are pushed!

### Check Render is reading correct commit:

In Render dashboard:
1. Go to your service
2. Look at "Events" tab
3. Verify it's deploying from latest commit

---

## ✅ Success Indicators

### In Render Logs (after deploy):
```
==> Starting service
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://0.0.0.0:8080
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
```

### In Your Browser:
Visit: `https://your-app.onrender.com/swagger`
Should see: Swagger UI with API documentation

### Status Badge:
```
┌─────────────────────────────────┐
│  ● Live                         │
│  https://your-app.onrender.com  │
└─────────────────────────────────┘
```
Green dot = Success! 🎉

---

## 🎯 Next Steps After Deployment

1. ✅ Backend deployed successfully
2. Copy your backend URL
3. Update frontend `.env.production` file
4. Deploy frontend to GitHub Pages
5. Test full application

**Continue to**: Frontend deployment guide

---

**Remember**: The key difference is selecting **Docker** instead of Node!
