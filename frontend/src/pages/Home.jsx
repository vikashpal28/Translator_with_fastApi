import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <div className="h-150 w-full bg-linear-to-r from-blue-700 via-indigo-700 to-pink-600 flex flex-col justify-center items-center text-center px-6">
      
      {/* Title */}
      <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        Welcome to the Home Page
      </h1>
      
      {/* Subtitle */}
      <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-xl">
        This is the home page of our Gamified Language Learning Application.
      </p>
      
      {/* Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-5">
        <NavLink to="/login">
          <button className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105">
            Login
          </button>
        </NavLink>

        <NavLink to="/signup">
          <button className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105">
            Signup
          </button>
        </NavLink>
      </div>
    </div>
  );
};
