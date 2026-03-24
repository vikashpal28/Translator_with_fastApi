import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const Feedback = () => {
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  
  const handleChange = (e) =>{
    const{name , value} = e.target;
    if(name === "message") setMessage(value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Please enter your feedback before submitting.");
      return;
    }
    try{
        const response = await axios.post("http://localhost:8080/api/v2/feedback" , {
            message
        },
        {
            headers:{
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`,
            }
        }
    )
    console.log(response.data)
    }
    catch(error){
        console.log("error" , error);
    }
    console.log("Feedback submitted:", message);
    alert("Thank you for your feedback!");
    setMessage("");
  };


  if(!token){
   return <Navigate to="/login" replace />;
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-green-600 via-teal-600 to-blue-600 px-6 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-teal-700 mb-6">
          Feedback Section
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <textarea
            value={message}
            name="message"
            onChange={handleChange}
            placeholder="Share your thoughts..."
            rows="5"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};
