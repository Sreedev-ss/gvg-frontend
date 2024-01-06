import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { instance } from "../../api";
import { useHierarchy } from "../../context/HierarchyContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BsThreeDots } from "react-icons/bs";
import Modal from 'react-modal';
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import { SketchPicker } from 'react-color';

const AssetsComponenet = ({ plantId }) => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [asset, setAsset] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const { parentid } = useHierarchy();
    const [showDropDownSPlantSFac, setShowDropDownSPlantSFac] = useState({});
    const [deleteModal, setDeleteModal] = useState({});
    const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
    const [showEditSPlantSFacModal, setShowEditSPlantSFacModal] = useState(false);
    const [itemIdToDuplicate, setItemIdToDuplicate] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [userData, setUserData] = useState(JSON?.parse(localStorage?.getItem("loginData")))
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [accessState, setAccessState] = useState({})
    const [selectedColor, setSelectedColor] = useState('#ffffff');
    const [formData, setFormData] = useState({
        description: '',
        system: 'primary',
        parent: id,
        plant: plantId
    })

    useEffect(() => {
        if (userData.role == "admin") {
            setAccessState({ edit: true, delete: true, create: true, duplicate: true })
        } else if (userData.plant) {
            const data = userData.plant.find((item) => item?.plant == plantId)
            console.log(data)
            setAccessState(data.access)
        }
    }, [])
    useEffect(() => {
        setLoading(true)
        instance.get(`/assets/children/null/${plantId}`).then((res) => {

            if (res.data.length == 0) {
                instance.get(`/assets/allAsset/${plantId}`).then((res) => {
                    if (res.data) {
                        const data = res.data.find((item => item?.level == 1))
                        navigate(`/asset/${data?.parent}/${plantId}`)
                        setLoading(false)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                setLoading(false)
            }
            // setLoading(false)
            setAsset(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    const handlePlusSPlantSFacClick = (itemId) => {
        setShowDropDownSPlantSFac(prevState => ({
            [itemId]: !prevState[itemId]
        }))
    };

    const handleChangeCreate = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    };

    const handleCreateView = () => {
        setFormData((prevData) => (
            {
                ...prevData,
                name: '',
                description: '',
                system: 'primary',
                parent: null
            }
        ))
        setShowAddModal(true)
    };

    const handleDeleteModalView = (itemId) => {
        setDeleteModal(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }))
    };

    const handleUpdateConfirmationView = () => {
        setShowUpdateConfirmation(true);
    };

    const handleUpdateConfirmationClose = () => {
        setShowUpdateConfirmation(false);
    };

    const handleDuplicate = (id) => {
        setItemIdToDuplicate(id);
        setShowConfirmationModal(true);
    };

    const handleCancelDuplicate = () => {
        setShowConfirmationModal(false);
    };

    const handleFilterClick = () => {
        setShowColorPicker(!showColorPicker);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);

    };

    const handleCreate = (e) => {
        e.preventDefault();

        if (formData.name === "" || formData.description === "" || formData.system === "" || formData.plant === "") {
            console.log('Fill data')
        } else {
            instance.post(`/assets/addAsset/0`, formData).then((res) => {
                toast.success("Created successfully");
                setFormData({
                    description: '',
                    system: 'primary',
                    parent: '',
                    plant: plantId
                })
                window.location.reload()
            }).catch((err) => {
                console.log(err)
            })
            setShowAddModal(false)
        }
    }

    const handleDelete = (id, name) => {
        instance.delete(`/assets/deleteAsset/${id}/${name}/${plantId}`).then((res) => {
            toast.success("Deleted successfully");
            window.location.reload()

        }).catch((err) => {
            console.log(err)
        })
    }

    const handleEditSubmit = () => {
        instance.put(`/assets/editAsset/${formData._id}`, formData).then((res) => {
            toast.success("Edited successfully");
            setFormData({
                name: '',
                description: '',
                system: 'primary',
                parent: null,
                plant: plantId
            })
            // handleUpdateConfirmationClose();
            window.location.reload()
            setShowEditSPlantSFacModal(false)
        }).catch((err) => {
            handleUpdateConfirmationClose();
            console.log(err)
        })
    };



    const handleConfirmDuplicate = () => {
        instance.post(`/assets/duplicate/${itemIdToDuplicate}`).then((res) => {
            toast.success("Cloned successfully");
            handlePlusSPlantSFacClick(itemIdToDuplicate);
            setShowConfirmationModal(false);
            window.location.reload()
        }).catch((err) => {
            console.log(err);
            setShowConfirmationModal(false);
        })
    };

    return (

        <div className="bg-white p-4 h-[89.4vh] rounded-lg shadow-md main-container">
            <ToastContainer />
            <div className="top-0 left-0 m-4 cursor-pointer">
                <Link to='/'>
                    <FaArrowLeft className="text-slate-500 font-lighter text-[20px]" />
                </Link>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-[80%]">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid">

                    </div>
                </div>
            ) :
                (<div className="h-[78%] max-h-[80%]  m-6 rounded-2xl" style={{ border: '2px solid rgb(17,110,255)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>

                    <div className="cursor-pointer flex items-end justify-end m-4">
                        {accessState?.create && <CiCirclePlus className="text-slate-950 font-bold text-[20px]" onClick={handleCreateView} />}
                        <span>
                            {/* <CiFilter className='ml-[97%] ' onClick={handleFilterClick}/> */}
                            {/* {showColorPicker && (
                        <SketchPicker
                        className='absolute right-4 mt-4'
                        color={selectedColor}
                        onChangeComplete={(color) => handleColorChange(color)}
                        />
                    )} */}
                        </span>
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
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[24px]">
                                                    Name:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChangeCreate}
                                                    className="mt-1 ml-[24px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px] text-black"
                                                />
                                            </div>
                                            <div className="mb-4 mt-2">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[24px]">
                                                    Description:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="description"
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChangeCreate}
                                                    className="mt-1 ml-[24px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px] text-black"
                                                />
                                            </div>
                                            <div className="mb-4 mt-2">
                                                <label htmlFor="system" className="block text-sm font-medium text-gray-700 ml-[24px]">
                                                    System:
                                                </label>
                                                <select
                                                    id="system"
                                                    name="system"
                                                    value={formData.system}
                                                    onChange={handleChangeCreate}
                                                    className="mt-1 ml-[24px] p-1 border border-gray-300 rounded-md w-[735px] h-[35px] text-black"
                                                >
                                                    <option value="primary">primary</option>
                                                </select>
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

                    <div className='m-15'>
                        <b className="text-4xl cursor-pointer flex items-center justify-center">
                            Assets
                        </b>
                        <div className='flex items-center justify-center mt-5  overflow-y-scroll' style={{ maxHeight: '350px' }}>        
                            <div className='py-5 left-0 top-60 pt-16'>
                                <div className="text-center text-xl text-white ">
                                    <div className={`grid ${asset?.length == 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-5`}>
                                        {asset.map((item, index) => (

                                            <div key={index} className=" bg-[rgb(55,115,202)] overflow-hidden rounded-2xl w-[190px] relative" >
                                                <div
                                                    className="absolute top-0 right-0 p-2 text-white cursor-pointer rounded-xl shadow-lg "
                                                    onClick={() => handlePlusSPlantSFacClick(item._id)}
                                                >
                                                    <BsThreeDots className="font-lighter text-[15px]" />
                                                </div>
                                                {showDropDownSPlantSFac[item._id] && (
                                                    <div className="text-white bg-[#3773ca] rounded-xl shadow-lg px-2 absolute top-5 right-0  dropContent show text-sm">
                                                        {/* <div className="dropdown"> */}
                                                        {accessState?.delete && <p className="m-0  whitespace-nowrap cursor-pointer p-tooltip"
                                                            onClick={() => handleDeleteModalView(item._id)}
                                                            style={{ '--i': 0 }}
                                                        >
                                                            <MdDeleteOutline className="text-slate-950 mt-2" />
                                                            <span className="tooltip">Delete</span>
                                                        </p>}
                                                        {accessState?.edit && <p className="m-0  whitespace-nowrap cursor-pointer p-tooltip"
                                                            onClick={() => { setShowEditSPlantSFacModal(true); setFormData(item); }}
                                                            style={{ '--i': 1 }}
                                                        >
                                                            <CiEdit className='mt-3 text-slate-950' />
                                                            <span className="tooltip">Edit</span>
                                                        </p>}
                                                        {accessState?.duplicate && <p className="m-0  whitespace-nowrap cursor-pointer p-tooltip"
                                                            onClick={() => handleDuplicate(item._id)}
                                                            style={{ '--i': 2 }}
                                                        >
                                                            <HiOutlineDocumentDuplicate className='mt-3 text-slate-950' />
                                                            <span className="tooltip">Duplicate</span>
                                                        </p>}
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
                                                                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                    type="button"
                                                                                    onClick={handleConfirmDuplicate}
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
                                                {deleteModal[item._id] ? (
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
                                                                                onClick={() => handleDeleteModalView(item._id)}
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
                                                                                onClick={() => handleDeleteModalView(item._id)}
                                                                            >
                                                                                No
                                                                            </button>
                                                                            <button
                                                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                type="button"
                                                                                onClick={() => handleDelete(item._id, item.name)}
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

                                                {showEditSPlantSFacModal ? (
                                                    <>
                                                        <div className={`bg-slate-900 z-50 ${showUpdateConfirmation ? 'modal-overlay' : ''} relative`}>
                                                            <div
                                                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                            >
                                                                <div className="relative my-6 mx-auto w-[800px]">

                                                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-green-50 outline-none focus:outline-none">

                                                                        <div className="flex items-start justify-between p-5 ">
                                                                            <h3 className="text-3xl font-semibold text-black">
                                                                                Edit
                                                                            </h3>
                                                                            <button
                                                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                                onClick={() => { setShowEditSPlantSFacModal(false) }}
                                                                            >
                                                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                                    ×
                                                                                </span>
                                                                            </button>
                                                                        </div>

                                                                        <div className="mb-4 mt-2">
                                                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[-660px]">
                                                                                Description:
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                id="description"
                                                                                name="description"
                                                                                value={formData.description}
                                                                                onChange={handleChangeCreate}
                                                                                className="mt-1 ml-[-10px] p-2 border border-gray-300 rounded-md w-[740px] h-[35px] text-black"
                                                                            />
                                                                        </div>
                                                                        <div className="mb-4 mt-2">
                                                                            <label htmlFor="system" className="block text-sm font-medium text-gray-700 ml-[-690px]">
                                                                                System:
                                                                            </label>
                                                                            <select
                                                                                //type="text"
                                                                                id="system"
                                                                                name="system"
                                                                                value={formData.system}
                                                                                onChange={handleChangeCreate}
                                                                                //value={system}
                                                                                //onChange={(e) => setName(e.target.value)}
                                                                                className="mt-1 ml-[-10px] p-1 border border-gray-300 rounded-md w-[740px] h-[35px] text-black"
                                                                            >
                                                                                <option value="primary">primary</option>
                                                                            </select>
                                                                        </div>

                                                                        <div className="flex items-center justify-end p-6">
                                                                            <button
                                                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 h-10"
                                                                                type="button"
                                                                                onClick={() => setShowEditSPlantSFacModal(false)}
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                            <button
                                                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                type="button"
                                                                                onClick={handleEditSubmit}
                                                                            // onClick={() => {
                                                                            //     handleUpdateConfirmationView();

                                                                            // }}
                                                                            >
                                                                                Update
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                                        </div>

                                                        {/* {showUpdateConfirmation && (

                                                            <div className="absolute z-50 bg-white" style={{ border: '2px solid rgb(65,73,115)' }}>
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
                                                                        onClick={() => {

                                                                            handleEditSubmit();
                                                                        }}
                                                                    >
                                                                        Confirm Update
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )} */}
                                                    </>
                                                ) : null}

                                                <div onClick={() => navigate(`/asset/${item?.name}/${plantId}`)} className="font-semibold bg-[rgb(55,115,202)] rounded-xl w-[150px] h-[110px] text-[15px] mt-2 flex flex-col items-center justify-center cursor-pointer">
                                                    <p className="m-0 text-white  text-[17px] ml-10 ">{item?.name?.split(" ")[0]}</p>
                                                    {item?.name?.split(" ")[1] !== "" && item?.name?.split(" ")[2] !== "" && <p className="m-0 text-white text-[17px] mb-4  ml-10">{item?.name?.split(" ")[1]} {item?.name?.split(" ")[2]}</p>}

                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>)}


        </div>
    )
}

export default AssetsComponenet;