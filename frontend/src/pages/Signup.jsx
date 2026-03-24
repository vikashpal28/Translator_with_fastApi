import { useState } from "react";
import axios, { Axios } from "axios";
import { Navigate } from "react-router-dom";

export const Signup = () => {

const[name , setName] = useState("");
const[username , setUsername] = useState("");
const[password , setPassword] = useState("");

const token = localStorage.getItem("token");
if(token) return <Navigate to="/features" replace/>

const SubmitForm = async(e) =>{
   e.preventDefault();
    if (!name || !username || !password) {
      alert("All fields are required!");
      return;
    }
   console.log("Form submitted:", { name, username, password });
   
   try{
    const response = await axios.post("http://localhost:8080/api/auth/signup" , {
      name,
      username,
      password
    });
    localStorage.setItem("token", response.data.token);
    console.log("Signup Successfull : ", response.data);
    alert("Signup Successfully done");
    window.length.href = "/dashboard";
   }
   catch(error){
    console.log("error", error)
   }

   setName("");
   setUsername("");
   setPassword("");
}

 const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
 }


  return (
    <div className="h-150 flex items-center justify-center bg-linear-to-r from-blue-700 via-purple-700 to-pink-600 px-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        
        {/* Form */}
        <form className="flex flex-col space-y-4" onSubmit={SubmitForm}>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          
          <input
            type="email"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          
          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Create Account
          </button>
        </form>
        
        {/* Extra Links */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};
