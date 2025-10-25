# 📋 Mini Project Manager

A modern, full-stack project management application with intelligent task scheduling, built with React, ASP.NET Core, and Node.js. Manage projects, track tasks, and optimize your workflow with smart dependency-based scheduling.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://yashwanthboda.github.io/Mini-Project-Manager/)
[![Backend API](https://img.shields.io/badge/Backend-API-green?style=for-the-badge)](https://mini-project-manager-p7jx.onrender.com)

## ✨ Features

### 🔐 User Authentication
- Secure JWT-based authentication
- User registration and login
- Protected routes and session management

### 📊 Project Management
- Create and manage multiple projects
- Track project progress with completion percentages
- View project statistics (total/completed tasks)
- Detailed project views with task breakdowns

### ✅ Task Management
- Create, update, and delete tasks
- Set task priorities (Low, Medium, High)
- Track task status (Todo, In Progress, Completed)
- Assign estimated hours and due dates
- Manage task dependencies

### 🧠 Smart Task Scheduler
- **Intelligent task ordering** based on dependencies
- Topological sort algorithm for optimal task sequencing
- Automatic metrics calculation:
  - Total tasks and estimated hours
  - Project timeline (earliest/latest dates)
  - Dependency validation
- Visual schedule results with actionable insights

### 🎨 Modern UI/UX
- Clean, responsive design with Tailwind CSS
- Dark mode friendly color scheme
- Loading states and error handling
- Smooth animations and transitions
- Mobile-responsive interface

## 🏗️ Architecture

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 4.5.0
- **Routing**: React Router DOM 7.9.4
- **Styling**: Tailwind CSS 3.3.3
- **HTTP Client**: Axios
- **Deployment**: GitHub Pages

### Backend (.NET API)
- **Framework**: ASP.NET Core 8.0
- **ORM**: Entity Framework Core
- **Database**: SQLite
- **Authentication**: JWT Bearer tokens
- **API Documentation**: Swagger/OpenAPI
- **Deployment**: Render (Docker)

### Scheduler Service
- **Runtime**: Node.js
- **Framework**: Express.js
- **Algorithm**: Topological Sort for dependency resolution
- **CORS**: Configured for cross-origin requests
- **Deployment**: Render

## 🚀 Live Demo

- **Frontend**: [https://yashwanthboda.github.io/Mini-Project-Manager/](https://yashwanthboda.github.io/Mini-Project-Manager/)
- **Backend API**: [https://mini-project-manager-p7jx.onrender.com](https://mini-project-manager-p7jx.onrender.com)
- **API Docs**: [https://mini-project-manager-p7jx.onrender.com/swagger](https://mini-project-manager-p7jx.onrender.com/swagger)

> **Note**: Backend services are hosted on Render's free tier and may take 30-60 seconds to wake up from sleep mode on first request.

## 📦 Installation

### Prerequisites
- **Node.js** 18+ and npm
- **.NET SDK** 8.0+
- **Git**

### Clone the Repository
```bash
git clone https://github.com/yashwanthboda/Mini-Project-Manager.git
cd Mini-Project-Manager
```

### Backend Setup (.NET)
```bash
cd backend

# Restore dependencies
dotnet restore

# Run database migrations
dotnet ef database update

# Start the backend server
dotnet run
```
Backend will be available at `http://localhost:5000`

### Frontend Setup (React)
```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```
Frontend will be available at `http://localhost:5173`

### Scheduler Service Setup (Node.js)
```bash
# From project root
npm install

# Start scheduler service
npm start
```
Scheduler service will be available at `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

#### Frontend (`client/.env.production`)
```env
VITE_PM_API_URL=https://mini-project-manager-p7jx.onrender.com
```

#### Backend (`backend/appsettings.json`)
```json
{
  "Jwt": {
    "Key": "your-super-secret-jwt-key-min-32-chars",
    "Issuer": "ProjectManager",
    "Audience": "ProjectManagerUsers"
  },
  "FrontendUrl": "https://yashwanthboda.github.io"
}
```

#### Scheduler Service (`server.js`)
```javascript
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
```

## 📚 API Documentation

The backend API includes comprehensive Swagger documentation. Once the backend is running, visit:
- **Local**: [http://localhost:5000/swagger](http://localhost:5000/swagger)
- **Production**: [https://mini-project-manager-p7jx.onrender.com/swagger](https://mini-project-manager-p7jx.onrender.com/swagger)

### Key Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

#### Projects
- `GET /api/projects` - Get all user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/{id}` - Get project details
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

#### Tasks
- `GET /api/projects/{projectId}/tasks` - Get project tasks
- `POST /api/projects/{projectId}/tasks` - Create task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

#### Scheduler
- `POST /api/v1/projects/{projectId}/schedule` - Generate task schedule

## 🎯 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Create Project**: Add a new project with name and description
3. **Add Tasks**: Create tasks with details (priority, due date, estimated hours)
4. **Set Dependencies**: Link tasks that depend on others
5. **Generate Schedule**: Use the Smart Scheduler to get optimal task ordering
6. **Track Progress**: Update task status as you complete work

## 🐳 Docker Deployment

### Backend Dockerfile
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY *.csproj ./
RUN dotnet restore *.csproj
COPY . .
RUN dotnet build *.csproj -c Release -o /app/build

FROM build AS publish
RUN dotnet publish *.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:${PORT:-8080}
ENTRYPOINT ["dotnet", "ProjectManager.dll"]
```

### Build and Run
```bash
# Build Docker image
docker build -t mini-project-manager ./backend

# Run container
docker run -p 8080:8080 mini-project-manager
```

## 📁 Project Structure

```
Mini-Project-Manager/
├── backend/                 # ASP.NET Core API
│   ├── Controllers/        # API endpoints
│   ├── Models/             # Data models
│   ├── DTOs/               # Data transfer objects
│   ├── Data/               # Database context
│   ├── Services/           # Business logic
│   └── Program.cs          # Entry point
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API clients
│   │   ├── components/    # React components
│   │   ├── context/       # State management
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Root component
│   └── vite.config.js     # Vite configuration
├── server.js              # Node.js scheduler service
├── Dockerfile             # Docker configuration
└── README.md              # This file
```

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React, Vite, Tailwind CSS, React Router |
| **Backend API** | ASP.NET Core 8.0, Entity Framework, SQLite |
| **Scheduler** | Node.js, Express.js |
| **Authentication** | JWT Bearer Tokens |
| **Deployment** | GitHub Pages, Render (Docker) |
| **CI/CD** | GitHub Actions |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Yashwanth Boda**
- GitHub: [@yashwanthboda](https://github.com/yashwanthboda)

## 🙏 Acknowledgments

- React team for the amazing framework
- Microsoft for ASP.NET Core
- Tailwind CSS for the utility-first CSS framework
- Render for free hosting services

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yashwanthboda/Mini-Project-Manager/issues) page
2. Review the deployment guides in the repository
3. Open a new issue with detailed information

---

**⭐ If you find this project useful, please consider giving it a star!**