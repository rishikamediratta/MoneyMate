import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { BudgetsProvider } from "./context/BudgetsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BudgetsProvider>
        <App />
      </BudgetsProvider>
    </ThemeProvider>
  </StrictMode>
);
