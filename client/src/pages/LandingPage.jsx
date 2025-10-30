import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-300 text-gray-900">
      
      <nav className="flex items-center justify-between px-8 py-4 shadow-sm bg-white/70 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-indigo-600">MYP</h1>
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-16 md:py-24">
        
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="text-indigo-600">Create.</span> Grow Your Career.
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto md:mx-0">
            Build a stunning portfolio with <span className="font-semibold text-indigo-600">Make Your Portfolio (MYP)</span> — and unlock your full career potential with ease.
          </p>

          <div className="flex justify-center md:justify-start space-x-4 pt-4">
            <Link to="/signup">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition">
                Sign Up For Free
              </button>
            </Link>
            <Link to="/login">
              <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg text-lg font-medium hover:bg-indigo-50 transition">
                Login
              </button>
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src="/portfolio-illustration.svg"
            alt="Portfolio illustration"
            className="w-80 md:w-[420px] object-contain"
          />
        </div>
      </section>

      <footer className="text-center py-6 border-t border-gray-200 text-gray-500 text-sm">
        © {new Date().getFullYear()} Make Your Portfolio. All rights reserved.
      </footer>

    </div>
  );
}

export default LandingPage;
