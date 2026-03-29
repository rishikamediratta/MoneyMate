import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Dashboard from "../pages/dashboard/Dashboard";
import Budget from "../pages/dashboard/Budget";
import Expenses from "../pages/dashboard/Expenses";
import BudgetDetails from "../pages/budget/BudgetDetails";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/budget" element={<Budget />} />
        <Route path="/budget/:id" element={<BudgetDetails />} />

        <Route path="/expenses" element={<Expenses />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
