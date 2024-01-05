import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import './AdminDashboard.css';
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaClone } from "react-icons/fa";
import Modal from 'react-modal';
import { instance } from "../../api";

const AdminDashboardComp = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState({});
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredDelete, setIsHoveredDelete] = useState(false);
    const [isHoveredClone, setIsHoveredClone] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("loginData")))
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [plants, setPlants] = useState([])
    const [useEffectCall, setUseEffectCall] = useState(false)

    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        description: '',
    })
    useEffect(() => {
        const fetchPlant = async () => {
            if (userData.role == "admin") {
                const response = await instance.get('/plants/all-plant')
                setPlants(response.data)
            } else {
                if (userData.plant.length !== 0) {
                    userData.plant.forEach(async (item) => {
                        instance.get(`/plants/get-plant-byId/${item.plant}`).then((res) => {
                            setPlants((prevPlants) => [...prevPlants, res.data]);
                           console.log(plants,res.data)
                        }).catch((err) => {
                            console.log(err)
                        })
                    })
                }
            }
        }

        fetchPlant()
    }, [useEffectCall])

    const toggleDropdown = (id, item) => {
        setIsDropdownOpen(prevState => ({
            [id]: !prevState[id]
        }));
        setFormData(item)
    };

    const handleEditSubmit = () => {
        instance.put(`/plants/update-plant/${formData._id}`, formData).then((res) => {
            console.log(res)
            toggleDropdown(res.data._id)
            setEditModal(false)
            setFormData({
                _id: '',
                name: '',
                description: '',
            })
            handleUpdateConfirmationClose();
            setUseEffectCall(!useEffectCall)
        }).catch((err) => {
            console.log(err)
        })

    }

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleEdit = () => {
        closeDropdown();
    };

    const handleDelete = () => {
        closeDropdown();
    };


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
    };

    //edit
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleUpdateConfirmationView = () => {
        setShowUpdateConfirmation(true);
    };

    const handleEditModalView = () => {
        setEditModal(!editModal)
    };

    const handleEditModal = () => {
        handleEditModalView();
    };


    //delete
    const handleMouseEnterDelete = () => {
        setIsHoveredDelete(true);
    };

    const handleMouseLeaveDelete = () => {
        setIsHoveredDelete(false);
    };

    const handleDeleteModalView = () => {
        setDeleteModal(!deleteModal)
    };

    const handleDeleteModal = () => {
        handleDeleteModalView();
    };

    const handleDeletePlant = (id) => {
        instance.delete(`/plants/delete-plant/${id}`).then((res) => {
            console.log(res)
            handleDeleteModalView()
            setUseEffectCall(!useEffectCall)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleUpdateConfirmationClose = () => {
        setShowUpdateConfirmation(false);
    };

    //clone
    const handleMouseEnterClone = () => {
        setIsHoveredClone(true);
    };

    const handleMouseLeaveClone = () => {
        setIsHoveredClone(false);
    };

    const handleConfirmDuplicate = (id) => {
        instance.post(`/plants/clone-plant/${id}`).then((res) => {
            console.log(res)
            setUseEffectCall(!useEffectCall)
            setShowConfirmationModal(false);
        }).catch((err) => {
            console.log(err)
            setShowConfirmationModal(false);
        })
        setShowConfirmationModal(false);
    };

    const handleCancelDuplicate = () => {
        setShowConfirmationModal(false);
    };

    const handleDuplicate = () => {
        //setItemIdToDuplicate(id);
        setShowConfirmationModal(true);
    };


    return (
        <div className="bg-white p-4 h-[89.4vh] rounded-2xl shadow-md main-container">
            <div className="h-[40%]  rounded-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                {/* <div className="cursor-pointer flex items-end justify-end">
                    <CiCirclePlus className="text-slate-950 font-bold text-[20px]" onClick={handleCreateView} />
                </div> */}
                {/* {showAddModal ? (
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
                ) : null} */}

                <div className="flex items-center gap-5">
                    {plants.length !== 0 ? plants.map((item, index) => (

                        <div key={item._id} className="bg-[rgb(254,132,183)] p-4 rounded-lg relative">
                            {userData.role == "admin" && <div
                                className="absolute top-0 right-0 p-2 text-red cursor-pointer"
                                onClick={() => toggleDropdown(item._id, item)}
                            //onClick={() => handlePlusSPlantSFacClick(item._id)}
                            >
                                <BsThreeDots className="font-lighter text-[10px] h-5  ml-[90px] text-red-700" />
                            </div>}
                            {isDropdownOpen[item._id] && (
                                <div className="absolute top-2 right-0 left-20 shadow-lg mt-4 z-100 border-gray-300 rounded">
                                    <button
                                        className="block px-4 py-2 text-[12px] text-gray-700 "
                                        onClick={handleEditModal}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {isHovered ? 'Edit' : <FaEdit />}
                                    </button>

                                    {editModal ? (
                                        <>
                                            <div className={`bg-slate-900 z-50 ${showUpdateConfirmation ? 'modal-overlay' : ''}`}>
                                                <div
                                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                >
                                                    <div className="relative my-6 mx-auto w-[800px]">

                                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-green-50 outline-none focus:outline-none">

                                                            <div className="flex items-start justify-between p-5 ">
                                                                <h3 className="text-3xl font-semibold text-black">
                                                                    Edit Plant
                                                                </h3>
                                                                <button
                                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                //onClick={() => { setShowEditSPlantSFacModal(false) }}
                                                                >
                                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                        ×
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="mb-4">
                                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[22px]">
                                                                    Plant Name:
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="name-1"
                                                                    name="name"
                                                                    value={formData.name}
                                                                    onChange={handleChangeCreate}
                                                                    className="mt-1 ml-[25px] p-2 border border-gray-300 rounded-md w-[740px] h-[35px] text-black"
                                                                />
                                                            </div>
                                                            <div className="mb-4 mt-2">
                                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[22px]">
                                                                    Description:
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="description"
                                                                    name="description"
                                                                    value={formData.description}
                                                                    onChange={handleChangeCreate}
                                                                    className="mt-1 ml-[25px] p-2 border border-gray-300 rounded-md w-[740px] h-[35px] text-black"
                                                                />
                                                            </div>

                                                            <div className="flex items-center justify-end p-6">
                                                                <button
                                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 h-10"
                                                                    type="button"
                                                                    onClick={() => setEditModal(false)}
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    className="bg-[rgb(186,212,249)] text-black active:bg-[rgb(186,212,249)] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                    type="button"
                                                                    //onClick={handleEditSubmit}
                                                                    onClick={() => {
                                                                        handleUpdateConfirmationView();

                                                                    }}
                                                                >
                                                                    Update
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                            </div>

                                            {showUpdateConfirmation && (

                                                <div className="absolute mt-[150px] left-40 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white ml-[208px] w-[370px]" style={{ border: '2px solid rgb(65,73,115)' }}>
                                                    <div className="relative p-6 flex-auto">
                                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed text-black">
                                                            Are you sure you want to update?
                                                        </p>
                                                    </div>
                                                    <div className="bg-white p-6 shadow-md rounded-md">
                                                        <button
                                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 h-10"
                                                            type="button"
                                                            onClick={() => {
                                                                setShowUpdateConfirmation(false);
                                                                handleUpdateConfirmationClose();
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={handleEditSubmit}
                                                        >
                                                            Confirm Update
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : null}

                                    <button
                                        className="block px-4 py-2 text-[12px] text-gray-700 "
                                        onClick={handleDeleteModal}
                                        onMouseEnter={handleMouseEnterDelete}
                                        onMouseLeave={handleMouseLeaveDelete}
                                    >
                                        {isHoveredDelete ? 'Delete' : <MdDelete />}

                                    </button>
                                    {deleteModal && (
                                        <>
                                            <div >
                                                <div
                                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                >
                                                    <div className=" my-6 mx-auto">

                                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-green-50 outline-none focus:outline-none">

                                                            <div className="flex items-start justify-between p-5 ">
                                                                <h3 className="text-3xl font-semibold text-black">
                                                                    Delete - {item.name}
                                                                </h3>
                                                                <button
                                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                    onClick={() => handleDeleteModalView()}
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
                                                                    onClick={handleDeleteModalView}
                                                                //onClick={() => handleDeleteModalView(item._id)}
                                                                >
                                                                    No
                                                                </button>
                                                                <button
                                                                    className="bg-[rgb(186,212,249)] text-black active:bg-[rgb(186,212,249)] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                    type="button"
                                                                    onClick={() => handleDeletePlant(item._id)}
                                                                //onClick={() => handleDelete(item._id, item.parent)}
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
                                    )}

                                    <button
                                        className="block px-4 py-2 text-[12px] text-gray-700 "
                                        onClick={handleDuplicate}
                                        onMouseEnter={handleMouseEnterClone}
                                        onMouseLeave={handleMouseLeaveClone}
                                    >
                                        {isHoveredClone ? 'Clone' : <FaClone />}
                                    </button>
                                    <Modal className='flex items-center justify-center'
                                        isOpen={showConfirmationModal}
                                        onRequestClose={() => setShowConfirmationModal(false)}
                                    >
                                        <div className='z-50'>
                                            <div
                                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mt-[25px] "
                                            >
                                                <div className=" my-6 mx-auto">

                                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[150%] bg-green-50 outline-none focus:outline-none" style={{ border: '2px solid rgb(65,73,115)' }}>

                                                        <div className="flex items-start justify-between p-5 ">
                                                            <h3 className="text-3xl font-semibold text-black">
                                                                Clone - {item.name}
                                                            </h3>
                                                            <button
                                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                isOpen={showConfirmationModal}
                                                                onRequestClose={() => setShowConfirmationModal(false)}
                                                            >
                                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                    ×
                                                                </span>
                                                            </button>
                                                        </div>

                                                        <div className="relative p-1 flex-auto">
                                                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed text-black ml-4">
                                                                Are you sure you want to clone?
                                                            </p>
                                                        </div>

                                                        <div className="flex items-center justify-end p-6">
                                                            <button
                                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 h-10"
                                                                type="button"
                                                                onClick={handleCancelDuplicate}
                                                            >
                                                                No
                                                            </button>
                                                            <button
                                                                className="bg-[rgb(186,212,249)] text-black active:bg-[rgb(186,212,249)] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                type="button"
                                                                onClick={() => handleConfirmDuplicate(item._id)}
                                                            >
                                                                Yes
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                        </div>
                                    </Modal>

                                </div>
                            )}
                            <Link to={`/assets/${item._id}`}>
                                <div className="font-semibold bg-[rgb(254,132,183)] rounded-2xl h-[80px] w-[100px] text-[15px] flex items-center justify-center ">
                                    <p className="m-0 text-white mt-[-10px] ">{item.name}</p>
                                </div>
                            </Link>
                        </div>
                    )) : <div className="flex justify-center w-full"><h1 className="font-bold text-3xl text-center">No plant found</h1></div>}

                </div>
            </div>

            {/* <div className="h-[45%] mt-5  rounded-2xl " style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <div className="m-8">
                    <h1 className="ml-5"><strong>Recent Activities</strong></h1>
                    <div className='m-6'>
                        <div className=" text-zinc-900 text-[14px] flex items-center">
                            <FaEdit style={{ marginRight: '10px' }} />
                            SPlantSatComCompressionComponent
                        </div>
                        <div className=" text-zinc-900 text-[14px] flex items-center mt-3">
                            <FaEdit style={{ marginRight: '10px' }} />
                            SPlantSatComCompressionComponent
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default AdminDashboardComp;