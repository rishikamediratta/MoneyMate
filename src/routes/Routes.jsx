import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
