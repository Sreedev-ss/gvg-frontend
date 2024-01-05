import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api";
import './LoginComp.css';

const LoginComp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(()=>{
    if(localStorage.getItem("loginData")){
      navigate('/')
    }
  },[])

  const handleLogin = () => {
    instance.post('/auth/login', { email, password }).then((res) => {
      if (res.data.status === "Success") {
        const data = {
          token:res.data?.token,
          role:res.data?.role,
          plant: res.data?.plant
        }
        localStorage.setItem("loginData", JSON.stringify(data))
        navigate('/')
      } else {
        alert('Error while login please try again')
      }
    }).catch((err) => {
      alert('Invalid credentials')
    })

  }
  return (
    <div className="login-container bg-white p-4 h-screen rounded-lg shadow-md">
      <div>
        <h1 className="text-white flex items-center justify-center text-6xl font-bold m-8">Welcome</h1>
      </div>
      <div className="flex items-center justify-center h-[60%] bg-white rounded-2xl ml-64  w-[60%]">
      <div className=" login bg-cover bg-center rounded-lg  w-[60%]  h-[100%] m-4"></div>

        <div className="bg-white rounded-lg p-8 w-[50%] ">
          <h1 className="text-3xl font-bold mb-6 text-center text-[rgb(104,186,164)]">Login</h1>
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
          <button className="text-black py-2 px-4 mt-2 rounded-2xl shadow-xl hover:bg-mediumaquamarine h-10 w-[100%]  text-[14px] font-bold cursor-pointer"
            style={{ backgroundColor: "rgb(172,252,235)", border: '#acfceb' }}
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

// import React from "react";

// const LoginComp = () => {


//   return (
//     <div className="relative bg-white w-full h-[1117px] overflow-hidden text-left text-5xl text-teal font-poppins">
//       <img
//         className="absolute top-[0px] left-[0px] w-[1728px] h-[1117px] object-cover"
//         alt=""
//         src="/pexels-photo-by-ken--tomita@2x.png"
//       />
//       <div className="absolute top-[calc(50%_-_291.5px)] left-[390px] rounded-[20px] bg-white w-[946px] h-[582px] overflow-hidden">
//         <div className="absolute top-[227px] left-[584px] w-[274px] h-[34.99px]">
//           <div className="absolute top-[0px] left-[0px] tracking-[0.01em] font-semibold inline-block w-[200px] h-7">
//             Username
//           </div>
//           <img
//             className="absolute top-[34.99px] left-[0px] max-h-full w-[274px] object-cover"
//             alt=""
//             src="/line-3@2x.png"
//           />
//         </div>
//         <div className="absolute top-[292px] left-[584px] w-[274px] h-[34.99px]">
//           <div className="absolute top-[0px] left-[1px] tracking-[0.01em] font-semibold inline-block w-[125px] h-7">
//             Password
//           </div>
//           <img
//             className="absolute top-[34.99px] left-[0px] max-h-full w-[274px] object-cover"
//             alt=""
//             src="/line-3@2x.png"
//           />
//           <img
//             className="absolute top-[4px] left-[243px] w-6 h-6 overflow-hidden object-cover"
//             alt=""
//             src="/mdieyeoff@2x.png"
//           />
//         </div>
//         <b className="absolute top-[117px] left-[667px] text-[36px] [text-decoration:underline] text-mediumaquamarine">
//           Login
//         </b>
//         <div
//           className="absolute top-[373px] left-[641px] w-[152px] h-[47px] cursor-pointer text-[22px] text-darkslategray"
          
//         >
//           <div className="absolute top-[39px] left-[0px] rounded-[50%] bg-gray [filter:blur(10px)] w-[152px] h-2" />
//           <div className="absolute top-[0px] left-[0px] rounded-[50px] bg-aquamarine w-[152px] h-[42px] opacity-[0.5] mix-blend-normal" />
//           <div className="absolute top-[5px] left-[46px] font-semibold">
//             Login
//           </div>
//         </div>
//         <img
//           className="absolute top-[calc(50%_-_157px)] left-[24px] w-[436px] h-[262px] overflow-hidden object-cover"
//           alt=""
//           src="/undraw-login-re-4vu2-1@2x.png"
//         />
//       </div>
//       <b className="absolute top-[calc(50%_-_543.5px)] left-[calc(50%_-_312px)] text-[128px] text-white">
//         Welcome
//       </b>
//     </div>
//   );
// };

// export default LoginComp;
