const BudgetCard = ({ budget }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">

      {/* Top row */}
      <div className="flex items-center justify-between">
        {/* Icon + Name */}
        <div className="flex items-center gap-3">
          <div className="text-2xl">{budget.icon || "💰"}</div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {budget.name}
            </h3>
            <p className="text-sm text-gray-500">
              {budget.expenses?.length || 0} items
            </p>
          </div>
        </div>

        {/* Budget Amount (highlighted + bolder) */}
        <div className="text-xl font-semibold text-gray-900">
          ₹{budget.amount}
        </div>
      </div>

      {/* Spent / Remaining row (exact reference style) */}
      <div className="mt-4 flex justify-between items-center text-sm">
        <span className="text-gray-600">
          <span className="font-medium text-gray-900">₹0</span>{" "}
          spent
        </span>

        <span className="text-gray-600">
          <span className="font-medium text-gray-900">
            ₹{budget.amount}
          </span>{" "}
          remaining
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
};

export default BudgetCard;
