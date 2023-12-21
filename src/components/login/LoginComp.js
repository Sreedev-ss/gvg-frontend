import React from "react";
import { useNavigate } from "react-router-dom";

const LoginComp = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
      navigate('/admin-dashboard')
    }
    return (
        <div className="bg-white p-4 h-[89.4vh] rounded-lg shadow-md">
            <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg p-8 w-full max-w-[582px]">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-semibold text-gray-600 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full border border-gray-300 p-2 rounded h-8"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full border border-gray-300 p-2 rounded h-8"
            placeholder="Enter your password"
          />
        </div>
        <button className="text-white py-2 px-4 rounded hover:bg-mediumaquamarine h-16 w-[521px]  text-[20px] font-bold cursor-pointer"
        style={{ backgroundColor: "#a93279", border:'#a93279' }}
        onClick={handleLogin}
        >
          LOGIN
        </button>
      </div>
    </div>
        </div>

    )
}

export default LoginComp;