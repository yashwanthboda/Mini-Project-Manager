# API Testing Guide

## Using cURL

### 1. Health Check

```bash
curl http://localhost:3000/api/health
```

### 2. Schedule Tasks

```bash
curl -X POST http://localhost:3000/api/v1/projects/test-project/schedule \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

## Using PowerShell

### 1. Health Check

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/health" -Method Get
```

### 2. Schedule Tasks

```powershell
$body = @{
    tasks = @(
        @{
            title = "Design API"
            estimatedHours = 5
            dueDate = "2025-10-25"
            dependencies = @()
        },
        @{
            title = "Implement Backend"
            estimatedHours = 12
            dueDate = "2025-10-28"
            dependencies = @("Design API")
        },
        @{
            title = "Build Frontend"
            estimatedHours = 10
            dueDate = "2025-10-30"
            dependencies = @("Design API")
        },
        @{
            title = "End-to-End Test"
            estimatedHours = 8
            dueDate = "2025-10-31"
            dependencies = @("Implement Backend", "Build Frontend")
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:3000/api/v1/projects/test-project/schedule" -Method Post -Body $body -ContentType "application/json"
```

## Using Postman

### Setup:
1. Download Postman: https://www.postman.com/downloads/
2. Create new collection "Smart Scheduler API"

### Request 1: Health Check
- **Method:** GET
- **URL:** `http://localhost:3000/api/health`
- Click "Send"

### Request 2: Schedule Tasks
- **Method:** POST
- **URL:** `http://localhost:3000/api/v1/projects/my-project/schedule`
- **Headers:**
  - Key: `Content-Type`
  - Value: `application/json`
- **Body:** (raw, JSON)
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

## Test Cases

### Test 1: Simple Tasks (No Dependencies)
```json
{
  "tasks": [
    {
      "title": "Task A",
      "estimatedHours": 3,
      "dueDate": "2025-10-30",
      "dependencies": []
    },
    {
      "title": "Task B",
      "estimatedHours": 2,
      "dueDate": "2025-10-25",
      "dependencies": []
    }
  ]
}
```
Expected: Task B first (earlier due date)

### Test 2: Linear Dependencies
```json
{
  "tasks": [
    {
      "title": "Step 1",
      "estimatedHours": 1,
      "dueDate": "2025-10-25",
      "dependencies": []
    },
    {
      "title": "Step 2",
      "estimatedHours": 1,
      "dueDate": "2025-10-26",
      "dependencies": ["Step 1"]
    },
    {
      "title": "Step 3",
      "estimatedHours": 1,
      "dueDate": "2025-10-27",
      "dependencies": ["Step 2"]
    }
  ]
}
```
Expected: Step 1 → Step 2 → Step 3

### Test 3: Circular Dependency (Should Fail)
```json
{
  "tasks": [
    {
      "title": "Task A",
      "estimatedHours": 1,
      "dueDate": "2025-10-25",
      "dependencies": ["Task B"]
    },
    {
      "title": "Task B",
      "estimatedHours": 1,
      "dueDate": "2025-10-26",
      "dependencies": ["Task A"]
    }
  ]
}
```
Expected: Error - "Circular dependency detected"

## Expected Responses

### Success Response:
```json
{
  "projectId": "test-project",
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

### Error Response (Circular Dependency):
```json
{
  "error": "Circular dependency detected in tasks"
}
```

### Error Response (Invalid Input):
```json
{
  "error": "Task \"X\" must have a valid estimatedHours (positive number)"
}
```
