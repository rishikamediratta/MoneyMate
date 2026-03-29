import { useEffect, useState } from "react";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import BudgetCard from "../../components/budget/BudgetCard";
import CreateBudgetCard from "../../components/budget/CreateBudgetCard";
import CreateBudgetModal from "../../components/budget/CreateBudgetModal";

const STORAGE_KEY = "moneymate_budgets";

const Budget = () => {
  // ✅ single source of truth
  const [budgets, setBudgets] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // ✅ load from localStorage ONCE
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setBudgets(parsed);
        }
      } catch (e) {
        console.error("Invalid localStorage data", e);
      }
    }
  }, []);

  // ✅ save on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
  }, [budgets]);

  // ✅ add new budget
  const addBudget = (newBudget) => {
    setBudgets((prev) => [...prev, newBudget]);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold">My Budgets</h1>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CreateBudgetCard onClick={() => setShowModal(true)} />

            {budgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </div>
        </main>
      </div>

      {showModal && (
        <CreateBudgetModal
          onClose={() => setShowModal(false)}
          onCreate={addBudget}
        />
      )}
    </div>
  );
};

export default Budget;
