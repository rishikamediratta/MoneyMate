import { useEffect, useState } from "react";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import BudgetCard from "../../components/budget/BudgetCard";
import CreateBudgetCard from "../../components/budget/CreateBudgetCard";
import CreateBudgetModal from "../../components/budget/CreateBudgetModal";

const STORAGE_KEY = "moneymate_budgets";

const Budget = () => {
  // Budgets state
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      icon: "🛍️",
      name: "Shopping",
      amount: 5000,
      expenses: [
        { id: 1, name: "Shoes", amount: 1200 },
        { id: 2, name: "Bag", amount: 800 }
      ]
    }
  ]);

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setBudgets(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
  }, [budgets]);

  // Add new budget
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

          {/* Budget Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CreateBudgetCard onClick={() => setShowModal(true)} />

            {budgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </div>
        </main>
      </div>

      {/* Create Budget Modal */}
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
