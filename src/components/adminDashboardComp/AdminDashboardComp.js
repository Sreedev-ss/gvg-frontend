import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import './AdminDashboard.css';
import { BsThreeDots } from "react-icons/bs";

const AdminDashboardComp = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [boxes, setBoxes] = useState(() => {
        const storedBoxes = localStorage.getItem("boxes");
        return storedBoxes ? JSON.parse(storedBoxes) : [{ id: 1, name: "" }];
    });

    const handleAddBox = () => {
        const newBox = { id: boxes.length + 1, name: "" };
        setBoxes([...boxes, newBox]);
    };

    const handleNameChange = (index, newName) => {
        const updatedBoxes = [...boxes];
        updatedBoxes[index].name = newName;
        setBoxes(updatedBoxes);
    };

    useEffect(() => {
        localStorage.setItem("boxes", JSON.stringify(boxes));
    }, [boxes]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
    })

    const handleChangeCreate = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    };

    const handleCreate = (e) => {
        e.preventDefault();

        if (formData.name === "" || formData.description === "" || formData.system === "") {
            console.log('Fill data')
        } else {
            // instance.post(`/assets/addAsset/${level}`, formData).then((res) => {
            //     toast.success("Created successfully");
            //     console.log(res)
            //     setFormData({
            //         name: '',
            //         description: '',
            //         system: 'primary',
            //         parent: parent
            //     })
            //     fetchData(res.data?.parent)
            // }).catch((err) => {
            //     console.log(err)
            // })
            // setShowAddModal(false)
        }

    };

    
    const handleCreateView = () => {
        setFormData({
            name: '',
            description: '',
            
        })
        setShowAddModal(true)
    }

      
    return (
        <div className="bg-white p-4 h-[89.4vh] rounded-2xl shadow-md main-container">
           <div className="h-[40%]  rounded-2xl" style={{  backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <div className="cursor-pointer flex items-end justify-end">
                    <CiCirclePlus className="text-slate-950 font-bold text-[20px]"  onClick={handleCreateView}/>
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
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[25px]">
                                                Plant Name:
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChangeCreate}
                                                className="mt-1 ml-[25px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px] text-black"
                                            />
                                        </div>
                                        <div className="mb-4 mt-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[25px]">
                                                Description:
                                            </label>
                                            <input
                                                type="text"
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChangeCreate}
                                                className="mt-1 ml-[25px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px] text-black"
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
                                                onClick={handleCreate}
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

                <div className="flex items-center">
                    <div className="bg-[rgb(254,132,183)] p-4 rounded-lg">
                    <div
                                        className="top-0 right-0 p-2 text-red cursor-pointer w-0"
                                        //onClick={() => handlePlusSPlantSFacClick(item._id)}
                                    >
                                        <BsThreeDots className="font-lighter text-[10px] mt-[-26px]  h-5  ml-[90px] text-red-700" />
                                    </div>
                        <Link to='/assets'>
                        <div className="font-semibold bg-[rgb(254,132,183)] rounded-2xl h-[80px] w-[100px] text-[15px] flex items-center justify-center mt-[-15px]">
                            <p className="m-0 text-white mt-[-10px] ">Plants</p>
                        </div>
                        </Link>
                    </div>
                    {/* <span onClick={handleAddBox}>
                        <CiCirclePlus className="text-slate-950 font-bold text-[20px] mt-[10px] ml-[40px]" />
                    </span> */}
                    {/* <div className="m-6 ml-3 flex">      
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
                    </div> */}
                </div>
            </div>

            <div className="h-[45%] mt-5  rounded-2xl " style={{  backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
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