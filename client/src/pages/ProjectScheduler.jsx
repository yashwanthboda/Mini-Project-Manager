import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectsAPI } from '../api/projectManagerApi';
import { scheduleTasks } from '../api/scheduler';
import ScheduleResult from '../components/ScheduleResult';

const ProjectScheduler = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [scheduleResult, setScheduleResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scheduling, setScheduling] = useState(false);
  const [error, setError] = useState('');
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.get(id);
      setProject(response.data);
      setTasks(response.data.tasks || []);
      setError('');
    } catch (err) {
      setError('Failed to load project');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = async () => {
    if (!tasks || tasks.length === 0) {
      setError('No tasks available to schedule');
      return;
    }

    setScheduling(true);
    setError('');

    try {
      // Convert project tasks to scheduler format
      const schedulerTasks = tasks.map(task => ({
        title: task.title || 'Untitled Task',
        estimatedHours: task.estimatedHours || 5,
        dueDate: task.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        dependencies: task.dependencies ? JSON.parse(task.dependencies) : []
      }));

      console.log('Sending tasks to scheduler:', schedulerTasks);
      const result = await scheduleTasks(project.id, schedulerTasks);
      setScheduleResult(result);
    } catch (err) {
      setError(err.message || 'Failed to schedule tasks');
      console.error('Scheduling error:', err);
    } finally {
      setScheduling(false);
    }
  };

  const handleReset = () => {
    setScheduleResult(null);
    setError('');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Project not found</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (scheduleResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Smart Scheduler</h1>
              <p className="text-sm text-gray-600">Project: {project.title}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-300 rounded-lg hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <button
              onClick={() => navigate(`/projects/${project.id}`)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Project
            </button>
          </div>
        </div>

        {/* Results */}
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <ScheduleResult result={scheduleResult} onReset={handleReset} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Smart Scheduler</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.username}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-300 rounded-lg hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button
            onClick={() => navigate(`/projects/${project.id}`)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Project
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Project Info Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Schedule Project Tasks</h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{project.title}</h3>
            {project.description && (
              <p className="text-gray-600 mb-4">{project.description}</p>
            )}
            <div className="flex gap-4 text-sm text-gray-500">
              <span>Created: {new Date(project.creationDate).toLocaleDateString()}</span>
              <span>•</span>
              <span>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
            </div>
          </div>

          {/* Tasks Preview */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Tasks to Schedule:</h4>
            {tasks.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">No tasks available to schedule</p>
                <button
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                >
                  Add Tasks
                </button>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-800">{task.title}</h5>
                      {task.dueDate && (
                        <p className="text-sm text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      )}
                      {task.completionStatus && (
                        <span className="text-xs text-green-600 font-medium">✓ Completed</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Schedule Button */}
          {tasks.length > 0 && (
            <div className="text-center">
              <button
                onClick={handleSchedule}
                disabled={scheduling}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {scheduling ? (
                  <span className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Generating Schedule...
                  </span>
                ) : (
                  <span>🚀 Generate Smart Schedule</span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
          <ul className="list-disc list-inside text-blue-800 space-y-1">
            <li>Analyzes task dependencies and relationships</li>
            <li>Uses topological sorting to determine optimal order</li>
            <li>Considers task priorities and due dates</li>
            <li>Generates an efficient execution schedule</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ProjectScheduler;
