import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const SPlantFacilitiesComponent = () => {
    
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
                                <div className="flex">
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[5%] mt-4">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3 ">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white ">BULID</p>
                                            <p className="m-0 text-white mb-3 ">Bulidings</p>
                                        </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[7%] mt-4">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3 ">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white ">CMS</p>
                                            <p className="m-0 text-white mb-3">Communications</p>
                                        </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[7%] mt-4">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white">COM</p>
                                            <p className="m-0 text-white mb-3">Compression</p>
                                        </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[7%] mt-4">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white">DEH</p>
                                            <p className="m-0 text-white mb-3">Dehydration</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className=" rounded-6xl bg-cornflowerblue overflow-hidden shrink-0 ml-[5%] mt-[-6%]">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white">MOB</p>
                                            <p className="m-0 text-white mb-3">Mobile Equipment</p>
                                        </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue overflow-hidden shrink-0 ml-[7%] mt-[-6%]">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white">PWRG</p>
                                            <p className="m-0 text-white mb-3">Power Generation</p>
                                        </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue  overflow-hidden shrink-0 ml-[7%] mt-[-6%]">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white">SAFE</p>
                                            <p className="m-0 text-white mb-3">Safety Equipment</p>
                                        </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[7%] mt-[-6%]">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white">SEP</p>
                                            <p className="m-0 text-white mb-3">Separation</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className=" rounded-6xl bg-cornflowerblue overflow-hidden shrink-0 ml-[30%] mt-[-6%]">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-3">
                                            <p className="m-0 text-white mt-3">S-PLANT-SAT-</p>
                                            <p className="m-0 text-white">SHU</p>
                                            <p className="m-0 text-white mb-3">Shutdown</p>
                                        </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue overflow-hidden shrink-0 ml-[7%] mt-[-6%]">
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