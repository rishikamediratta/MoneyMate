import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Dashboard from "../pages/dashboard/Dashboard";
import Budget from "../pages/dashboard/Budget";
import Expenses from "../pages/dashboard/Expenses";
import Settings from "../pages/dashboard/Settings";
import BudgetDetails from "../pages/budget/BudgetDetails";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  const protect = (el) => <ProtectedRoute>{el}</ProtectedRoute>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<Landing />} />
        <Route path="/signin"       element={<SignIn />} />
        <Route path="/signup"       element={<SignUp />} />

        <Route path="/dashboard"    element={protect(<Dashboard />)} />
        <Route path="/budget"       element={protect(<Budget />)} />
        <Route path="/budget/:id"   element={protect(<BudgetDetails />)} />
        <Route path="/expenses"     element={protect(<Expenses />)} />
        <Route path="/settings"     element={protect(<Settings />)} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
