import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import BudgetCard from "../../components/budget/BudgetCard";

const STORAGE_KEY = "moneymate_budgets";

const BudgetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [budget, setBudget] = useState(null);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  // 🔹 Load budget
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const budgets = JSON.parse(stored);
    const found = budgets.find(
      (b) => String(b.id) === String(id)
    );

    setBudget(found || null);
  }, [id]);

  // 🔹 Loading state (NO blank screen)
  if (budget === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f7f9]">
        <p className="text-gray-500">Loading budget…</p>
      </div>
    );
  }

  // 🔹 Add expense (THIS WAS MISSING ❗)
  const handleAddExpense = () => {
    if (!expenseName || !expenseAmount) return;

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: Number(expenseAmount),
      date: new Date().toISOString().split("T")[0],
    };

    const budgets =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const updatedBudgets = budgets.map((b) =>
      String(b.id) === String(budget.id)
        ? { ...b, expenses: [...b.expenses, newExpense] }
        : b
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedBudgets)
    );

    setBudget(
      updatedBudgets.find(
        (b) => String(b.id) === String(budget.id)
      )
    );

    setExpenseName("");
    setExpenseAmount("");
  };

  // 🔹 Delete expense
  const handleDeleteExpense = (expenseId) => {
    const budgets =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const updatedBudgets = budgets.map((b) =>
      String(b.id) === String(budget.id)
        ? {
            ...b,
            expenses: b.expenses.filter(
              (exp) => exp.id !== expenseId
            ),
          }
        : b
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedBudgets)
    );

    setBudget(
      updatedBudgets.find(
        (b) => String(b.id) === String(budget.id)
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 space-y-6">
          {/* HEADER */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-gray-900"
            >
              ←
            </button>
            <h1 className="text-2xl font-semibold">
              My Expenses
            </h1>
          </div>

          {/* TOP */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="max-w-lg">
              <BudgetCard budget={budget} clickable={false} />
            </div>

            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                Add Expense
              </h2>

              <div className="space-y-4">
                <input
                  value={expenseName}
                  onChange={(e) =>
                    setExpenseName(e.target.value)
                  }
                  placeholder="Expense name"
                  className="w-full border rounded-lg px-3 py-2"
                />

                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) =>
                    setExpenseAmount(e.target.value)
                  }
                  placeholder="Expense amount"
                  className="w-full border rounded-lg px-3 py-2"
                />

                <button
                  onClick={handleAddExpense}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg"
                >
                  Add New Expense
                </button>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              Latest Expenses
            </h2>

            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {budget.expenses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-4 text-center text-gray-400"
                    >
                      No expenses added yet
                    </td>
                  </tr>
                ) : (
                  budget.expenses.map((exp) => (
                    <tr key={exp.id} className="border-t">
                      <td className="p-3">{exp.name}</td>
                      <td className="p-3">₹{exp.amount}</td>
                      <td className="p-3">{exp.date}</td>
                      <td
                        onClick={() =>
                          handleDeleteExpense(exp.id)
                        }
                        className="p-3 text-center text-red-500 cursor-pointer hover:text-red-700"
                      >
                        🗑️
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BudgetDetails;
