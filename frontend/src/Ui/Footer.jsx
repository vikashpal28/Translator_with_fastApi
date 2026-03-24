export const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        {/* Left side: App name */}
        <p className="text-lg font-semibold text-white mb-4 md:mb-0">
          Gamified Language Learning Application
        </p>
        
        {/* Center: Navigation links */}
        <nav className="flex space-x-6 mb-4 md:mb-0">
          <a href="about" className="hover:text-amber-400 transition">About</a>
          <a href="features" className="hover:text-amber-400 transition">Features</a>
          <a href="contact" className="hover:text-amber-400 transition">Contact</a>
        </nav>
        
        {/* Right side: Copyright */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};
