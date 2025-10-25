# Smart Scheduler - Architecture & Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                          │
│                     http://localhost:5173                    │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ HTTP Requests (Axios)
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                    REACT FRONTEND (Vite)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Components                                           │  │
│  │  ├── Header.jsx        (Navigation bar)              │  │
│  │  ├── TaskForm.jsx      (Main input form)             │  │
│  │  ├── TaskInput.jsx     (Individual task fields)      │  │
│  │  ├── ScheduleResult.jsx (Display results)            │  │
│  │  └── LoadingSpinner.jsx (Loading indicator)          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Client (scheduler.js)                           │  │
│  │  └── Axios → POST /api/v1/projects/:id/schedule      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ Proxy to Backend
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                EXPRESS.JS BACKEND (Node.js)                  │
│                    http://localhost:3000                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Middleware                                           │  │
│  │  ├── CORS (Cross-origin support)                     │  │
│  │  ├── express.json() (Parse JSON bodies)              │  │
│  │  └── Error handling                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes                                               │  │
│  │  ├── GET  /api/health                                │  │
│  │  ├── GET  /                                           │  │
│  │  └── POST /api/v1/projects/:projectId/schedule       │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Core Algorithm                                       │  │
│  │  ├── validateTasks() - Input validation              │  │
│  │  └── topologicalSort() - Kahn's Algorithm            │  │
│  │      ├── Build adjacency list                        │  │
│  │      ├── Calculate in-degrees                        │  │
│  │      ├── Process queue with priority                 │  │
│  │      └── Detect circular dependencies                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Request Flow

```
USER ACTION
   │
   ├─► User fills in task form
   │   (Title, Hours, Due Date, Dependencies)
   │
   ├─► Clicks "Generate Schedule"
   │
   ▼
FRONTEND PROCESSING
   │
   ├─► TaskForm.jsx validates input
   │
   ├─► Formats tasks for API
   │
   ├─► Shows LoadingSpinner
   │
   ├─► Calls scheduler.js API client
   │
   ▼
API REQUEST
   │
   ├─► POST http://localhost:3000/api/v1/projects/123/schedule
   │
   ├─► Headers: Content-Type: application/json
   │
   ├─► Body: { "tasks": [...] }
   │
   ▼
BACKEND PROCESSING
   │
   ├─► Express receives request
   │
   ├─► Parses JSON body
   │
   ├─► Validates tasks
   │   ├─► Check required fields
   │   ├─► Validate data types
   │   └─► Check positive numbers
   │
   ├─► Execute topologicalSort()
   │   ├─► Build graph structure
   │   ├─► Calculate dependencies
   │   ├─► Sort with priorities
   │   └─► Check for cycles
   │
   ├─► Calculate metrics
   │   ├─► Total tasks
   │   ├─► Total hours
   │   └─► Date range
   │
   ▼
API RESPONSE
   │
   ├─► Status: 200 OK
   │
   ├─► Body: {
   │       "recommendedOrder": [...],
   │       "metrics": {...}
   │     }
   │
   ▼
FRONTEND DISPLAY
   │
   ├─► ScheduleResult.jsx renders
   │
   ├─► Show success message
   │
   ├─► Display metrics cards
   │
   ├─► Show ordered task list
   │
   └─► Offer export/reset options
```

## Algorithm Flow - Topological Sort

```
INPUT: tasks = [
  { title: "Design API", dependencies: [] },
  { title: "Backend", dependencies: ["Design API"] },
  { title: "Frontend", dependencies: ["Design API"] },
  { title: "Test", dependencies: ["Backend", "Frontend"] }
]

STEP 1: Build Graph
────────────────────
taskMap = {
  "Design API": {...},
  "Backend": {...},
  "Frontend": {...},
  "Test": {...}
}

STEP 2: Build Adjacency List
─────────────────────────────
adjList = {
  "Design API" → ["Backend", "Frontend"],
  "Backend" → ["Test"],
  "Frontend" → ["Test"],
  "Test" → []
}

STEP 3: Calculate In-Degrees
─────────────────────────────
inDegree = {
  "Design API": 0,    (no dependencies)
  "Backend": 1,       (depends on Design API)
  "Frontend": 1,      (depends on Design API)
  "Test": 2           (depends on Backend + Frontend)
}

STEP 4: Initialize Queue
────────────────────────
queue = ["Design API"]  (in-degree = 0)

STEP 5: Process Queue
─────────────────────

Iteration 1:
  Current: "Design API"
  Result: ["Design API"]
  Update neighbors:
    - Backend: 1→0 (add to queue)
    - Frontend: 1→0 (add to queue)
  Queue: ["Backend", "Frontend"]
  Sort by due date: Backend (10-28), Frontend (10-30)

Iteration 2:
  Current: "Backend"
  Result: ["Design API", "Backend"]
  Update neighbors:
    - Test: 2→1
  Queue: ["Frontend"]

Iteration 3:
  Current: "Frontend"
  Result: ["Design API", "Backend", "Frontend"]
  Update neighbors:
    - Test: 1→0 (add to queue)
  Queue: ["Test"]

Iteration 4:
  Current: "Test"
  Result: ["Design API", "Backend", "Frontend", "Test"]
  Queue: []

OUTPUT: ["Design API", "Backend", "Frontend", "Test"]
```

