import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Background image placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        
        <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-6 md:p-8">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Create your account
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              One place for all your money
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition"
            >
              Sign up
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/signin" className="text-black font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
