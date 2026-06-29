import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import logo from "../../assets/icon.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors]     = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    localStorage.setItem("moneymate_name", name.trim());
    login();
    navigate("/dashboard");
  };

  const field = (id, label, type, value, setter, placeholder) => (
    <div>
      <label className="block text-xs font-medium text-slate-300 mb-1.5">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setter(e.target.value)}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-3 py-2.5 text-sm bg-white/10 text-white
                    placeholder:text-slate-500 focus:outline-none focus:ring-2
                    transition-all duration-200
                    ${errors[id] ? "border-red-500 focus:ring-red-500/30" : "border-white/10 focus:ring-blue-500/30 focus:border-blue-400"}`}
      />
      {errors[id] && <p className="text-xs text-red-400 mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl -z-0" />

      <div className="relative z-10 w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="MoneyMate" className="w-11 h-11 rounded-2xl mb-3 shadow-lg" />
          <h1 className="text-2xl font-bold text-white tracking-tight">Create account</h1>
          <p className="text-slate-400 text-sm mt-1">One place for all your money</p>
        </div>

        <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {field("name",     "Name",     "text",     name,     setName,     "Your full name")}
            {field("email",    "Email",    "email",    email,    setEmail,    "you@example.com")}
            {field("password", "Password", "password", password, setPassword, "Min. 6 characters")}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold
                         hover:bg-blue-500 active:scale-[0.98] transition-all duration-200 mt-2"
            >
              Create account →
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-5">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-400 font-medium hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
