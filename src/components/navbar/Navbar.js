import React from 'react'
// import './Navbar.scss'
import { FaCog, FaUser } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="bg-white text-black rounded-lg h-12 mb-3 ">
            <div className='text-lg text-darkslategray-100 font-nunito-sans flex '>
            <div className="rounded-[14px] bg-white shadow-[0px_6px_58px_rgba(196,_203,_214,_0.1)]" />
            
            <input
                type="text"
                placeholder="Search"
                className="rounded border-none outline-none bg-slate-200 mt-2 ml-2 w-[50%]"
                
            />
            
            <div className="cursor-pointer flex items-end ml-[42%]">
                <FaCog size={20} />
            </div>
            <div className="cursor-pointer flex items-end ml-[2%]">
                <FaUser size={20} />
            </div>
            </div>
        </nav>
    )
}

export default Navbar
