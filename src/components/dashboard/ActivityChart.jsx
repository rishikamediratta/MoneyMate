const ActivityChart = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Activity
          </h2>
          <p className="text-sm text-gray-500">
            Spending overview
          </p>
        </div>

        {/* Filter placeholder */}
        <button className="text-sm px-3 py-1.5 border rounded-md text-gray-600 hover:bg-gray-100">
          Monthly ▾
        </button>
      </div>

      {/* Chart placeholder */}
      <div className="h-56 flex items-end gap-4">
        
        {[40, 65, 30, 80, 55, 70, 45].map((height, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            
            <div
              className="w-full rounded-md bg-gradient-to-t from-blue-500 to-blue-300"
              style={{ height: `${height}%` }}
            ></div>

            <span className="text-xs text-gray-500">
              {["M", "T", "W", "T", "F", "S", "S"][index]}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ActivityChart;
