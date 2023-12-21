import React from 'react'
// import './Sidebar.scss',
import { GiPathDistance } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosPlay } from "react-icons/io";
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { HiBuildingLibrary } from "react-icons/hi2";

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/')
    }

    return (
        <aside className="bg-white p-4 text-white rounded-lg mr-4 w-60">
            <div className=" font-bold text-[25px]  text-[rgb(157,49,113)] flex justify-center items-center">
                GVG - Plant
            </div>
            <div className=" font-bold text-[15px]  text-[rgb(157,49,113)] flex justify-center items-center">
                Admin Dashboard
            </div>

            <div className='mt-12'>
                <div className=" text-zinc-900 text-[14px] flex items-center justify-center">
                    <HiBuildingLibrary style={{marginRight:'10px'}}/>
                    Dashboard
                </div>
                <div className="m-5 text-zinc-900 text-[14px] cursor-pointer flex items-center justify-center" onClick={handleLogout}>
                    <IoIosLogOut style={{marginRight:'10px'}}/>
                    Dashboard
                </div>
                <div className="m-5 text-zinc-900 text-[14px] flex items-center justify-center">
                    <HiBuildingLibrary style={{marginRight:'10px'}}/>
                    Dashboard
                </div>
                <div className="m-5 text-zinc-900 text-[14px] cursor-pointer flex items-center justify-center" onClick={handleLogout}>
                    <IoIosLogOut style={{marginRight:'10px'}}/>
                    Dashboard
                </div>
            </div>
        </aside>
    )
}

export default AdminSidebar;
