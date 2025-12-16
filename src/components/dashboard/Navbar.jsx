import { useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/signin");
  };

  return (
    <header className="h-16 bg-black text-white flex items-center justify-between px-6">
      
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img
          src={icon}
          alt="MoneyMate"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-lg font-semibold tracking-tight">
          MoneyMate
        </span>
      </div>

      {/* Right: User */}
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-medium">
          U
        </div>

        <button
          onClick={handleLogout}
          className="text-sm text-gray-300 hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
