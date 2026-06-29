import logo from "../assets/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(isLoggedIn() ? "/dashboard" : "/signup");
  };

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden flex flex-col">

      {/* Background orbs */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[700px]
                      bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px]
                      bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="MoneyMate logo" className="w-8 h-8 rounded-xl shadow-md" />
          <span className="text-white text-base font-bold tracking-tight">MoneyMate</span>
        </div>

        <div className="flex gap-2">
          <Link
            to="/signin"
            className="px-4 py-2 text-sm font-medium rounded-xl text-slate-300
                       hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white
                       hover:bg-blue-500 active:scale-[0.97] transition-all duration-200 shadow-md"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-600/15 border border-blue-500/20
                        text-blue-400 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Smart budgeting made simple
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight tracking-tight">
          Spend Smarter.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Save Better.
          </span>
        </h1>

        <p className="mt-5 text-slate-400 max-w-lg text-base leading-relaxed">
          Track expenses, plan budgets, and stay in control of your money — all in one beautifully simple place.
        </p>

        <div className="flex items-center gap-3 mt-8">
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold
                       hover:bg-blue-500 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-blue-500/25"
          >
            Start for free →
          </button>
          <Link
            to="/signin"
            className="px-6 py-3 text-sm font-medium text-slate-400 hover:text-white transition-all duration-200"
          >
            Sign in
          </Link>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {["📊 Budget Tracking", "🧾 Expense Logging", "📅 Date Filters", "💰 Savings Overview"].map(
            (item) => (
              <div
                key={item}
                className="bg-white/5 border border-white/10 text-slate-400 text-xs font-medium
                           px-4 py-2 rounded-full backdrop-blur-sm"
              >
                {item}
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Landing;
