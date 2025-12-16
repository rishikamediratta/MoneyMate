import logo from "../assets/icon.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";


const Landing = () => {

const navigate = useNavigate();

const handleGetStarted = () => {
  if (isLoggedIn()) {
    navigate("/dashboard");
  } else {
    navigate("/signin");
  }
};


  return (
    <div className="relative min-h-screen bg-[#f6f7f9] overflow-hidden">
      {/* Background image placeholder */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-40"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 md:px-12 py-5">
          {/* Left: Logo placeholder + app name */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="MoneyMate logo"
              className="w-8 h-8 rounded-full object-cover border border-gray-900"
            />

            <span className="text-lg font-semibold">MoneyMate</span>
          </div>

          {/* Right: Auth buttons */}
          <div className="flex gap-3">
            <Link
              to="/signin"
              className="px-4 py-2 text-sm rounded-md hover:bg-gray-200"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm rounded-md bg-black text-white hover:bg-gray-800"
            >
              Sign up
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center px-6 mt-20 md:mt-32">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            Spend Smarter. <br className="hidden md:block" /> Save Better.
          </h1>

          <p className="mt-6 text-gray-600 text-base md:text-lg max-w-xl">
            Stay on top of spending, budgets, and savings with ease. Track
            expenses, plan budgets, and save smarter — all in one place.
          </p>

          <button
  onClick={handleGetStarted}
  className="mt-8 px-6 py-3 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
>
  Get started
</button>

        </section>
      </div>
    </div>
  );
};

export default Landing;
