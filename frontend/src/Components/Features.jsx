import { NavLink } from "react-router-dom";

export const Features = () => {
  return (
    <div className="min-h-screen w-full flex flex-wrap justify-center items-center gap-8 bg-linear-to-r from-green-600 via-teal-600 to-blue-600 p-10">
      
      {/* Quiz Section */}
      <NavLink  to="/quiz">
    <div className="h-60 w-60 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center p-5 transform transition hover:scale-105">
        <h2 className="text-xl font-bold text-green-700 mb-2">Quiz</h2>
        <p className="text-sm text-gray-600 text-center">
          Challenge yourself with interactive quizzes and track your progress.
        </p>
      </div>
      </NavLink>
     

      {/* Translator Section */}
      <NavLink to="/translator">
      <div className="h-60 w-60 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center p-5 transform transition hover:scale-105">
        <h2 className="text-xl font-bold text-indigo-700 mb-2">Translator</h2>
        <p className="text-sm text-gray-600 text-center">
          Translate text instantly and break language barriers with ease.
        </p>
      </div>
      </NavLink>
     

      {/* chat Section */}
      <NavLink to="/chat">
       <div className="h-60 w-60 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center p-5 transform transition hover:scale-105">
        <h2 className="text-xl font-bold text-teal-700 mb-2">Chat</h2>
        <p className="text-sm text-gray-600 text-center">
          Learn with chat guidance and improve writing through chat support.
        </p>
      </div>
      </NavLink>
      

      {/* Feedback Section */}
      <NavLink to="/feedback">
              <div className="h-60 w-60 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center p-5 transform transition hover:scale-105">
        <h2 className="text-xl font-bold text-pink-700 mb-2">Feedback</h2>
        <p className="text-sm text-gray-600 text-center">
          Share your thoughts and help us improve your learning experience.
        </p>
      </div>
      </NavLink>

    </div>
  );
};
