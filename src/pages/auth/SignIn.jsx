import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import logo from "../../assets/icon.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors]     = useState({});

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    login();
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center px-4">
      {/* Background gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl -z-0" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="MoneyMate" className="w-11 h-11 rounded-2xl mb-3 shadow-lg" />
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to MoneyMate</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full border rounded-xl px-3 py-2.5 text-sm bg-white/10 text-white
                            placeholder:text-slate-500 focus:outline-none focus:ring-2
                            transition-all duration-200
                            ${errors.email ? "border-red-500 focus:ring-red-500/30" : "border-white/10 focus:ring-blue-500/30 focus:border-blue-400"}`}
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full border rounded-xl px-3 py-2.5 text-sm bg-white/10 text-white
                            placeholder:text-slate-500 focus:outline-none focus:ring-2
                            transition-all duration-200
                            ${errors.password ? "border-red-500 focus:ring-red-500/30" : "border-white/10 focus:ring-blue-500/30 focus:border-blue-400"}`}
              />
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold
                         hover:bg-blue-500 active:scale-[0.98] transition-all duration-200 mt-2"
            >
              Sign in →
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-5">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 font-medium hover:text-blue-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
