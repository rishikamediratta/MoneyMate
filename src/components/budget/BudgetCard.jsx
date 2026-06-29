import { useNavigate } from "react-router-dom";

const BudgetCard = ({ budget, clickable = true, onDelete }) => {
  if (!budget || typeof budget !== "object") return null;

  const navigate = useNavigate();

  const spent = budget.expenses?.reduce((sum, e) => sum + e.amount, 0) || 0;
  const remaining = Math.max(budget.amount - spent, 0);
  const progress =
    budget.amount === 0 ? 0 : Math.min((spent / budget.amount) * 100, 100);

  return (
    <div
      onClick={() => clickable && navigate(`/budget/${budget.id}`)}
      className={`card-glow bg-white rounded-2xl border border-slate-100 shadow-sm p-5 transition-all
        ${clickable ? "cursor-pointer" : ""}`}
    >
      {/* TOP */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-slate-100 text-xl">
            {budget.icon || "💰"}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">{budget.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {budget.expenses?.length || 0} items
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-slate-900">
            ₹{budget.amount.toLocaleString("en-IN")}
          </span>
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(budget.id);
              }}
              className="w-7 h-7 flex items-center justify-center rounded-lg
                         text-slate-300 hover:text-red-500 hover:bg-red-50
                         transition-all duration-200 text-sm"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {/* STATS */}
      <div className="mt-4 flex justify-between text-xs text-slate-500">
        <span>
          <span className="font-semibold text-slate-800">
            ₹{spent.toLocaleString("en-IN")}
          </span>{" "}
          spent
        </span>
        <span>
          <span className="font-semibold text-slate-800">
            ₹{remaining.toLocaleString("en-IN")}
          </span>{" "}
          left
        </span>
      </div>

      {/* PROGRESS */}
      <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            progress < 70 ? "bg-blue-500" : progress < 90 ? "bg-amber-400" : "bg-red-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default BudgetCard;
