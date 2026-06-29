import { inr } from "../../utils/format";

const LatestExpenses = ({ expenses = [], onDelete }) => (
  <div className="mt-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
    <div className="mb-5">
      <h2 className="text-base font-bold text-slate-900 dark:text-white">Latest Expenses</h2>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Recently added</p>
    </div>

    {expenses.length === 0 ? (
      <div className="text-center py-10 text-slate-400 dark:text-slate-500">
        <span className="text-3xl block mb-2">🧾</span>
        <p className="text-sm">No expenses in this period</p>
      </div>
    ) : (
      <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 text-white">
              <th className="py-3.5 px-4 text-left text-xs font-bold uppercase tracking-widest">Name</th>
              <th className="py-3.5 px-4 text-left text-xs font-bold uppercase tracking-widest">Budget</th>
              <th className="py-3.5 px-4 text-left text-xs font-bold uppercase tracking-widest">Amount</th>
              <th className="py-3.5 px-4 text-left text-xs font-bold uppercase tracking-widest">Date</th>
              <th className="py-3.5 px-4 text-center text-xs font-bold uppercase tracking-widest">Del</th>
            </tr>
          </thead>
          <tbody>
            {[...expenses].slice(-10).reverse().map((exp, i) => (
              <tr key={`${exp.budgetId}-${exp.id}`}
                className={`border-b border-slate-100 dark:border-slate-700 transition-colors duration-150 hover:bg-blue-50 dark:hover:bg-blue-900/20
                  ${i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-blue-50/40 dark:bg-slate-700/30"}`}>
                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">{exp.name}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium
                                   text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700
                                   px-2.5 py-1 rounded-full">
                    {exp.budgetIcon} {exp.budgetName}
                  </span>
                </td>
                <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">₹{inr(exp.amount)}</td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-xs">{exp.date}</td>
                <td className="py-3 px-4 text-center">
                  {onDelete && (
                    <button onClick={() => onDelete(exp.budgetId, exp.id)}
                      className="w-8 h-8 inline-flex items-center justify-center rounded-lg
                                 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30
                                 transition-all duration-200">
                      🗑️
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default LatestExpenses;
