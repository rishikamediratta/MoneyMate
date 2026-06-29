import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "moneymate_budgets";
const BudgetsContext = createContext(null);

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setBudgets(parsed);
      } catch (e) {
        console.error("BudgetsContext: invalid data", e);
      }
    }
  }, []);

  const save = (updated) => {
    setBudgets(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addBudget    = (b)  => save([...budgets, b]);
  const deleteBudget = (id) => save(budgets.filter((b) => String(b.id) !== String(id)));

  const updateBudget = (id, updates) =>
    save(budgets.map((b) => (String(b.id) === String(id) ? { ...b, ...updates } : b)));

  const addExpense = (budgetId, expense) =>
    save(
      budgets.map((b) =>
        String(b.id) === String(budgetId)
          ? { ...b, expenses: [...(b.expenses || []), expense] }
          : b
      )
    );

  const deleteExpense = (budgetId, expenseId) =>
    save(
      budgets.map((b) =>
        String(b.id) === String(budgetId)
          ? { ...b, expenses: b.expenses.filter((e) => e.id !== expenseId) }
          : b
      )
    );

  const allExpenses = budgets.flatMap((b) =>
    (b.expenses || []).map((e) => ({
      ...e,
      budgetId: b.id,
      budgetName: b.name,
      budgetIcon: b.icon,
    }))
  );

  const totalBudget = budgets.reduce((s, b) => s + (b.amount || 0), 0);

  return (
    <BudgetsContext.Provider
      value={{ budgets, allExpenses, totalBudget, addBudget, deleteBudget, updateBudget, addExpense, deleteExpense }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};

export const useBudgets = () => useContext(BudgetsContext);
