export default function ScheduleResult({ result, onReset }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-900">Schedule Generated!</h2>
            <p className="text-green-700 mt-1">{result.message}</p>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="text-sm text-gray-600 mb-1">Total Tasks</div>
          <div className="text-3xl font-bold text-gray-900">{result.metrics.totalTasks}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="text-sm text-gray-600 mb-1">Total Hours</div>
          <div className="text-3xl font-bold text-gray-900">{result.metrics.totalEstimatedHours}h</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="text-sm text-gray-600 mb-1">Start Date</div>
          <div className="text-lg font-bold text-gray-900">{formatDate(result.metrics.earliestDueDate)}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="text-sm text-gray-600 mb-1">End Date</div>
          <div className="text-lg font-bold text-gray-900">{formatDate(result.metrics.latestDueDate)}</div>
        </div>
      </div>

      {/* Recommended Order */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended Task Order</h3>
        
        <div className="space-y-3">
          {result.recommendedOrder.map((taskTitle, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                {index + 1}
              </div>
              <div className="flex-grow">
                <h4 className="font-semibold text-gray-900">{taskTitle}</h4>
              </div>
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onReset}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
        >
          Create New Schedule
        </button>
        <button
          onClick={() => {
            const data = JSON.stringify(result, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `schedule-${result.projectId}.json`;
            a.click();
          }}
          className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-colors"
        >
          Download JSON
        </button>
      </div>

      {/* Project Info */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <span className="font-medium">Project ID:</span> {result.projectId}
      </div>
    </div>
  );
}
