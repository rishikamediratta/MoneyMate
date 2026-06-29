import { inr } from "../../utils/format";

const COLORS = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#06b6d4", "#f97316", "#ec4899",
];

const BudgetPieChart = ({ budgets = [] }) => {
  const data = budgets
    .filter((b) => b.amount > 0)
    .map((b, i) => ({
      label: b.name,
      icon: b.icon || "💰",
      value: b.amount,
      spent: (b.expenses || []).reduce((s, e) => s + e.amount, 0),
      color: COLORS[i % COLORS.length],
    }));

  const total = data.reduce((s, d) => s + d.value, 0);
  if (!data.length || !total) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700
                      shadow-sm p-6 flex flex-col items-center justify-center h-[340px]
                      hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/60 dark:hover:shadow-blue-900/30 transition-all duration-300">
        <span className="text-4xl mb-3">🥧</span>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No budgets yet</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Create budgets to see the breakdown</p>
      </div>
    );
  }

  // Build SVG pie slices
  const SIZE = 120;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const R = 44;
  const IR = 28; // inner radius for donut

  let currentAngle = -Math.PI / 2;
  const slices = data.map((d) => {
    const angle = (d.value / total) * 2 * Math.PI;
    const start = currentAngle;
    const end = currentAngle + angle;
    currentAngle = end;

    const x1 = CX + R * Math.cos(start);
    const y1 = CY + R * Math.sin(start);
    const x2 = CX + R * Math.cos(end);
    const y2 = CY + R * Math.sin(end);
    const ix1 = CX + IR * Math.cos(start);
    const iy1 = CY + IR * Math.sin(start);
    const ix2 = CX + IR * Math.cos(end);
    const iy2 = CY + IR * Math.sin(end);
    const large = angle > Math.PI ? 1 : 0;

    return {
      ...d,
      pct: Math.round((d.value / total) * 100),
      path: `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2}
             L ${ix2} ${iy2} A ${IR} ${IR} 0 ${large} 0 ${ix1} ${iy1} Z`,
    };
  });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700
                    shadow-sm p-6 h-[340px] flex flex-col
                    hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/60 dark:hover:shadow-blue-900/30 transition-all duration-300">
      <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Budget Split</h2>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">Allocation by category</p>

      <div className="flex flex-1 items-center gap-5">
        {/* Donut SVG */}
        <div className="shrink-0">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="130" height="130">
            {slices.map((s, i) => (
              <path
                key={i}
                d={s.path}
                fill={s.color}
                stroke="white"
                strokeWidth="1.5"
                className="cursor-pointer hover:opacity-80 transition-opacity duration-150"
              >
                <title>{s.label}: ₹{inr(s.value)} ({s.pct}%)</title>
              </path>
            ))}
            {/* Center text */}
            <text x={CX} y={CY - 4} textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">Total</text>
            <text x={CX} y={CY + 7} textAnchor="middle" fontSize="8" fill="#0f172a" fontWeight="700">
              ₹{total >= 1000 ? `${(total / 1000).toFixed(0)}k` : total}
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2 overflow-y-auto">
          {slices.map((s, i) => (
            <div key={i} className="flex items-center gap-2 group">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate flex-1">{s.icon} {s.label}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetPieChart;
