import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

const SPlantSatComCompressionComponent = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    return (
        <div className="bg-white p-4 h-[87.1vh] rounded-lg shadow-md">
            <div className="top-0 left-0 m-4 cursor-pointer">
                <Link to='/s-plant-facilities'>
                    <FaArrowLeft className="text-slate-500 font-lighter text-[20px]"/>
                </Link>
            </div>
            <div className=" w-[98%] h-[85%] bg-green-50 m-5">
                <div className='m-15'>

                    <b className="text-2xl cursor-pointer flex items-center justify-center">
                    S - PLANT - SAT - COM Compression
                    </b>
                    <div className="cursor-pointer flex items-end justify-end mt-[-10px]">
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
                                            <label htmlFor="name" className="block text-sm font-medium ml-[20px]">
                                            Location:
                                            </label>
                                            <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            //value={location}
                                            //onChange={(e) => setName(e.target.value)}
                                            className="mt-1 ml-[20px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px]"
                                            />
                                        </div>
                                        <div className="mb-4 mt-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[20px]">
                                            Description:
                                            </label>
                                            <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            //value={description}
                                            //onChange={(e) => setName(e.target.value)}
                                            className="mt-1 ml-[20px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px]"
                                            />
                                        </div>
                                        <div className="mb-4 mt-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[20px]">
                                            Parent:
                                            </label>
                                            <input
                                            type="text"
                                            id="parent"
                                            name="parent"
                                            //value={parent}
                                            //onChange={(e) => setName(e.target.value)}
                                            className="mt-1 ml-[20px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px]"
                                            />
                                        </div>
                                        <div className="mb-4 mt-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[20px]">
                                            System:
                                            </label>
                                            <input
                                            type="text"
                                            id="system"
                                            name="system"
                                            //value={system}
                                            //onChange={(e) => setName(e.target.value)}
                                            className="mt-1 ml-[20px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px]"
                                            />
                                        </div>
                                        <div className="mb-4 mt-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[20px]">
                                            Level:
                                            </label>
                                            <input
                                            type="text"
                                            id="level"
                                            name="level"
                                            //value={level}
                                            //onChange={(e) => setName(e.target.value)}
                                            className="mt-1 ml-[20px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px]"
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
                    <div className=" rounded-6xl bg-powderblue w-[450px] h-auto overflow-hidden bg-green-100 rounded-xl mt-4">
                        <b className="flex items-center justify-center  text-[15px]">
                            S-PLANT-KX-201 Compressor Package 201
                        </b>
                        <div className="w-[368px] h-auto flex flex-row flex-wrap items-start justify-center gap-[8px] text-center text-white">
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-CR-0001</p>
                                <p className="m-0 text-white mb-3">Bridge Crane</p>
                            </div>
                            </div>
                            <div
                            className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0 cursor-pointer"
                            
                            >
                            <Link to='/s-plant-ex-201-exchangePkg'>
                            <div className=" ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-EX-201</p>
                                <p className="m-0 text-white mb-3">Exchanger Package</p>
                            </div>
                            </Link>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0 mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-GE-201</p>
                                <p className="m-0 text-white mb-3">Engine</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0 mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-K-201</p>
                                <p className="m-0 text-white mb-3">Compressor</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0 mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-TK-201A</p>
                                <p className="m-0 text-white">{`Compressor Oil `}</p>
                                <p className="m-0 text-white mb-3">Day Tank</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-TK-201B</p>
                                <p className="m-0 text-white mb-3">Engine Oil Day Tank</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-V-202</p>
                                <p className="m-0 text-white">{`Stage 1 Suction `}</p>
                                <p className="m-0 text-white mb-3">Scrubber</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-V-205</p>
                                <p className="m-0 text-white">{`Stage 2 Suction `}</p>
                                <p className="m-0 text-white mb-3">Scrubber</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-V-208</p>
                                <p className="m-0 text-white">{`Stage 3 Suction `}</p>
                                <p className="m-0 text-white mb-3">Scrubber</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-V-211</p>
                                <p className="m-0 text-white">{`Stage 4 Suction `}</p>
                                <p className="m-0 text-white mb-3">Scrubber</p>
                            </div>
                            </div>
                            <div className=" rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-V-402</p>
                                <p className="m-0 text-white mb-3">Fuel Gas Scrubber</p>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className=" rounded-6xl bg-powderblue w-[450px] h-auto overflow-hidden bg-green-100 rounded-xl ml-1 mt-4">
                        <b className="flex items-center justify-center  text-[15px]">
                        S-PLANT-KX-202 Compressor Package 202
                        </b>
                        <div className="w-[368px] h-auto flex flex-row flex-wrap items-start justify-center gap-[8px] text-center text-white">
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-CR-0002</p>
                                <p className="m-0 text-white mb-3">Bridge Crane</p>
                            </div>
                            </div>
                            <div
                            className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0 cursor-pointer"
                            
                            >
                            <Link to='/s-plant-ex-201-exchangePkg'>
                            <div className=" ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-EX-202</p>
                                <p className="m-0 text-white mb-3">Exchanger Package</p>
                            </div>
                            </Link>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0 mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-GE-202</p>
                                <p className="m-0 text-white mb-3">Engine</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0 mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-GE-202</p>
                                <p className="m-0 text-white mb-3">Engine</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0 mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-TK-202A</p>
                                <p className="m-0 text-white">{`Compressor Oil `}</p>
                                <p className="m-0 text-white mb-3">Day Tank</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-TK-202B</p>
                                <p className="m-0 text-white mb-3">Engine Oil Day Tank</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-V-214</p>
                                <p className="m-0 text-white">{`Stage 1 Suction `}</p>
                                <p className="m-0 text-white mb-3">Scrubber</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-V-217</p>
                                <p className="m-0 text-white">{`Stage 2 Suction `}</p>
                                <p className="m-0 text-white mb-3">Scrubber</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-V-220</p>
                                <p className="m-0 text-white">{`Stage 3 Suction `}</p>
                                <p className="m-0 text-white mb-3">Scrubber</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-V-223</p>
                                <p className="m-0 text-white">{`Stage 4 Suction `}</p>
                                <p className="m-0 text-white mb-3">Scrubber</p>
                            </div>
                            </div>
                            <div className=" rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-V-403</p>
                                <p className="m-0 text-white mb-3">Fuel Gas Scrubber</p>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className=" rounded-6xl bg-powderblue w-[450px] h-auto overflow-hidden bg-green-100 rounded-xl ml-1 mt-4">
                        <b className="flex items-center justify-center  text-[15px]">
                            S-PLANT-KX-201 Compressor Package 203
                        </b>
                        <div className="w-[368px] h-auto flex flex-row flex-wrap items-start justify-center gap-[8px] text-center text-white">
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-CR-0003</p>
                                <p className="m-0 text-white mb-3">Bridge Crane</p>
                            </div>
                            </div>
                            <div
                            className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0 cursor-pointer"
                            
                            >
                            <Link to='/s-plant-ex-201-exchangePkg'>
                            <div className=" ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-EX-203</p>
                                <p className="m-0 text-white mb-3">Exchanger Package</p>
                            </div>
                            </Link>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0 mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-GE-203</p>
                                <p className="m-0 text-white mb-3">Engine</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0 mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-K-203</p>
                                <p className="m-0 text-white mb-3">Compressor</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0 mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-TK-203A</p>
                                <p className="m-0 text-white">{`Compressor Oil `}</p>
                                <p className="m-0 text-white mb-3">Day Tank</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-TK-203B</p>
                                <p className="m-0 text-white mb-3">Engine Oil Day Tank</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-V-226</p>
                                <p className="m-0 text-white">{`Stage 1 Suction `}</p>
                                <p className="m-0 text-white mb-3">Scrubber</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-V-229</p>
                                <p className="m-0 text-white">{`Stage 2 Suction `}</p>
                                <p className="m-0 text-white mb-3">Scrubber</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-V-232</p>
                                <p className="m-0 text-white">{`Stage 3 Suction `}</p>
                                <p className="m-0 text-white mb-3">Scrubber</p>
                            </div>
                            </div>
                            <div className="relative rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-V-235</p>
                                <p className="m-0 text-white">{`Stage 4 Suction `}</p>
                                <p className="m-0 text-white mb-3">Scrubber</p>
                            </div>
                            </div>
                            <div className=" rounded-6xl bg-cornflowerblue w-[180px] h-[100px] overflow-hidden shrink-0  mt-[-35px]">
                            <div className="ml-6 font-semibold bg-blue-800 rounded-xl w-[140px] h-16 text-[12px]">
                                <p className="m-0 text-white mt-3">S-PLANT-V-404</p>
                                <p className="m-0 text-white mb-3">Fuel Gas Scrubber</p>
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

export default SPlantSatComCompressionComponent;