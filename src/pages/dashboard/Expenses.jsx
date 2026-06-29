import { useState, useMemo } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useBudgets } from "../../hooks/useBudgets";

const Expenses = () => {
  const { budgets, allExpenses, addExpense, deleteExpense } = useBudgets();

  const [search, setSearch]           = useState("");
  const [filterBudget, setFilterBudget] = useState("all");
  const [sortBy, setSortBy]           = useState("date-desc");

  // Add expense form
  const [selectedBudget, setSelectedBudget] = useState("");
  const [expName, setExpName]         = useState("");
  const [expAmount, setExpAmount]     = useState("");
  const [formError, setFormError]     = useState("");

  const handleAdd = () => {
    if (!selectedBudget) { setFormError("Select a budget"); return; }
    if (!expName.trim()) { setFormError("Enter expense name"); return; }
    if (!expAmount || Number(expAmount) <= 0) { setFormError("Enter a valid amount"); return; }
    setFormError("");
    addExpense(selectedBudget, {
      id: Date.now(),
      name: expName.trim(),
      amount: Number(expAmount),
      date: new Date().toISOString().split("T")[0],
    });
    setExpName("");
    setExpAmount("");
  };

  const displayed = useMemo(() => {
    let list = [...allExpenses];
    if (filterBudget !== "all") list = list.filter((e) => String(e.budgetId) === filterBudget);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((e) => e.name.toLowerCase().includes(q) || e.budgetName.toLowerCase().includes(q));
    }
    switch (sortBy) {
      case "date-desc":  list.sort((a, b) => b.date.localeCompare(a.date)); break;
      case "date-asc":   list.sort((a, b) => a.date.localeCompare(b.date)); break;
      case "amount-desc":list.sort((a, b) => b.amount - a.amount); break;
      case "amount-asc": list.sort((a, b) => a.amount - b.amount); break;
      default: break;
    }
    return list;
  }, [allExpenses, filterBudget, search, sortBy]);

  const totalDisplayed = displayed.reduce((s, e) => s + e.amount, 0);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Expenses</h1>
        <p className="text-sm text-slate-400 mt-0.5">All expenses across your budgets</p>
      </div>

      {/* Add Expense */}
      <div className="card-glow bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Add Expense</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <select
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
            className="input-field"
          >
            <option value="">Select budget…</option>
            {budgets.map((b) => (
              <option key={b.id} value={String(b.id)}>
                {b.icon} {b.name}
              </option>
            ))}
          </select>

          <input
            value={expName}
            onChange={(e) => setExpName(e.target.value)}
            placeholder="Expense name"
            className="input-field"
          />
          <input
            type="number"
            value={expAmount}
            onChange={(e) => setExpAmount(e.target.value)}
            placeholder="Amount (₹)"
            className="input-field"
          />
          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium
                       hover:bg-blue-700 active:scale-[0.98] transition-all duration-200"
          >
            + Add Expense
          </button>
        </div>
        {formError && <p className="text-xs text-red-500 mt-2">{formError}</p>}
        {budgets.length === 0 && (
          <p className="text-xs text-slate-400 mt-2">
            No budgets yet. <a href="/budget" className="text-blue-500 hover:underline">Create one first →</a>
          </p>
        )}
      </div>

      {/* Summary + Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-2.5 flex items-center gap-2">
          <span className="text-xs text-slate-400">Total</span>
          <span className="text-base font-bold text-slate-900">₹{totalDisplayed.toLocaleString("en-IN")}</span>
          <span className="text-xs text-slate-400">({displayed.length} items)</span>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search expenses…"
          className="border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                     transition w-48 bg-white"
        />

        <select
          value={filterBudget}
          onChange={(e) => setFilterBudget(e.target.value)}
          className="border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
        >
          <option value="all">All budgets</option>
          {budgets.map((b) => (
            <option key={b.id} value={String(b.id)}>{b.icon} {b.name}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
        >
          <option value="date-desc">Date (newest)</option>
          <option value="date-asc">Date (oldest)</option>
          <option value="amount-desc">Amount (highest)</option>
          <option value="amount-asc">Amount (lowest)</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {displayed.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <span className="text-4xl block mb-3">🧾</span>
            <p className="text-sm font-medium">No expenses found</p>
            <p className="text-xs mt-1">Try adjusting your filters or add a new expense above</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wide">Name</th>
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wide">Budget</th>
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wide">Amount</th>
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wide">Date</th>
                  <th className="py-3 px-4 text-center text-xs font-medium uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map((exp, i) => (
                  <tr
                    key={`${exp.budgetId}-${exp.id}`}
                    className={`border-b border-slate-50 hover:bg-blue-50/40 transition-colors duration-150
                      ${i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}
                  >
                    <td className="py-3 px-4 font-medium text-slate-800">{exp.name}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium
                                       text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        {exp.budgetIcon} {exp.budgetName}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-blue-600">
                      ₹{exp.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-xs">{exp.date}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => deleteExpense(exp.budgetId, exp.id)}
                        className="w-8 h-8 inline-flex items-center justify-center rounded-lg
                                   text-slate-400 hover:text-red-500 hover:bg-red-50
                                   transition-all duration-200"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Expenses;