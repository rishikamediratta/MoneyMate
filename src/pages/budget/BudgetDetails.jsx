import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import BudgetCard from "../../components/budget/BudgetCard";
import { useBudgets } from "../../hooks/useBudgets";

const BudgetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { budgets, addExpense, deleteExpense } = useBudgets();

  const budget = budgets.find((b) => String(b.id) === String(id));

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  if (!budget) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400 gap-3">
          <span className="text-4xl">🔍</span>
          <p className="text-sm font-medium">Budget not found</p>
          <button
            onClick={() => navigate("/budget")}
            className="text-xs text-blue-500 hover:underline"
          >
            ← Back to budgets
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const handleAdd = () => {
    if (!name.trim() || !amount) return;
    addExpense(budget.id, {
      id: Date.now(),
      name: name.trim(),
      amount: Number(amount),
      date: new Date().toISOString().split("T")[0],
    });
    setName("");
    setAmount("");
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 transition"
        >
          ←
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900">My Expenses</h1>
          <p className="text-sm text-slate-400 mt-0.5">{budget.name}</p>
        </div>
      </div>

      {/* Top layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="max-w-lg">
          <BudgetCard budget={budget} clickable={false} />
        </div>

        {/* Add Expense Form */}
        <div className="card-glow bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Add Expense</h2>
          <div className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Expense name"
              className="input-field"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount (₹)"
              className="input-field"
            />
            <button
              onClick={handleAdd}
              disabled={!name.trim() || !amount}
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium
                         hover:bg-blue-700 active:scale-[0.98] transition-all duration-200
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              + Add Expense
            </button>
          </div>
        </div>
      </div>

      {/* Expense Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Expense History</h2>

        {(budget.expenses || []).length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <span className="text-3xl block mb-2">🧾</span>
            <p className="text-sm">No expenses yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wide">Name</th>
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wide">Amount</th>
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wide">Date</th>
                  <th className="py-3 px-4 text-center text-xs font-medium uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...(budget.expenses || [])].reverse().map((exp, i) => (
                  <tr
                    key={exp.id}
                    className={`border-b border-slate-50 hover:bg-blue-50/40 transition-colors duration-150
                      ${i % 2 === 0 ? "bg-white" : "bg-slate-50/40"}`}
                  >
                    <td className="py-3 px-4 font-medium text-slate-800">{exp.name}</td>
                    <td className="py-3 px-4 font-semibold text-blue-600">
                      ₹{exp.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-xs">{exp.date}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => deleteExpense(budget.id, exp.id)}
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

export default BudgetDetails;
