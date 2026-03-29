import { useNavigate } from "react-router-dom";

const BudgetCard = ({ budget, clickable = true }) => {
  // 🛑 HARD GUARD — prevents ALL blank/black screens
  if (!budget || typeof budget !== "object") return null;

  const navigate = useNavigate();

  // Calculations
  const spent =
    budget.expenses?.reduce((sum, e) => sum + e.amount, 0) || 0;

  const remaining = Math.max(budget.amount - spent, 0);

  const progress =
    budget.amount === 0
      ? 0
      : Math.min((spent / budget.amount) * 100, 100);

  return (
    <div
      onClick={() =>
        clickable && navigate(`/budget/${budget.id}`)
      }
      className={`bg-white rounded-xl border border-gray-200 p-5 transition
        ${clickable ? "cursor-pointer hover:shadow-md" : ""}`}
    >
      {/* TOP */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-2xl">
            {budget.icon || "💰"}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              {budget.name}
            </h3>
            <p className="text-sm text-gray-500">
              {budget.expenses?.length || 0} items
            </p>
          </div>
        </div>

        <div className="text-xl font-semibold text-gray-900">
          ₹{budget.amount}
        </div>
      </div>

      {/* STATS */}
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>
          <span className="font-medium text-gray-900">
            ₹{spent}
          </span>{" "}
          spent
        </span>

        <span>
          <span className="font-medium text-gray-900">
            ₹{remaining}
          </span>{" "}
          remaining
        </span>
      </div>

      {/* PROGRESS */}
      <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            progress < 70
              ? "bg-blue-600"
              : progress < 90
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default BudgetCard;
