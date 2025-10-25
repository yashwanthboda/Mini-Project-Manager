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
    return {
      success: true,
      schedule: tasks.map((task, index) => ({
        ...task,
        order: index + 1,
        scheduledDate: new Date().toISOString()
      })),
      message: 'Tasks ordered (scheduler service not deployed)'
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
