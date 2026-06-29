import { useState, useEffect } from "react";

const STORAGE_KEY = "moneymate_budgets";

export const useBudgets = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setBudgets(parsed);
      } catch (e) {
        console.error("useBudgets: invalid localStorage data", e);
      }
    }
  }, []);

  const save = (updated) => {
    setBudgets(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addBudget = (budget) => save([...budgets, budget]);

  const deleteBudget = (id) =>
    save(budgets.filter((b) => String(b.id) !== String(id)));

  const addExpense = (budgetId, expense) => {
    const updated = budgets.map((b) =>
      String(b.id) === String(budgetId)
        ? { ...b, expenses: [...(b.expenses || []), expense] }
        : b
    );
    save(updated);
  };

  const deleteExpense = (budgetId, expenseId) => {
    const updated = budgets.map((b) =>
      String(b.id) === String(budgetId)
        ? { ...b, expenses: b.expenses.filter((e) => e.id !== expenseId) }
        : b
    );
    save(updated);
  };

  // Flatten all expenses across all budgets with budget name attached
  const allExpenses = budgets.flatMap((b) =>
    (b.expenses || []).map((e) => ({
      ...e,
      budgetId: b.id,
      budgetName: b.name,
      budgetIcon: b.icon,
    }))
  );

  const totalBudget = budgets.reduce((sum, b) => sum + (b.amount || 0), 0);

  return {
    budgets,
    allExpenses,
    totalBudget,
    addBudget,
    deleteBudget,
    addExpense,
    deleteExpense,
  };
};
