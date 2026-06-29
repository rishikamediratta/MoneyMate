import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/dashboard", icon: "📊", label: "Dashboard", end: true },
  { to: "/budget",    icon: "💰", label: "Budgets",   end: false },
  { to: "/expenses",  icon: "🧾", label: "Expenses",  end: false },
];

const Sidebar = ({ open, onClose }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
     ${isActive
       ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
       : "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-white"
     }`;

  const settingsClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
     ${isActive
       ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
       : "text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-white"
     }`;

  const content = (withClose = false) => (
    <>
      <nav className="space-y-1 flex-1">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass} end={item.end}
            onClick={withClose ? onClose : undefined}>
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-slate-100 dark:border-slate-700 pt-3">
        <NavLink to="/settings" className={settingsClass} onClick={withClose ? onClose : undefined}>
          <span>⚙️</span>
          Settings
        </NavLink>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex flex-col w-60 bg-white dark:bg-slate-800
                        border-r border-slate-100 dark:border-slate-700
                        min-h-[calc(100vh-4rem)] p-4 shrink-0">
        {content(false)}
      </aside>

      {/* Mobile Drawer */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-800
                         shadow-2xl z-30 flex flex-col p-4
                         transform transition-transform duration-300 ease-in-out md:hidden
                         ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between mb-6">
          <span className="text-base font-bold text-slate-800 dark:text-white tracking-tight">MoneyMate</span>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">
            ✕
          </button>
        </div>
        {content(true)}
      </aside>
    </>
  );
};

export default Sidebar;
