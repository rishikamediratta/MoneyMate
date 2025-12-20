const BudgetCard = ({ emoji, title, used, total }) => {
  const percentage = Math.round((used / total) * 100);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-3 hover:shadow-sm transition">
      
      {/* Top row */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">
          {emoji}
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">
            {title}
          </p>
          <p className="text-xs text-gray-500">
            ₹{used} of ₹{total}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default BudgetCard;
