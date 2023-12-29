// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaEdit } from "react-icons/fa";
// import { CiCirclePlus } from "react-icons/ci";

// const AdminDashboardComp = () => {
//     const [boxes, setBoxes] = useState([{ id: 1 }]);

//     const handleAddBox = () => {
//         const newBox = { id: boxes.length + 1 };
//         setBoxes([...boxes, newBox]);
//       };

      
//     return (
//         <div className="bg-white p-4 h-[89.4vh] rounded-2xl shadow-md">
//             <div className="h-[40%] bg-white  rounded-2xl" >
//                 <div className=''>
//                     <div className=''>
//                         <div className=''> 
//                             <div className="">
//                                 <div className=" rounded-2xl bg-cornflowerblue  overflow-hidden shrink-0 m-8 w-[200px] ">
//                                     {/* <Link to='/assets'>
//                                         <div className="font-semibold bg-[rgb(254,132,183)] rounded-2xl  h-[100px] text-[15px]  flex items-center justify-center">
//                                             <p className="m-0 text-white mt-[-10px] ">Plants</p>                         
                                       
//                                         </div>
//                                     </Link> */}
//                                     <span>
//                                 <div className=" rounded-2xl bg-cornflowerblue  overflow-hidden shrink-0 m-8 w-auto flex items-center">
//                                     {boxes.map((box) => (
//                                     <div key={box.id} className="font-semibold bg-[rgb(254,132,183)] rounded-2xl  h-[100px] text-[15px]  flex items-center justify-center w-[500px]">
//                                         <p className="m-0 text-white mt-[-10px] ">Plants</p>
//                                     </div>
//                                     ))}
//                                 </div>
//                                 </span>
//                                 </div>
//                                         <span onClick={handleAddBox}><CiCirclePlus className="text-slate-950 font-bold text-[20px] mt-[-90px] ml-[550px]"  /></span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="h-[45%] bg-white mt-5  rounded-2xl " >
//                 <div className="m-8">
//                     <h1 className="ml-5"><strong>Recent Activities</strong></h1>
//                     <div className='m-6'>
//                         <div className=" text-zinc-900 text-[14px] flex items-center">
//                             <FaEdit style={{marginRight:'10px'}}/>
//                             SPlantSatComCompressionComponent
//                         </div>
//                         <div className=" text-zinc-900 text-[14px] flex items-center mt-3">
//                             <FaEdit style={{marginRight:'10px'}}/>
//                             SPlantSatComCompressionComponent
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AdminDashboardComp;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

const AdminDashboardComp = () => {
    const [boxes, setBoxes] = useState([{ id: 1, name: "" }]);

    const handleAddBox = () => {
        const newBox = { id: boxes.length + 1, name: "" };
        setBoxes([...boxes, newBox]);
    };

    const handleNameChange = (index, newName) => {
        const updatedBoxes = [...boxes];
        updatedBoxes[index].name = newName;
        setBoxes(updatedBoxes);
    };

      
    return (
        <div className="bg-white p-4 h-[89.4vh] rounded-2xl shadow-md">
           <div className="h-[40%] bg-white rounded-2xl">
                <div className="flex items-center">
                    <span onClick={handleAddBox}>
                        <CiCirclePlus className="text-slate-950 font-bold text-[20px] mt-[10px] ml-[40px]" />
                    </span>
                    <div className="m-6 ml-3 flex">
                        
                    {/* <div className="font-semibold bg-[rgb(254,132,183)] rounded-2xl h-[80px] mt-[10px] w-[100px] text-[15px] flex items-center justify-center">
                                    <p className="m-0 text-white mt-[-10px] ">Plants</p>
                                </div> */}
                               
                        {boxes.map((box, index) => (
                            <div key={box.id} className="text-zinc-900 text-[14px] flex  mt-3 ">
                                <Link to='/assets'>
                                <div className="font-semibold bg-[rgb(254,132,183)] rounded-2xl h-[80px] w-[100px] text-[15px] flex items-center justify-center ">
                                    <p className="m-0 text-white mt-[-10px] ">Plants</p>
                                </div>
                                <input
                                    type="text"
                                    value={box.name}
                                    onChange={(e) => handleNameChange(index, e.target.value)}
                                />
                                </Link>
                            </div>
                        ))}
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