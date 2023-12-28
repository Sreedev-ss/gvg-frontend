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
import { SiGoogleanalytics } from "react-icons/si";

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/authentication/login')
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
                <div className=" text-zinc-900 text-[14px] flex items-start justify-start">
                    <HiBuildingLibrary style={{marginRight:'8px', marginTop:'4px'}}/>
                    Dashboard
                </div>
                <div className="mt-5 text-zinc-900 text-[14px] cursor-pointer flex items-start justify-start">
                    <SiGoogleanalytics style={{marginRight:'8px', marginTop:'4px'}} />
                    Reporting & Analytics
                </div>
                {/* <div className="m-5 text-zinc-900 text-[14px] flex items-center justify-center">
                    <HiBuildingLibrary style={{marginRight:'10px'}}/>
                    Dashboard
                </div>
                <div className="m-5 text-zinc-900 text-[14px] cursor-pointer flex items-center justify-center" onClick={handleLogout}>
                    <IoIosLogOut style={{marginRight:'10px'}}/>
                    Dashboard
                </div> */}
                <div className='mt-64 ml-12'>
                    <div>
                        <input
                            type="file"
                            //ref={fileInputRef}
                            //onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <button className="rounded-31xl flex items-center justify-center py-2.5 px-5 gap-[9px] text-[14px] text-white  cursor-pointer text-center rounded  bg-[rgb(254,0,144)] border-[rgb(254,0,144)]  "
                            //onClick={handleImportButtonClick}
                        >
                            <CiImport />Import
                        </button>
                    </div>
                    <button className="rounded-31xl flex items-center justify-center py-2.5 px-5 gap-[9px] text-center text-[14px] text-white cursor-pointer rounded  bg-[rgb(254,132,183)] border-[rgb(254,132,183)] mt-4"
                        //onClick={handleExport}
                    >
                        <CiExport />Export
                    </button>
                </div>
                <div>
                <div className="mt-16  text-zinc-900 text-[14px] cursor-pointer flex items-center justify-center">
                    <IoMdSettings style={{marginRight:'10px'}}/>
                    Settings
                </div>
                <div className="mt-4 text-zinc-900 text-[14px] cursor-pointer flex items-center justify-center" onClick={handleLogout}>
                    <IoIosLogOut style={{marginRight:'10px'}}/>
                    Logout
                </div>

                </div>
            </div>
        </aside>
    )
}

export default AdminSidebar;
