import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import icon from "../../assets/icon.png";
import { useTheme } from "../../context/ThemeContext";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const displayName = localStorage.getItem("moneymate_name") || "U";
  const initials = displayName.charAt(0).toUpperCase();

  const handleLogout = () => { logout(); navigate("/signin"); };

  return (
    <header className="h-16 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between px-5 sticky top-0 z-10
                       border-b border-white/5 backdrop-blur-xl shadow-lg shadow-slate-900/10">

      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg
                     text-white/70 hover:text-white hover:bg-white/10 transition"
          onClick={onMenuClick}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="flex items-center gap-2.5">
          <img src={icon} alt="MoneyMate" className="w-7 h-7 rounded-xl" />
          <span className="text-[15px] font-bold tracking-tight">MoneyMate</span>
        </div>
      </div>

      {/* Right: Theme toggle + Avatar + Logout */}
      <div className="flex items-center gap-2">
        {/* Dark/Light Toggle */}
        <button
          onClick={toggle}
          title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          className="w-9 h-9 flex items-center justify-center rounded-lg
                     text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 text-base"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
          {initials}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-xs text-white/50 hover:text-white transition px-2 py-1 rounded-lg hover:bg-white/10"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
