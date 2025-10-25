# Smart Scheduler API

A full-stack application that helps users plan their work automatically by analyzing task dependencies and generating optimal task ordering.

## Features

- ✅ Automatic task scheduling based on dependencies
- ✅ Topological sort algorithm for dependency resolution
- ✅ Due date and estimated hours prioritization
- ✅ Circular dependency detection
- ✅ Mobile-friendly React frontend
- ✅ Loading indicators and user feedback
- ✅ RESTful API design

## Technology Stack

### Backend
- Node.js
- Express.js
- CORS enabled

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Run backend only:**
   ```bash
   npm run dev
   ```

3. **Run frontend only:**
   ```bash
   npm run client
   ```

4. **Run both backend and frontend:**
   ```bash
   npm run dev-all
   ```

## API Documentation

### Schedule Tasks

**Endpoint:** `POST /api/v1/projects/:projectId/schedule`

**Request Body:**
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
    },
    {
      "title": "Build Frontend",
      "estimatedHours": 10,
      "dueDate": "2025-10-30",
      "dependencies": ["Design API"]
    },
    {
      "title": "End-to-End Test",
      "estimatedHours": 8,
      "dueDate": "2025-10-31",
      "dependencies": ["Implement Backend", "Build Frontend"]
    }
  ]
}
```

**Response:**
```json
{
  "projectId": "123",
  "recommendedOrder": [
    "Design API",
    "Implement Backend",
    "Build Frontend",
    "End-to-End Test"
  ],
  "metrics": {
    "totalTasks": 4,
    "totalEstimatedHours": 35,
    "earliestDueDate": "2025-10-25T00:00:00.000Z",
    "latestDueDate": "2025-10-31T00:00:00.000Z"
  },
  "message": "Tasks scheduled successfully"
}
```

## Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

### Frontend (Vercel)
1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set root directory to `client`
4. Vercel will auto-detect Vite configuration
5. Add environment variable `VITE_API_URL` with your Render backend URL

## Algorithm

The application uses a **Topological Sort** algorithm with Kahn's algorithm implementation to:
1. Detect circular dependencies
2. Order tasks based on dependencies
3. Prioritize by due date and estimated hours
4. Ensure all prerequisite tasks are completed before dependent tasks

## License

ISC
