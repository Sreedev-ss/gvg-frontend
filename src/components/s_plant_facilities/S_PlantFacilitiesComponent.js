import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";

const SPlantFacilitiesComponent = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDropDownSPlantSFac, setShowDropDownSPlantSFac] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    
    const handlePlusSPlantSFacClick = () => {
        console.log("ssss");
        setShowDropDownSPlantSFac(!showDropDownSPlantSFac)
      }
    
    return (
        <div className="bg-white p-4 h-[87.1vh] rounded-lg shadow-md">
            <div className="top-0 left-0 m-4 cursor-pointer">
                <Link to='/assets'>
                    <FaArrowLeft className="text-slate-500 font-lighter text-[20px]"/>
                </Link>
            </div>
            <div className=" w-[95%] h-[85%] bg-green-50 m-6">
                <div className='m-15'>

                    <b className="text-2xl cursor-pointer flex items-center justify-center">
                        S - PLANT - S Facilities
                    </b>
               
                    <div className='flex items-center justify-center m-16 mt-5'>
                        <div className="rounded-6xl  py-2 px-[15px] box-border ml-[-66px] bg-green-200 rounded-2xl w-[20%]">
                            <p className="m-0 text-black mt-2 justify-center items-center flex font-semibold">S-Plant-SAT</p>
                            <p className="m-0 text-black justify-center items-center flex font-semibold">S Satellite</p>
                        </div>

                        <div className='absolute mt-0 left-0 top-60'>

                            <div className="text-center text-xl text-white bg-green-200 rounded-2xl ml-[310px] mt-[30px] w-[102%] h-auto">
                                <div className="cursor-pointer flex items-end justify-end">
                                    <CiCirclePlus className="text-slate-950 font-bold text-[20px]" onClick={() => setShowAddModal(true)}/>
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

                                <div className="flex">
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[5%] mt-2">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3 ">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white ">BULID</p>
                                            <p className="m-0 text-white mb-3 ">Bulidings</p>
                                        </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[7%] mt-2">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                        
                                            <p className="m-0 text-white mt-3 ">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white ">CMS</p>
                                            <p className="m-0 text-white mb-3">Communications</p>
                                        </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[7%] mt-2">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                        <div className=" text-blue-800  cursor-pointer ml-[170px]" onClick={handlePlusSPlantSFacClick}>
                                            <BsThreeDots className="font-lighter text-[20px] hover:text-green-50"/>
                                        </div>
                                        <div className={`dropdown ${showDropDownSPlantSFac ? 'visible' : 'hidden'}`} >
                                            <p className="m-0 text-white whitespace-nowrap mt-3 cursor-pointer ml-[90px]" onClick={() => setShowDeleteModal(true)}><MdDeleteOutline/></p>
                                            {showDeleteModal ? (
                                            <>
                                            <div className="">
                                                <div
                                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                >
                                                <div className=" my-6 mx-auto">

                                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-green-50 outline-none focus:outline-none">
                                                
                                                    <div className="flex items-start justify-between p-5 ">
                                                        <h3 className="text-3xl font-semibold text-black">
                                                        Delete 
                                                        </h3>
                                                        <button
                                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                        onClick={() => setShowDeleteModal(false)}
                                                        >
                                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                            ×
                                                        </span>
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="relative p-6 flex-auto">
                                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed text-black">
                                                        Are you sure you want to delete?
                                                        </p>
                                                    </div>
                                    
                                                    <div className="flex items-center justify-end p-6">
                                                        <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 h-10" 
                                                        type="button"
                                                        onClick={() => setShowDeleteModal(false)}
                                                        >
                                                        No
                                                        </button>
                                                        <button
                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setShowDeleteModal(false)}
                                                        >
                                                        Yes
                                                        </button>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                                </div>
                                            </>
                                            ) : null}

                                        </div>
                                        {!showDropDownSPlantSFac && (
                                            <>
                                            <p className="m-0 text-white mt-[-10px]">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white">COM</p>
                                            <p className="m-0 text-white mb-3">Compression</p>
                                            </>
                                        )}
                                    </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[7%] mt-2">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white">DEH</p>
                                            <p className="m-0 text-white mb-3">Dehydration</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className=" rounded-6xl bg-cornflowerblue overflow-hidden shrink-0 ml-[5%] mt-[-8%]">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white">MOB</p>
                                            <p className="m-0 text-white mb-3">Mobile Equipment</p>
                                        </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue overflow-hidden shrink-0 ml-[7%] mt-[-8%]">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white">PWRG</p>
                                            <p className="m-0 text-white mb-3">Power Generation</p>
                                        </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue  overflow-hidden shrink-0 ml-[7%] mt-[-8%]">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white">SAFE</p>
                                            <p className="m-0 text-white mb-3">Safety Equipment</p>
                                        </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[7%] mt-[-8%]">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white">SEP</p>
                                            <p className="m-0 text-white mb-3">Separation</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className=" rounded-6xl bg-cornflowerblue overflow-hidden shrink-0 ml-[30%] mt-[-8%]">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white">SHU</p>
                                            <p className="m-0 text-white mb-3">Shutdown</p>
                                        </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue overflow-hidden shrink-0 ml-[7%] mt-[-8%]">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white">WAS</p>
                                            <p className="m-0 text-white mb-3">Waste Disposal</p>
                                        </div>
                                    </div>                               
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SPlantFacilitiesComponent;