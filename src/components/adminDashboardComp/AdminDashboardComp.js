import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

const AdminDashboardComp = () => {
    return (
        <div className="bg-white p-4 h-[89.4vh] rounded-lg shadow-md">
            <div className="h-[30%] bg-white  rounded-2xl" >
                <div className=''>
                    <div className=''>
                        <div className=''> 
                            <div className="">
                                <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 m-8">
                                    <Link to='/assets'>
                                        <div className="font-semibold bg-[rgb(254,132,183)] rounded-xl w-[200px] h-[100px] text-[15px]  flex items-center justify-center">
                                            <p className="m-0 text-white mt-[-15px] ">Plants</p>                         
                                       
                                        </div>
                                    </Link>
                                        <span><CiCirclePlus className="text-slate-950 font-bold text-[20px] mt-[-60px] ml-[250px]"  /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[45%] bg-white mt-5  rounded-2xl " >
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