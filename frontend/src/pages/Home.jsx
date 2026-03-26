import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <div className="min-h-screen w-full bg-[#0f172a] relative overflow-hidden flex flex-col justify-center items-center text-center px-6">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>

      <div className="z-10 max-w-4xl mx-auto">
        {/* Badge / Small Tag */}
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
          Level Up Your Skills
        </span>

        {/* Title with Gradient Text */}
        <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
          Master Languages <br /> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-pink-500">
            While You Play
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          The most engaging way to learn. Join thousands of players competing, 
          earning rewards, and becoming fluent in record time.
        </p>
        
        {/* Buttons - Primary and Secondary style */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NavLink to="/signup" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-200 transform hover:-translate-y-1 active:scale-95">
              Sign Up
            </button>
          </NavLink>

          <NavLink to="/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-10 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all duration-200 transform hover:-translate-y-1 active:scale-95">
              Sign In
            </button>
          </NavLink>
        </div>

        {/* Trust/Social Proof Footer */}
        <div className="mt-16 pt-8 border-t border-slate-800/50">
          <p className="text-slate-500 text-sm uppercase tracking-widest font-semibold">
            Supported Languages
          </p>
          <div className="flex justify-center gap-6 mt-4 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="text-white font-medium">Spanish</span>
            <span className="text-white font-medium">French</span>
            <span className="text-white font-medium">Japanese</span>
            <span className="text-white font-medium">German</span>
          </div>
        </div>
      </div>
    </div>
  );
};