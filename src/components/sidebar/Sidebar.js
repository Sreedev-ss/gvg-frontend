import React from 'react'
// import './Sidebar.scss',
import { GiPathDistance } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosPlay } from "react-icons/io";
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { useHierarchy } from '../../context/HierarchyContext';

const Sidebar = () => {
    const { hierarchicalPath, selectItem } = useHierarchy();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/')
    }

    const linkStyle = {
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
    }

    const handleLiClick = (id) => {
        selectItem(id)
}

return (
    <aside className="bg-white p-4 text-white rounded-lg mr-4 w-60 flex flex-col justify-between">
        <div className='overflow-hidden'>
            <div className=" font-bold text-[25px]  text-[rgb(157,49,113)] flex justify-center items-center">
                GVG - Plant
            </div>
            <div className="flex items-center mt-3">
                <GiPathDistance className="text-black" />
                <b className="text-[15px] underline text-black m-2">Path</b>
            </div>
            <div className="flex items-center text-[14px] mt-5 text-black">
                {/* <IoIosPlay className="text-black" /> */}
                {/* <Link to="/dashboardMain" style={linkStyle}>
                        East Assets
                    </Link> */}
                <ul className="hierarchical-path">
                    {hierarchicalPath.map((pathItem, index) => (
                        <span style={{ marginLeft: `${index * 10}px` }} className={`flex items-center mt-2`}>
                            <IoIosPlay className={`text-black `} />
                            <li title={pathItem?.name} className='liPath w-28 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap' onClick={() => handleLiClick(pathItem?._id)} key={index} >{pathItem?.name}</li>
                        </span>
                    ))}
                </ul>
            </div>
        </div>

        <div >
            <div className='ml-9'>
                <button className="rounded-31xl flex items-center justify-center py-2.5 px-5 gap-[9px] text-[14px] text-white  cursor-pointer text-center rounded  bg-blue-800 border-blue-800  ">
                    <CiImport />Import
                </button>
                <button className="rounded-31xl flex items-center justify-center py-2.5 px-5 gap-[9px] text-center text-[14px] text-white cursor-pointer rounded  bg-blue-800 border-blue-800 mt-4">
                    <CiExport />Export
                </button>
            </div>
            <div className='mt-10'>
                <div className=" text-zinc-900 text-[14px] flex items-center justify-center">
                    <IoMdSettings style={{ marginRight: '10px', marginBottom: '-3px' }} />
                    Settings
                </div>
                <div className=" text-zinc-900 text-[14px] cursor-pointer flex items-center justify-center" onClick={handleLogout}>
                    <IoIosLogOut style={{ marginRight: '10px', marginBottom: '-3px' }} />
                    Logout
                </div>
            </div>
        </div>
    </aside>
)
}

export default Sidebar
