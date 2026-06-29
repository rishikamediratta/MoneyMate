import { useState, useMemo } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Cards from "../../components/dashboard/Cards";
import ActivityChart from "../../components/dashboard/ActivityChart";
import LatestBudgets from "../../components/dashboard/LatestBudgets";
import LatestExpenses from "../../components/dashboard/LatestExpenses";
import { useBudgets } from "../../hooks/useBudgets";

// Get current month string e.g. "2025-12"
const currentMonthStr = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

const Dashboard = () => {
  const { budgets, allExpenses, totalBudget, deleteExpense } = useBudgets();

  // Filter mode: "month" or "range"
  const [filterMode, setFilterMode] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(currentMonthStr());
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Filter expenses by selected period
  const filteredExpenses = useMemo(() => {
    return allExpenses.filter((exp) => {
      if (!exp.date) return false;
      if (filterMode === "month") {
        return exp.date.startsWith(selectedMonth);
      }
      // range mode
      const d = exp.date;
      const from = fromDate || "0000-01-01";
      const to = toDate || "9999-12-31";
      return d >= from && d <= to;
    });
  }, [allExpenses, filterMode, selectedMonth, fromDate, toDate]);

  const totalSpent = filteredExpenses.reduce((s, e) => s + e.amount, 0);
  const savings = totalBudget - totalSpent;
  const usagePercent =
    totalBudget > 0 ? Math.min(100, Math.round((totalSpent / totalBudget) * 100)) : 0;

  return (
    <DashboardLayout>
      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-400 mt-0.5">Track your spending and budgets</p>
      </div>

      {/* DATE FILTER BAR */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-6 flex flex-wrap items-center gap-3">
        {/* Mode Toggle */}
        <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
          <button
            onClick={() => setFilterMode("month")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
              ${filterMode === "month" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
          >
            📅 Month
          </button>
          <button
            onClick={() => setFilterMode("range")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
              ${filterMode === "range" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
          >
            📆 Date Range
          </button>
        </div>

        {/* Month Picker */}
        {filterMode === "month" && (
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                       transition-all duration-200 bg-white"
          />
        )}

        {/* Date Range Picker */}
        {filterMode === "range" && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium">From</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700
                           focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                           transition-all duration-200 bg-white"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium">To</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700
                           focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                           transition-all duration-200 bg-white"
              />
            </div>
          </div>
        )}

        {/* Summary badge */}
        <span className="ml-auto text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg font-medium">
          {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? "s" : ""} found
        </span>
      </div>

      {/* STAT CARDS */}
      <Cards
        totalSpent={totalSpent}
        monthlyBudget={totalBudget}
        savings={savings}
        usagePercent={usagePercent}
      />

      {/* CHART + BUDGETS */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart expenses={filteredExpenses} />
        </div>
        <div>
          <LatestBudgets budgets={budgets} />
        </div>
      </div>

      {/* LATEST EXPENSES TABLE */}
      <LatestExpenses
        expenses={filteredExpenses}
        onDelete={deleteExpense}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
