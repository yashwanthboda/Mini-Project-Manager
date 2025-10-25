# 🎯 Mini Project Manager with Smart Scheduler

A comprehensive full-stack project management system with intelligent task scheduling capabilities.

## 🌟 Features

### Core Project Manager
- **User Authentication**: JWT-based registration and login
- **Project Management**: Create, view, and delete projects
- **Task Management**: Add, update, toggle completion, and delete tasks
- **User Isolation**: Each user sees only their own data

### Smart Scheduler Integration
- **Automatic Task Ordering**: AI-powered dependency resolution
- **Topological Sort**: Handles complex task dependencies
- **Priority Scheduling**: Considers due dates and estimated hours
- **Circular Dependency Detection**: Prevents invalid task relationships

## 🏗️ Architecture

### Technology Stack

**Backend (.NET 8 API)**
- ASP.NET Core Web API
- Entity Framework Core
- SQLite Database
- JWT Authentication
- BCrypt Password Hashing

**Smart Scheduler (Node.js API)**
- Express.js
- Topological Sort Algorithm
- RESTful API Design

**Frontend (React + TypeScript)**
- React 18
- Vite
- Tailwind CSS
- Axios for API calls
- JWT Token Management

### Services

| Service | Port | Purpose |
|---------|------|---------|
| .NET API | 5000 | Main project manager backend |
| Node.js API | 3000 | Smart task scheduler |
| React Frontend | 5173 | Unified user interface |

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v16+) - ✅ Already installed (v22.21.0)
2. **.NET 8 SDK** - Download from https://dotnet.microsoft.com/download/dotnet/8.0

### Installation

1. **Install .NET 8 SDK**:
   - Visit: https://dotnet.microsoft.com/download/dotnet/8.0
   - Download and install SDK
   - Verify: `dotnet --version`

2. **Restore .NET packages**:
   ```powershell
   cd backend
   dotnet restore
   dotnet build
   cd ..
   ```

3. **Start all services**:
   ```powershell
   .\start-all.ps1
   ```

   Or manually in 3 terminals:
   
   **Terminal 1**:
   ```powershell
   cd backend
   dotnet run
   ```
   
   **Terminal 2**:
   ```powershell
   npm run dev
   ```
   
   **Terminal 3**:
   ```powershell
   npm run client
   ```

4. **Open application**: http://localhost:5173

## 📖 API Documentation

### .NET API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
  ```json
  {
    "username": "john",
    "email": "john@example.com",
    "password": "Password123!"
  }
  ```

- `POST /api/auth/login` - Login
  ```json
  {
    "email": "john@example.com",
    "password": "Password123!"
  }
  ```

#### Projects (Requires Authentication)
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get project by ID
- `POST /api/projects` - Create project
  ```json
  {
    "title": "My Project",
    "description": "Optional description"
  }
  ```
- `DELETE /api/projects/{id}` - Delete project

#### Tasks (Requires Authentication)
- `POST /api/tasks/projects/{projectId}/tasks` - Create task
  ```json
  {
    "title": "My Task",
    "dueDate": "2025-10-30T00:00:00Z"
  }
  ```
- `GET /api/tasks/{taskId}` - Get task
- `PUT /api/tasks/{taskId}` - Update task
  ```json
  {
    "title": "Updated Title",
    "completionStatus": true
  }
  ```
- `DELETE /api/tasks/{taskId}` - Delete task

### Node.js Smart Scheduler API

- `POST /api/v1/projects/{projectId}/schedule` - Generate optimal task order
  ```json
  {
    "tasks": [
      {
        "title": "Design API",
        "estimatedHours": 5,
        "dueDate": "2025-10-25",
        "dependencies": []
      },
      {
        "title": "Implement Backend",
        "estimatedHours": 12,
        "dueDate": "2025-10-28",
        "dependencies": ["Design API"]
      }
    ]
  }
  ```

## 🎨 User Interface

### Pages

1. **Login/Register** - Authentication forms
2. **Dashboard** - Overview of all projects
3. **Project Details** - View and manage tasks
4. **Smart Scheduler** - Generate optimized task schedules

### Features

- Responsive design (mobile, tablet, desktop)
- Loading indicators
- Error handling with user feedback
- Token-based authentication
- Protected routes
- Real-time updates

## 🗄️ Database

**SQLite** (`backend/projectmanager.db`)

### Schema

**Users**
- Id (PK)
- Username (unique)
- Email (unique)
- PasswordHash
- CreatedAt

**Projects**
- Id (PK)
- Title
- Description
- CreationDate
- UserId (FK)

**Tasks**
- Id (PK)
- Title
- DueDate
- CompletionStatus
- ProjectId (FK)

## 🧪 Testing

### Test with Swagger

1. Start .NET API
2. Visit: http://localhost:5000/swagger
3. Use "Authorize" button to add JWT token
4. Test all endpoints interactively

### Test with PowerShell

**Register**:
```powershell
$body = @{
    username = "testuser"
    email = "test@example.com"
    password = "Password123!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

**Login and Get Token**:
```powershell
$body = @{
    email = "test@example.com"
    password = "Password123!"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
$token = $response.token
```

**Create Project**:
```powershell
$headers = @{ Authorization = "Bearer $token" }
$body = @{
    title = "Test Project"
    description = "My test project"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/projects" -Method Post -Body $body -ContentType "application/json" -Headers $headers
```

## 📁 Project Structure

```
Project 2/
├── backend/                    # .NET 8 API
│   ├── Controllers/
│   │   ├── AuthController.cs
│   │   ├── ProjectsController.cs
│   │   └── TasksController.cs
│   ├── Models/
│   │   ├── User.cs
│   │   ├── Project.cs
│   │   └── ProjectTask.cs
│   ├── DTOs/
│   ├── Data/
│   │   └── ApplicationDbContext.cs
│   ├── Services/
│   │   └── TokenService.cs
│   ├── Program.cs
│   └── ProjectManager.csproj
│
├── client/                     # React Frontend
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
│
├── server.js                   # Node.js Smart Scheduler
├── package.json
├── start-all.ps1              # Launch script
└── COMPLETE_SETUP_GUIDE.md    # Detailed setup
```

## 🔐 Security Features

- JWT token authentication
- BCrypt password hashing
- User data isolation
- CORS configuration
- Input validation
- SQL injection prevention (EF Core)

## 🎯 Credits

- **Assignment 1**: Smart Scheduler API (10 credits) ✅
- **Assignment 2**: Mini Project Manager (20 credits) ✅
- **Total**: 30 credits

## 📝 Documentation Files

- `README.md` - This file
- `COMPLETE_SETUP_GUIDE.md` - Detailed setup instructions
- `INSTALLATION.md` - Original smart scheduler setup
- `DEPLOYMENT.md` - Deployment guide
- `API_TESTING.md` - API testing examples
- `ARCHITECTURE.md` - System architecture
- `PROJECT_SUMMARY.md` - Complete overview

## 🚀 Deployment

### .NET API
- Can deploy to Azure App Service
- Or use Render, Heroku, Railway

### Node.js API
- Already set up for Render deployment

### React Frontend
- Already set up for Vercel deployment

## 🤝 Contributing

This is a portfolio/assignment project demonstrating:
- Full-stack development
- RESTful API design
- Authentication & Authorization
- Database design
- Modern web technologies
- Algorithm implementation

## 📄 License

ISC

---

**Ready to use!** Follow the Quick Start section to run the application. 🎉
