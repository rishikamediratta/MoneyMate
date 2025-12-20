import BudgetCard from "./BudgetCard";

const LatestBudgets = () => {
  const budgets = [
    { emoji: "🍔", title: "Food & Dining", used: 12000, total: 15000 },
    { emoji: "🛍️", title: "Shopping", used: 8000, total: 12000 },
    { emoji: "🚕", title: "Transport", used: 3000, total: 5000 },
    { emoji: "🎮", title: "Entertainment", used: 4500, total: 7000 },
    { emoji: "🏠", title: "Rent", used: 18000, total: 20000 },
    { emoji: "📱", title: "Subscriptions", used: 1200, total: 2000 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col h-[420px]">
      
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Budgets
        </h2>
        <p className="text-sm text-gray-500">
          Category-wise limits
        </p>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
        {budgets.map((budget, index) => (
          <BudgetCard key={index} {...budget} />
        ))}
      </div>
    </div>
  );
};

export default LatestBudgets;
