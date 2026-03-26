import { NavLink } from "react-router-dom";

export const Header = () => {
  // Check if user is logged in
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Logo / Brand Name */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-amber-400 to-orange-600 rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <span className="text-white font-black text-xl">L</span>
          </div>
          <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight">
            Lingu<span className="text-orange-500">Quest</span>
          </h1>
        </NavLink>

        {/* Navigation - Only visible if Logged In */}
        <nav className="hidden md:flex items-center gap-8">
          {isLoggedIn && (
            <>
              <NavLink to="/leaderboard" className="text-slate-300 hover:text-amber-400 font-medium transition-colors">
                Leaderboard
              </NavLink>
              {/* Add other protected links here if needed */}
            </>
          )}
        </nav>

        {/* User Actions Section */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            /* USER IS LOGGED IN: Show Circular Icon */
            <NavLink to="/dashboard" className="group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 border-2 border-slate-700 p-0.5 group-hover:border-amber-400 transition-all shadow-lg overflow-hidden">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
                  {/* Placeholder for User Initial or Avatar */}
                  U
                </div>
              </div>
            </NavLink>
          ) : (
            /* USER IS NOT LOGGED IN: Show Log In Button */
            <NavLink to="/login">
              <button className="text-white bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-xl font-bold transition-all text-sm border border-slate-700 shadow-xl active:scale-95">
                Log In
              </button>
            </NavLink>
          )}
        </div>

      </div>
    </header>
  );
};