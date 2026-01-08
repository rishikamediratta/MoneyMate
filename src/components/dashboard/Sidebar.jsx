import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition
     ${
       isActive
         ? "bg-black text-white"
         : "text-gray-700 hover:bg-gray-200"
     }`;

  return (
    <aside className="w-64 bg-white border-r min-h-[calc(100vh-4rem)] p-4">
      
      <nav className="space-y-2">
        <NavLink to="/dashboard" className={linkClasses}>
          📊 Dashboard
        </NavLink>

        <NavLink to="/dashboard/budget" className={linkClasses}>
          💰 Budgets
        </NavLink>

        <NavLink to="/dashboard/expenses" className={linkClasses}>
          🧾 Expenses
        </NavLink>
      </nav>

      {/* Bottom section */}
      <div className="mt-10 border-t pt-4">
        <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-black">
          ⚙️ Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
