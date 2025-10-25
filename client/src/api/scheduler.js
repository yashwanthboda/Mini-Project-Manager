import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_PM_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const scheduleTasks = async (projectId, tasks) => {
  try {
    // Note: Scheduler service not deployed yet
    // This would call a separate Node.js service for task scheduling
    console.warn('Scheduler service not available. Using simple ordering.');
    
    // Simple fallback: return tasks in the order they were provided
    // Match the exact response structure from server.js
    const metrics = {
      totalTasks: tasks.length,
      totalEstimatedHours: tasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0),
      earliestDueDate: tasks.reduce((earliest, task) => {
        const dueDate = new Date(task.dueDate);
        return dueDate < earliest ? dueDate : earliest;
      }, new Date(tasks[0]?.dueDate || Date.now())),
      latestDueDate: tasks.reduce((latest, task) => {
        const dueDate = new Date(task.dueDate);
        return dueDate > latest ? dueDate : latest;
      }, new Date(tasks[0]?.dueDate || Date.now()))
    };
    
    return {
      projectId,
      recommendedOrder: tasks.map(task => task.title || task.name),
      metrics,
      message: 'Tasks ordered (scheduler service not deployed - using simple ordering)'
    };
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Failed to schedule tasks');
    } else if (error.request) {
      throw new Error('Scheduler service not available. Tasks will be shown in default order.');
    } else {
      throw new Error('Failed to schedule tasks');
    }
  }
};

export const healthCheck = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend is not responding');
  }
};

export default api;
