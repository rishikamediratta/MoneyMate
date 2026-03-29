import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white/95 rounded-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-gray-600">
              Sign in to continue to MoneyMate
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full border px-3 py-2 rounded-md" placeholder="Email" />
            <input className="w-full border px-3 py-2 rounded-md" placeholder="Password" type="password" />

            <button className="w-full bg-black text-white py-2.5 rounded-md">
              Sign in
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-medium underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