## Data Flow Diagram

```
┌──────────────┐
│ User Input   │
│ (Browser)    │
└──────┬───────┘
       │
       │ Task data with dependencies
       │
┌──────▼───────┐
│ Validation   │
│ (Frontend)   │
└──────┬───────┘
       │
       │ Valid JSON
       │
┌──────▼───────┐
│ HTTP POST    │
│ (Axios)      │
└──────┬───────┘
       │
       │ API Request
       │
┌──────▼───────┐
│ Express      │
│ Router       │
└──────┬───────┘
       │
       │ Parsed data
       │
┌──────▼───────┐
│ Input        │
│ Validation   │
└──────┬───────┘
       │
       │ Validated tasks
       │
┌──────▼───────┐
│ Topological  │
│ Sort Algo    │
└──────┬───────┘
       │
       │ Ordered array
       │
┌──────▼───────┐
│ Metrics      │
│ Calculator   │
└──────┬───────┘
       │
       │ Complete result
       │
┌──────▼───────┐
│ JSON         │
│ Response     │
└──────┬───────┘
       │
       │ HTTP 200
       │
┌──────▼───────┐
│ Result       │
│ Display      │
└──────────────┘
```

## Component Hierarchy

```
App.jsx
├── Header.jsx
│   └── Logo + Version Badge
│
├── TaskForm.jsx (when no results)
│   ├── Project ID Input
│   ├── Multiple TaskInput.jsx
│   │   ├── Title Input
│   │   ├── Hours Input
│   │   ├── Date Input
│   │   └── Dependencies Select
│   ├── Add Task Button
│   └── Submit Button
│       └── LoadingSpinner.jsx (when loading)
│
├── ScheduleResult.jsx (when results exist)
│   ├── Success Banner
│   ├── Metrics Cards (4x)
│   ├── Ordered Task List
│   └── Action Buttons
│       ├── Create New
│       └── Download JSON
│
└── Footer
    └── Credits
```

## State Management

```
App.jsx State:
├── scheduleResult: null | Object
│   ├── projectId: string
│   ├── recommendedOrder: string[]
│   └── metrics: Object
│
└── loading: boolean

TaskForm.jsx State:
├── projectId: string
├── tasks: Array<Task>
│   └── Task:
│       ├── id: number
│       ├── title: string
│       ├── estimatedHours: number
│       ├── dueDate: string
│       └── dependencies: string[]
│
└── error: string
```

## Technology Stack Layers

```
┌─────────────────────────────────────┐
│         PRESENTATION LAYER           │
│  React Components + Tailwind CSS     │
│  (User Interface)                    │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         APPLICATION LAYER            │
│  React State Management              │
│  API Client (Axios)                  │
│  (Business Logic)                    │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         NETWORK LAYER                │
│  HTTP/HTTPS Protocol                 │
│  JSON Data Format                    │
│  (Communication)                     │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         API LAYER                    │
│  Express.js Routes                   │
│  Middleware (CORS, Parser)           │
│  (Endpoint Handling)                 │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         BUSINESS LOGIC LAYER         │
│  Validation Functions                │
│  Topological Sort Algorithm          │
│  (Core Functionality)                │
└─────────────────────────────────────┘
```

## Deployment Architecture

```
┌──────────────────┐        ┌──────────────────┐
│   GitHub Repo    │        │   GitHub Repo    │
│   (Backend)      │        │   (Frontend)     │
└────────┬─────────┘        └────────┬─────────┘
         │                           │
         │ Auto Deploy               │ Auto Deploy
         │                           │
┌────────▼─────────┐        ┌────────▼─────────┐
│  Render.com      │        │  Vercel.com      │
│  (Backend Host)  │◄───────┤  (Frontend Host) │
│                  │  API   │                  │
│  Node.js Server  │ Calls  │  Static Files    │
└──────────────────┘        └──────────────────┘
         │                           │
         │                           │
         └─────────┬─────────────────┘
                   │
         ┌─────────▼─────────┐
         │   End Users       │
         │   (Browsers)      │
         └───────────────────┘
```

---

This architecture ensures:
- **Separation of Concerns**: Frontend, Backend, Algorithm
- **Scalability**: Can handle multiple concurrent requests
- **Maintainability**: Clear component structure
- **Performance**: Optimized O(V+E) algorithm
- **User Experience**: Loading states and error handling
