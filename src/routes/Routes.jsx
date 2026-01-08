import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import Dashboard from "../pages/dashboard/Dashboard";
import Budget from "../pages/dashboard/Budget";
import Expenses from "../pages/dashboard/Expenses";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/budget" element={<Budget />} />
        <Route path="/dashboard/expenses" element={<Expenses />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
