import React from 'react'
// import './Navbar.scss'
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
    return (
        <nav className="bg-white text-black rounded-lg h-12 mb-3 ">
            <div className='text-lg text-darkslategray-100 font-nunito-sans flex '>
            <div className="rounded-[14px] bg-white shadow-[0px_6px_58px_rgba(196,_203,_214,_0.1)]" />
            <CiSearch className='m-4'/>
                <input
                    type="text"
                    placeholder="Search"
                    className="rounded border-none outline-none bg-white w-[100%] h-12"
                />
            </div>
        </nav>
    )
}

export default Navbar
