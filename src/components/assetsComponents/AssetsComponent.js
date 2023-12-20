import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AssetsComponenet = () => {
    return (
        <div className="bg-white p-4 h-[87.1vh] rounded-lg shadow-md">
            <div className="top-0 left-0 m-4 cursor-pointer">
                <Link to='/assets'>
                    <FaArrowLeft className="text-slate-500 font-lighter text-[20px]"/>
                </Link>
            </div>
            <div className=" w-[95%] h-auto bg-green-50 m-6">
                <div className='m-15'>
                    <b className="text-4xl cursor-pointer flex items-center justify-center">
                        Assets
                    </b>
                    <div className='flex items-center justify-center m-16 mt-5'>
                        <div className=' mt-0 left-0 top-60'>
                            <div className="text-center text-xl text-white bg-green-200 rounded-2xl ml-[-100px] mt-[30px] w-[172%]">
                            <div className="flex">
                           
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[7%] mt-2">
                                        <Link to='/east-assets'>
                                            <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-6 flex items-center justify-center">
                                                <p className="m-0 text-white mt-[-12px] ">East</p>
                                                <p className="m-0 text-white  mt-8 ml-[-38px]">Assets</p>                                    
                                            </div>
                                        </Link>
                                    </div>
                              
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[4%] mt-2">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-6 flex items-center justify-center">
                                            <p className="m-0 text-white mt-[-12px]  ">West</p>
                                            <p className="m-0 text-white mt-8 ml-[-38px]">Assets</p>
                                            
                                        </div>
                                    </div>
                                    
                                    </div>
                                    <div className="flex">
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[7%] mt-2">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-[-1px] flex items-center justify-center">
                                            <p className="m-0 text-white mt-[-12px]  ">North</p>
                                            <p className="m-0 text-white mt-8 ml-[-43px]">Assets</p>
                                           
                                        </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[5%] mt-2">
                                        <div className="font-light bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px]  mt-[-1px] flex items-center justify-center">
                                            <p className="m-0 text-white mt-[-12px]  ">South</p>
                                            <p className="m-0 text-white mt-8 ml-[-43px]">Assets</p>
                                            
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

export default AssetsComponenet;