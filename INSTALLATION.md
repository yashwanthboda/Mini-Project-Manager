# Smart Scheduler - Installation & Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`
   
2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

### Optional (Recommended)
- **Git** - for version control
- **VS Code** - recommended code editor

## Installation Steps

### Step 1: Install Backend Dependencies

Open a terminal in the project root directory and run:

```bash
npm install
```

This will install:
- express (web framework)
- cors (cross-origin resource sharing)
- dotenv (environment variables)
- nodemon (development server)
- concurrently (run multiple commands)

### Step 2: Install Frontend Dependencies

Navigate to the client folder and install dependencies:

```bash
cd client
npm install
```

This will install:
- react & react-dom (frontend framework)
- vite (build tool)
- tailwindcss (CSS framework)
- axios (HTTP client)
- autoprefixer & postcss (CSS processing)

### Step 3: Return to Root Directory

```bash
cd ..
```

## Quick Start

You have several options to run the application:

### Option 1: Run Everything (Recommended)

Install all dependencies and run both backend and frontend:

```bash
npm run install-all
npm run dev-all
```

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run dev
```
Backend will run on http://localhost:3000

**Terminal 2 - Frontend:**
```bash
npm run client
```
Frontend will run on http://localhost:5173

### Option 3: Production Mode

**Backend:**
```bash
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

## Verify Installation

1. **Backend Health Check:**
   Open browser to: http://localhost:3000/api/health
   
   You should see:
   ```json
   {
     "status": "ok",
     "message": "Smart Scheduler API is running"
   }
   ```

2. **Frontend:**
   Open browser to: http://localhost:5173
   
   You should see the Smart Scheduler interface.

## Troubleshooting

### Port Already in Use

If port 3000 or 5173 is already in use:

**Change Backend Port:**
Edit `.env` file:
```
PORT=3001
```

**Change Frontend Port:**
Edit `client/vite.config.js`:
```javascript
server: {
  port: 5174,
  // ...
}
```

### Module Not Found Errors

If you see "Cannot find module" errors:

```bash
# Clean install backend
rm -rf node_modules package-lock.json
npm install

# Clean install frontend
cd client
rm -rf node_modules package-lock.json
npm install
```

### CORS Issues

Make sure the backend is running and the frontend proxy is configured correctly in `client/vite.config.js`.

## Environment Variables

### Backend (.env)
```
PORT=3000
NODE_ENV=development
```

### Frontend (client/.env)
```
VITE_API_URL=http://localhost:3000
```

## Next Steps

1. Open http://localhost:5173 in your browser
2. Try the example data by clicking "Load Example Data"
3. Click "Generate Schedule" to see the task ordering
4. Experiment with different task configurations

## Need Help?

- Check the README.md for API documentation
- Review the example data in the application
- Ensure all dependencies are installed correctly

## Common Commands Reference

| Command | Description |
|---------|-------------|
| `npm run install-all` | Install all dependencies (backend + frontend) |
| `npm run dev` | Run backend in development mode |
| `npm run client` | Run frontend in development mode |
| `npm run dev-all` | Run both backend and frontend |
| `npm start` | Run backend in production mode |
| `cd client && npm run build` | Build frontend for production |
