import { useNavigate } from "react-router-dom";
import { inr } from "../../utils/format";

const LatestBudgets = ({ budgets = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700
                    shadow-sm p-5 flex flex-col h-[340px]
                    hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/60 dark:hover:shadow-blue-900/30 transition-all duration-300">

      <div className="mb-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Budgets</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Category-wise limits</p>
      </div>

      {budgets.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
          <span className="text-3xl mb-2">💰</span>
          <p className="text-sm">No budgets yet</p>
          <button onClick={() => navigate("/budget")}
            className="mt-3 text-xs text-blue-500 hover:underline">
            Create your first →
          </button>
        </div>
      ) : (
        <div className="flex-1 space-y-2 overflow-y-auto pr-1">
          {budgets.slice(0, 6).map((b) => {
            const spent = (b.expenses || []).reduce((s, e) => s + e.amount, 0);
            const pct = b.amount > 0 ? Math.min((spent / b.amount) * 100, 100) : 0;
            return (
              <div key={b.id} onClick={() => navigate(`/budget/${b.id}`)}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700/60
                           cursor-pointer transition-all duration-200">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-base shrink-0">
                  {b.icon || "💰"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{b.name}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-2 shrink-0">
                      ₹{inr(spent)} / ₹{inr(b.amount)}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500
                      ${pct < 70 ? "bg-blue-500" : pct < 90 ? "bg-amber-400" : "bg-red-500"}`}
                      style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LatestBudgets;
