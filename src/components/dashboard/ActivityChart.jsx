import { inr } from "../../utils/format";

// Returns array of last N days: [{date: "2026-03-28", label: "Mon"}]
const getLastNDays = (n = 7) => {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return {
      date: d.toISOString().split("T")[0],
      label: d.toLocaleDateString("en-IN", { weekday: "short" }),
      dayLabel: String(d.getDate()),
    };
  });
};

const ActivityChart = ({ expenses = [] }) => {
  const days = getLastNDays(7);

  // Build a lookup: date → total amount
  const byDate = {};
  expenses.forEach((exp) => {
    if (exp.date) byDate[exp.date] = (byDate[exp.date] || 0) + (exp.amount || 0);
  });

  const values = days.map((d) => byDate[d.date] || 0);
  const maxVal = Math.max(...values, 1);
  const hasData = values.some((v) => v > 0);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700
                    shadow-sm p-6 h-[340px] flex flex-col
                    hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/60 dark:hover:shadow-blue-900/30
                    transition-all duration-300">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Spending Activity</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Last 7 days</p>
        </div>
        {!hasData && (
          <span className="text-xs text-slate-400 bg-slate-50 dark:bg-slate-700 px-3 py-1 rounded-full">
            No data yet
          </span>
        )}
      </div>

      {/* Chart bars */}
      <div className="flex-1 flex items-end gap-3">
        {days.map(({ label, dayLabel }, i) => {
          const val = values[i];
          const pct = Math.round((val / maxVal) * 100);

          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
              {/* Tooltip amount */}
              <div className={`text-[10px] font-semibold transition-all duration-200 ${val > 0 ? "text-blue-600 dark:text-blue-400" : "text-transparent"}`}>
                ₹{val > 0 ? (val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val) : "0"}
              </div>

              {/* Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden" style={{ height: "160px" }}>
                <div
                  className={`w-full rounded-lg transition-all duration-700 ease-out
                    ${val > 0
                      ? "bg-gradient-to-t from-blue-600 to-blue-400 group-hover:from-blue-700 group-hover:to-blue-500"
                      : "bg-slate-100 dark:bg-slate-700"
                    }`}
                  style={{
                    height: val > 0 ? `${Math.max(pct, 8)}%` : "4%",
                    marginTop: "auto",
                    position: "relative",
                    bottom: 0,
                  }}
                />
              </div>

              {/* Labels */}
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">{label}</span>
              <span className="text-[9px] text-slate-300 dark:text-slate-600">{dayLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityChart;
