import DashboardLayout from "../../components/dashboard/DashboardLayout";
import BudgetCard from "../../components/budget/BudgetCard";
import CreateBudgetCard from "../../components/budget/CreateBudgetCard";
import CreateBudgetModal from "../../components/budget/CreateBudgetModal";
import { useBudgets } from "../../hooks/useBudgets";
import { useState } from "react";

const Budget = () => {
  const { budgets, addBudget, deleteBudget } = useBudgets();
  const [showModal, setShowModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">My Budgets</h1>
        <p className="text-sm text-slate-400 mt-0.5">Create and manage your spending limits</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudgetCard onClick={() => setShowModal(true)} />
        {budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            onDelete={deleteBudget}
          />
        ))}
      </div>

      {showModal && (
        <CreateBudgetModal
          onClose={() => setShowModal(false)}
          onCreate={(b) => { addBudget(b); setShowModal(false); }}
        />
      )}
    </DashboardLayout>
  );
};

export default Budget;
