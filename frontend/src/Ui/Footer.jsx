import { NavLink } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#020617] border-t border-slate-800/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-12">
          
          {/* Brand & Mission */}
          <div className="max-w-sm space-y-5">
            <NavLink to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-gradient-to-tr from-amber-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300">
                <span className="text-white font-black text-lg">L</span>
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Lingu<span className="text-orange-500">Quest</span>
              </span>
            </NavLink>
            
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Level up your fluency through gamified challenges. 
              Join the quest to master new languages effortlessly.
            </p>

            {/* Social Icons with subtle glassmorphism */}
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 text-white group">
                <span className="text-sm font-bold">𝕏</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-pink-600 hover:border-pink-500 transition-all duration-300 text-white">
                <span className="text-sm font-bold">IG</span>
              </a>
            </div>
          </div>

          {/* Quick Links with better spacing */}
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Explore</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                <li><NavLink to="/about" className="hover:text-amber-400 transition-colors">About Story</NavLink></li>
                <li><NavLink to="/contact" className="hover:text-amber-400 transition-colors">Help Center</NavLink></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean & Minimal */}
        <div className="pt-8 border-t border-slate-800/40 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
              © {currentYear} LinguQuest Inc. 
            </p>
            <p className="text-[10px] text-slate-600 mt-1">Built for the next generation of polyglots.</p>
          </div>

          <div className="flex gap-8">
            <NavLink to="/privacy" className="text-[11px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Privacy</NavLink>
            <NavLink to="/terms" className="text-[11px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Terms</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};