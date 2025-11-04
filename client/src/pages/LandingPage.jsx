import { Link } from "react-router-dom";
import "./LandingPage.css";
import lpImg from "../assets/lp.png";
import { Button } from "@/components/ui/Button";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-animate text-gray-100">
      
      <nav className="flex items-center justify-between px-8 py-4 bg-[#0a0014]/70 backdrop-blur-md border-b border-purple-800/40 shadow-lg">
        <h1 className="text-2xl font-extrabold text-black tracking-wide">
          MYP
        </h1>
        <div className="space-x-4">
          <Link to="/login">
            <Button>
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button>
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-16 md:py-24">
        
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
            <span className="text-black">Create.</span> Grow Your Career.
          </h2>
          <p className="text-gray text-lg max-w-md mx-auto md:mx-0">
            Build a stunning portfolio with{" "}
            <span className="font-semibold text-purple">Make Your Portfolio (MYP)</span> — and unlock your full career potential.
          </p>

          <div className="flex justify-center md:justify-start space-x-4 pt-4">
            <Link to="/signup">
              <Button>
                Sign Up For Free
              </Button>
            </Link>
            <Link to="/login">
              <button className="px-6 py-3 border border-purple text-purple rounded-lg text-lg font-medium hover:bg-purple-800/60 hover:shadow-inner transition">
                Login
              </button>
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src={lpImg}
            alt="Portfolio illustration"
            className="w-1140 md:w-[420px] object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]"
          />
        </div>
      </section>

      <footer className="text-center py-6 border-t border-purple-800/30 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-purple-400 font-semibold">Make Your Portfolio</span>. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
