import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const AdminDashboardComp = () => {
    return (
        <div className="bg-white p-4 h-[89.4vh] rounded-lg shadow-md">
            <div className=" w-[100%] h-[30%] bg-[#ebf5f4]  rounded-2xl flex items-center justify-center " style={{ border: '2px solid rgb(65,73,115)'}}>
                <div className=''>
                    <div className='flex items-center justify-center'>
                        <div className=''> 
                            <div className="flex items-center justify-center">
                                <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ">
                                    <Link to='/dummy'>
                                        <div className="font-semibold bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-14 flex items-center justify-center">
                                            <p className="m-0 text-white mt-[-20px] ">East</p>
                                            <p className="m-0 text-white  mt-8 ml-[-38px]">Assets</p>                                    
                                        </div>
                                    </Link>
                                </div>
                                <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[5%]">
                                    <div className="font-semibold bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-14 flex items-center justify-center">
                                        <p className="m-0 text-white mt-[-20px]">West</p>
                                        <p className="m-0 text-white mt-8 ml-[-45px]">Assets</p>                                        
                                    </div>
                                </div>
                                <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[5%]">
                                    <div className="font-semibold bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-14 flex items-center justify-center">
                                        <p className="m-0 text-white mt-[-20px]">North</p>
                                        <p className="m-0 text-white mt-8 ml-[-45px]">Assets</p>                                        
                                    </div>
                                </div>
                                <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[5%]">
                                    <div className="font-semibold bg-blue-800 rounded-xl w-[200px] h-[100px] text-[15px] mt-14 flex items-center justify-center">
                                        <p className="m-0 text-white mt-[-20px]">South</p>
                                        <p className="m-0 text-white mt-8 ml-[-45px]">Assets</p>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" w-[100%] h-[65%] bg-[#ebf5f4] mt-5  rounded-2xl " style={{ border: '2px solid rgb(65,73,115)'}}>
                <div className="m-8">
                    <h1 className="ml-5"><strong>Recent Activities</strong></h1>
                    <div className='m-6'>
                        <div className=" text-zinc-900 text-[14px] flex items-center">
                            <FaEdit style={{marginRight:'10px'}}/>
                            SPlantSatComCompressionComponent
                        </div>
                        <div className=" text-zinc-900 text-[14px] flex items-center mt-3">
                            <FaEdit style={{marginRight:'10px'}}/>
                            SPlantSatComCompressionComponent
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardComp;