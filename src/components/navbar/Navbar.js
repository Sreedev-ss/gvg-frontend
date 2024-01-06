import React from 'react'
// import './Navbar.scss'
import { CiSearch } from "react-icons/ci";
import { PiSlidersHorizontalLight } from "react-icons/pi";

const Navbar = () => {
    return (
        <div className='mt-7'>
        {/* <nav className="bg-white text-black rounded-lg h-12 mb-3 w-[50%] flex items-center ml-[25%]">
            <div className='text-lg text-darkslategray-100 font-nunito-sans flex '>
            <div className=" shadow-[0px_6px_58px_rgba(196,_203,_214,_0.1)]" />
            <CiSearch className='mt-2 ml-4 text-4xl'/>
                <input
                    type="text"
                    placeholder="Search"
                    className="rounded border-none outline-none w-[100%] h-14 ml-2 mt-[-2px] text-[15px]"
                    />
                    <PiSlidersHorizontalLight className='ml-72 text-6xl'/>
            </div>
        </nav> */}
        </div>
    )
}

export default Navbar
