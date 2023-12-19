import React from 'react'
// import './Sidebar.scss',
import { GiPathDistance } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosPlay } from "react-icons/io";
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/')
    }

    const linkStyle = {
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      }

    return (
        <aside className="bg-white p-4 text-white rounded-lg mr-4 w-56">
            <div className=" font-bold text-[25px]  text-[rgb(157,49,113)] flex justify-center items-center">
                GVG - Plant
            </div>
            <div className="flex items-center mt-3">
                <GiPathDistance className="text-black" />
                <b className="text-[15px] underline text-black m-2">Path</b>
            </div>
            <div className="flex items-center text-[14px] m-5 text-black">
                <IoIosPlay className="text-black"/>
                <Link to="/dashboardMain" style={linkStyle}>
                    East Assets
                </Link>  
            </div>
            <div className='ml-9 mt-72'>
                <button className="rounded-31xl flex items-center justify-center py-2.5 px-5 gap-[9px] text-[14px] text-white  cursor-pointer text-center rounded  bg-blue-800 border-blue-800  ">
                    <CiImport/>Import
                </button>
                <button className="rounded-31xl flex items-center justify-center py-2.5 px-5 gap-[9px] text-center text-[14px] text-white cursor-pointer rounded  bg-blue-800 border-blue-800 mt-4">
                    <CiExport/>Export
                </button>
            </div>
            <div className='mt-24'>
                <div className=" text-zinc-900 text-[14px] flex items-center justify-center">
                    <IoMdSettings style={{marginRight:'10px', marginBottom:'-3px'}}/>
                    Settings
                </div>
                <div className=" text-zinc-900 text-[14px] cursor-pointer flex items-center justify-center" onClick={handleLogout}>
                    <IoIosLogOut style={{marginRight:'10px', marginBottom:'-3px'}}/>
                    Logout
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
