import React, { useState } from 'react'
// import './Navbar.scss'
import { FaCog, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleUserIconClick = () => {
        setDropdownOpen(!isDropdownOpen);
      };

    const handleLogout = () => {
        localStorage.removeItem("loginData");
        navigate('/authentication/login');
    }

    return (
        <nav className="bg-white text-black rounded-lg h-12 mb-3 ">
            <div className='text-lg text-darkslategray-100 font-nunito-sans flex '>
            <div className="rounded-[14px] bg-white shadow-[0px_6px_58px_rgba(196,_203,_214,_0.1)]" />
                <input
                    type="text"
                    placeholder="Search"
                    className="rounded border-none outline-none bg-slate-200 mt-2 ml-2 w-[50%]"
                />
                {/* <div className="cursor-pointer flex items-end ml-[42%]">
                    <FaCog size={20} />
                </div>
                <div className="cursor-pointer flex items-end ml-[2%]" onClick={handleUserIconClick}>
                    <FaUser size={20} />
                    {isDropdownOpen && (
                        <div className="absolute top-10 right-0 bg-white border rounded shadow-md p-2">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div> */}
            </div>
        </nav>
    )
}

export default Navbar
