import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api";

const LoginComp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    instance.post('/auth/login', { email, password }).then((res) => {
      if (res.data.status == "Success") {
        localStorage.setItem("loginData", res.data.token)
        navigate('/')
      } else {
        alert('Error while login please try again')
      }
    }).catch((err) => {
      alert('Invalid credentials')
    })

  }
  return (
    <div className="bg-white p-4 h-screen rounded-lg shadow-md">
      <div className="flex items-start mt-40 justify-center min-h-screen">
        <div className="bg-white rounded-lg p-8 w-full max-w-[582px]">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-600 mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded h-8"
              placeholder="Enter your email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded h-8"
              placeholder="Enter your password"
            />
          </div>
          <button className="text-white py-2 px-4 mt-2 rounded hover:bg-mediumaquamarine h-10 w-[521px]  text-[14px] font-bold cursor-pointer"
            style={{ backgroundColor: "#a93279", border: '#a93279' }}
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