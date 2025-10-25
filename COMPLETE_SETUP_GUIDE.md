# 🎯 Mini Project Manager - Complete Setup Guide

## Project Overview

This is a **full-stack project management application** with two parts:

1. **Project Manager** (.NET 8 Backend + React Frontend)
   - User Authentication (JWT)
   - Projects CRUD
   - Tasks CRUD
   
2. **Smart Scheduler** (Node.js API - Already Running)
   - Task scheduling with dependencies
   - Topological sort algorithm

## Architecture

```
Port 5000: .NET 8 API (Project Manager Backend)
Port 3000: Node.js API (Smart Scheduler - Already Running)
Port 5173: React Frontend (Unified UI for both)
```

## Prerequisites

### Already Installed ✅
- Node.js v22.21.0
- npm

### Need to Install
- **.NET 8 SDK** - Download from: https://dotnet.microsoft.com/download/dotnet/8.0

## Installation Steps

### Step 1: Install .NET 8 SDK

1. Go to: https://dotnet.microsoft.com/download/dotnet/8.0
2. Download **".NET 8.0 SDK"** (not Runtime)
3. Run the installer
4. Restart PowerShell
5. Verify:
   ```powershell
   dotnet --version
   ```
   Should show: `8.0.x`

### Step 2: Restore .NET Packages

```powershell
cd "C:\Users\yashr\Project 2\backend"
dotnet restore
```

### Step 3: Build .NET Project

```powershell
dotnet build
```

### Step 4: Run the Complete Application

You need **3 terminal windows**:

**Terminal 1 - .NET API (Project Manager Backend):**
```powershell
cd "C:\Users\yashr\Project 2\backend"
dotnet run
```
Runs on: http://localhost:5000

**Terminal 2 - Node.js API (Smart Scheduler - Already Setup):**
```powershell
cd "C:\Users\yashr\Project 2"
npm run dev
```
Runs on: http://localhost:3000

**Terminal 3 - React Frontend:**
```powershell
cd "C:\Users\yashr\Project 2"
npm run client
```
Runs on: http://localhost:5173

## Quick Start Script

Or use this PowerShell script to run all three:

```powershell
# Terminal 1
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\yashr\Project 2\backend'; dotnet run"

# Terminal 2  
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\yashr\Project 2'; npm run dev"

# Terminal 3
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\yashr\Project 2'; npm run client"
```

## Application Features

### 1. Authentication
- **Register**: Create new account
- **Login**: Get JWT token
- **Protected Routes**: Only authenticated users can access

### 2. Project Management
- **Create Project**: Title (3-100 chars) + Description (optional, up to 500 chars)
- **View Projects**: List all user's projects
- **View Project Details**: See individual project with task list
- **Delete Project**: Remove project and all its tasks

### 3. Task Management
- **Create Task**: Title + Optional due date
- **Update Task**: Change title, due date, or completion status
- **Toggle Completion**: Mark tasks as complete/incomplete
- **Delete Task**: Remove task from project

### 4. Smart Scheduler (Integration)
- **Generate Schedule**: Use existing Node.js API
- **Dependency Resolution**: Topological sort
- **Priority Ordering**: By due date and estimated hours

## API Endpoints

### .NET API (Port 5000)

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

**Projects:**
- `GET /api/projects` - Get all user's projects
- `GET /api/projects/{id}` - Get project by ID
- `POST /api/projects` - Create new project
- `DELETE /api/projects/{id}` - Delete project

**Tasks:**
- `POST /api/tasks/projects/{projectId}/tasks` - Create task
- `GET /api/tasks/{taskId}` - Get task
- `PUT /api/tasks/{taskId}` - Update task
- `DELETE /api/tasks/{taskId}` - Delete task

### Node.js API (Port 3000)
- `POST /api/v1/projects/{projectId}/schedule` - Generate task schedule

## Database

- **Type**: SQLite
- **Location**: `backend/projectmanager.db`
- **Auto-created**: On first run
- **Schema**: Users, Projects, Tasks

## Testing the Application

### 1. Register a User
```powershell
$body = @{
    username = "testuser"
    email = "test@example.com"
    password = "Password123!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

### 2. Login
```powershell
$body = @{
    email = "test@example.com"
    password = "Password123!"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
$token = $response.token
```

### 3. Create Project
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

$body = @{
    title = "My First Project"
    description = "This is a test project"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/projects" -Method Post -Body $body -ContentType "application/json" -Headers $headers
```

## Swagger Documentation

Once .NET API is running, visit:
**http://localhost:5000/swagger**

You can test all API endpoints with JWT authentication.

## Project Structure

```
Project 2/
├── backend/              (.NET 8 API)
│   ├── Controllers/
│   ├── Models/
│   ├── DTOs/
│   ├── Data/
│   ├── Services/
│   ├── Program.cs
│   └── ProjectManager.csproj
│
├── client/               (React Frontend)
│   └── src/
│       ├── api/
│       ├── components/
│       └── App.jsx
│
├── server.js            (Node.js Smart Scheduler)
└── package.json         (Node.js dependencies)
```

## Current Status

✅ Node.js Smart Scheduler API - **RUNNING** (port 3000)
✅ React Frontend - **RUNNING** (port 5173)
⏳ .NET Project Manager API - **NEED TO START** (port 5000)

## Next Steps

1. **Install .NET 8 SDK** (if not installed)
2. **Run .NET API**: `cd backend; dotnet run`
3. **Access Application**: http://localhost:5173
4. **Test Features**:
   - Register/Login
   - Create projects
   - Add tasks
   - Use Smart Scheduler

## Troubleshooting

### .NET SDK Not Found
```powershell
dotnet --version
```
If error, install from: https://dotnet.microsoft.com/download/dotnet/8.0

### Port Already in Use
Change port in `backend/Properties/launchSettings.json`:
```json
"applicationUrl": "http://localhost:5001"
```

### Database Issues
Delete `backend/projectmanager.db` and restart .NET API to recreate.

### CORS Issues
Make sure all three services are running on correct ports.

---

**The complete application is now ready!** 🎉

Install .NET 8 SDK and run all three services to use the full-featured project manager with smart scheduling.
