import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectsAPI, tasksAPI } from '../api/projectManagerApi';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ 
    title: '', 
    dueDate: '', 
    estimatedHours: 5, 
    dependencies: [] 
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.get(id);
      console.log('Project response:', response.data);
      setProject(response.data);
      setTasks(response.data.tasks || []);
      setError('');
    } catch (err) {
      setError('Failed to load project details');
      console.error('Error fetching project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    
    if (!newTask.title.trim()) {
      return;
    }

    setCreating(true);
    try {
      await tasksAPI.create(parseInt(id), {
        title: newTask.title,
        dueDate: newTask.dueDate || undefined,
        estimatedHours: newTask.estimatedHours,
        dependencies: JSON.stringify(newTask.dependencies)
      });
      setShowAddTask(false);
      setNewTask({ title: '', dueDate: '', estimatedHours: 5, dependencies: [] });
      await fetchProjectDetails();
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleToggleTask = async (taskId, currentStatus) => {
    try {
      await tasksAPI.update(taskId, { completionStatus: !currentStatus });
      fetchProjectDetails();
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await tasksAPI.delete(taskId);
      fetchProjectDetails();
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Project Manager</h1>
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
            onClick={() => navigate('/dashboard')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Projects
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

        {/* Project Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{project.title}</h2>
          {project.description && (
            <p className="text-gray-600 mb-4">{project.description}</p>
          )}
          <div className="flex gap-4 text-sm text-gray-500">
            <span>Created: {new Date(project.creationDate).toLocaleDateString()}</span>
            <span>•</span>
            <span>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Tasks</h3>
            <button
              onClick={() => setShowAddTask(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              + Add Task
            </button>
          </div>

          {/* Tasks List */}
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No tasks yet. Add your first task!</p>
              <button
                onClick={() => setShowAddTask(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
              >
                Add Task
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <input
                    type="checkbox"
                    checked={task.completionStatus}
                    onChange={() => handleToggleTask(task.id, task.completionStatus)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <h4
                      className={`font-medium ${
                        task.completionStatus ? 'line-through text-gray-500' : 'text-gray-800'
                      }`}
                    >
                      {task.title}
                    </h4>
                    <div className="flex gap-4 text-sm text-gray-500 mt-1">
                      {task.estimatedHours && (
                        <span>⏱️ {task.estimatedHours}h</span>
                      )}
                      {task.dueDate && (
                        <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>
                      )}
                      {task.dependencies && JSON.parse(task.dependencies).length > 0 && (
                        <span>🔗 {JSON.parse(task.dependencies).length} {JSON.parse(task.dependencies).length === 1 ? 'dependency' : 'dependencies'}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Smart Scheduler Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(`/projects/${id}/schedule`)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
          >
            🚀 Smart Schedule Tasks
          </button>
        </div>
      </main>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 my-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Task</h3>
            <form onSubmit={handleAddTask}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter task title"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Hours *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newTask.estimatedHours}
                    onChange={(e) => setNewTask({ ...newTask, estimatedHours: parseInt(e.target.value) || 5 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dependencies (Select tasks that must be completed first)
                </label>
                <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
                  {tasks.length === 0 ? (
                    <p className="text-sm text-gray-500">No other tasks available</p>
                  ) : (
                    <div className="space-y-2">
                      {tasks.map((task) => (
                        <label key={task.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={newTask.dependencies.includes(task.title)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewTask({ 
                                  ...newTask, 
                                  dependencies: [...newTask.dependencies, task.title] 
                                });
                              } else {
                                setNewTask({ 
                                  ...newTask, 
                                  dependencies: newTask.dependencies.filter(d => d !== task.title) 
                                });
                              }
                            }}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{task.title}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Select which tasks need to be completed before this task can start
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddTask(false);
                    setNewTask({ title: '', dueDate: '', estimatedHours: 5, dependencies: [] });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
                >
                  {creating ? 'Adding...' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
