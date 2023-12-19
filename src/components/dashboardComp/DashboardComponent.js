import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import './Dashboard.scss'
import { FaArrowLeft } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const DashboardComponent = () => {
    const [showSRegion, setShowSRegion] = useState(false);
    const [sRegionColor, setSRegionColor] = useState("bg-green-50");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    
    const handleSRegionClick = () => {
        setShowSRegion(!showSRegion);
        setSRegionColor((prevColor) =>
        prevColor === "bg-green-50" ? "bg-green-200 rounded-2xl" : "bg-green-50"
        );
    };

    const handlePlusClick = () => {
        setShowDropdown(!showDropdown);
      };

    return (
        <div className="bg-white p-4 h-[87.1vh] rounded-lg shadow-md">
            <div className="top-0 left-0 m-4 cursor-pointer">
                <Link to='/assets'>
                    <FaArrowLeft className="text-slate-500 font-lighter text-[20px]"/>
                </Link>
            </div>
            <div className=" w-[95%] h-[85%] bg-green-50 m-6">
                <div className='m-15'>
                    <b className="text-4xl cursor-pointer flex items-center justify-center">
                        East Assets
                    </b>
                    <div className='flex items-center justify-center m-16'>
                        <Link>
                            <div className="rounded-6xl  py-2 px-[15px] box-border ml-[-66px]">
                                <div className=" text-xl">A Region</div>
                            </div>
                        </Link>
                        <Link>
                            <div className="  rounded-6xl  py-2 px-[15px] box-border ml-[36px]">
                                <div className=" text-xl">E Region</div>
                            </div>
                        </Link>
                        <div
                            onClick={handleSRegionClick}
                            className={`rounded-6xl py-2 px-[15px] box-border cursor-pointer ml-[56px] text-black  ${sRegionColor}`}
                            >
                            <div className=" text-xl">S Region</div>
                        </div>

                        {showSRegion && (
                        <div className='absolute mt-4 left-0 top-60'>

                            <div className="text-center text-xl text-white bg-green-200 rounded-2xl ml-[450px] mt-[80px] w-[90%] h-[300px]">
                                <div className=" cursor-pointer flex items-end justify-end">
                                    <CiCirclePlus className="text-slate-500 font-bold text-[30px]" onClick={() => setShowAddModal(true)}/>
                                </div>

                                {showAddModal ? (
                                <>
                                <div className="">
                                    <div
                                    className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                    <div className="relative my-6 mx-auto w-[800px]">

                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-green-50 outline-none focus:outline-none">
                                    
                                        <div className="flex items-start justify-between p-5 ">
                                            <h3 className="text-3xl font-semibold text-black">
                                            Create 
                                            </h3>
                                            <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowAddModal(false)}
                                            >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                            </button>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[-680px]">
                                            Location:
                                            </label>
                                            <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            //value={location}
                                            //onChange={(e) => setName(e.target.value)}
                                            className="mt-1 ml-[-10px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px]"
                                            />
                                        </div>
                                        <div className="mb-4 mt-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[-660px]">
                                            Description:
                                            </label>
                                            <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            //value={description}
                                            //onChange={(e) => setName(e.target.value)}
                                            className="mt-1 ml-[-10px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px]"
                                            />
                                        </div>
                                        <div className="mb-4 mt-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[-690px]">
                                            Parent:
                                            </label>
                                            <input
                                            type="text"
                                            id="parent"
                                            name="parent"
                                            //value={parent}
                                            //onChange={(e) => setName(e.target.value)}
                                            className="mt-1 ml-[-10px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px]"
                                            />
                                        </div>
                                        <div className="mb-4 mt-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[-690px]">
                                            System:
                                            </label>
                                            <input
                                            type="text"
                                            id="system"
                                            name="system"
                                            //value={system}
                                            //onChange={(e) => setName(e.target.value)}
                                            className="mt-1 ml-[-10px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px]"
                                            />
                                        </div>
                                        <div className="mb-4 mt-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[-700px]">
                                            Level:
                                            </label>
                                            <input
                                            type="text"
                                            id="level"
                                            name="level"
                                            //value={level}
                                            //onChange={(e) => setName(e.target.value)}
                                            className="mt-1 ml-[-10px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px]"
                                            />
                                        </div>
                        
                                        <div className="flex items-center justify-end p-6">
                                            <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 h-10" 
                                            type="button"
                                            onClick={() => setShowAddModal(false)}
                                            >
                                            Cancel
                                            </button>
                                            <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowAddModal(false)}
                                            >
                                            Create
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </div>
                                </>
                                ) : null}

                                <div className='flex gap-10'>
                                <div className="rounded-xl bg-cornflowerblue  overflow-hidden shrink-0 w-[25%] bg-blue-800 ml-20 mt-5">
                                    <div className=" font-semibold text-[15px]">


                                        {!showDropdown && (
                                            <>
                                            <p className="m-0 text-white whitespace-nowrap mt-3">{`S - ADMIN`}</p>
                                            <p className="m-0 text-white whitespace-nowrap mb-3">{`S - Adminstration`}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="rounded-xl bg-cornflowerblue  overflow-hidden shrink-0 w-[25%] bg-blue-800 mt-5">
                                    <div className=" font-semibold text-[15px]">


                                        {!showDropdown && (
                                            <>
                                            <p className="m-0 text-white whitespace-nowrap mt-3">{`S - ADMIN`}</p>
                                            <p className="m-0 text-white whitespace-nowrap mb-3">{`S - Adminstration`}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="rounded-xl bg-cornflowerblue  overflow-hidden shrink-0 w-[25%] bg-blue-800 mt-5">
                                    <div className=" font-semibold text-[15px]">


                                        {!showDropdown && (
                                            <>
                                            <p className="m-0 text-white whitespace-nowrap mt-3">{`S - ADMIN`}</p>
                                            <p className="m-0 text-white whitespace-nowrap mb-3">{`S - Adminstration`}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='flex gap-44 mt-11 ml-40'>
                                <div className="rounded-xl bg-cornflowerblue  overflow-hidden shrink-0 w-[25%] bg-blue-800 ">
                                    <div className=" font-semibold text-[15px]">


                                        {!showDropdown && (
                                            <>
                                            <p className="m-0 text-white whitespace-nowrap mt-3">{`S - ADMIN`}</p>
                                            <p className="m-0 text-white whitespace-nowrap mb-3">{`S - Adminstration`}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="rounded-xl bg-cornflowerblue  overflow-hidden shrink-0 w-[25%] bg-blue-800 ">
                                    <div className=" font-semibold text-[15px]">


                                        {!showDropdown && (
                                            <>
                                            <p className="m-0 text-white whitespace-nowrap mt-3">{`S - ADMIN`}</p>
                                            <p className="m-0 text-white whitespace-nowrap mb-3">{`S - Adminstration`}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                </div>

                            </div>
                            
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardComponent;
