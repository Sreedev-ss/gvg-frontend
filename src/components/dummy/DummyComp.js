import React, { useEffect, useState } from 'react'
import { instance } from '../../api';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { useHierarchy } from '../../context/HierarchyContext';
import './Dummy.scss';
import './Dummy.css';
import Draggable from 'react-draggable';
import { CiFilter } from "react-icons/ci";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DummyComp = () => {
    const [loading, setLoading] = useState(null);
    const { hierarchicalPath, updatePath, selectedItemId, updateParent, updateLevel, level, parentid } = useHierarchy();
    const [selectedItems, setSelectedItems] = useState([]);
    const [drillDownData, setDrillDownData] = useState([]);
    const [parentName, setParentName] = useState('');
    const [grandparentName, setGrandparentName] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedSystem, setSelectedSystem] = useState('Primary');
    const [showDropDownSPlantSFac, setShowDropDownSPlantSFac] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditSPlantSFacModal, setShowEditSPlantSFacModal] = useState(false);
    const [selectedEditSystem, setSelectedEditSystem] = useState('Primary');
    const [parent, setParent] = useState(null)
    // const [level, setLevel] = useState(1)
    const [useEffectCall, setUseEffectCall] = useState(false)
    const [exportData, setExportData] = useState([]);
    const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
    const [filterTerm, setFilterTerm] = useState('');
    const [mainRegion, setMainRegion] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        system: 'primary',
        parent: ''
    })

    const [deleteModal, setDeleteModal] = useState({})
    const handleDeleteModalView = (itemId) => {
        setDeleteModal(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }))
    }

    const handlePlusSPlantSFacClick = (itemId) => {
        setShowDropDownSPlantSFac(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }));
    }

    useEffect(() => {
        console.log(selectedItemId)
        if (selectedItemId != null) {
            fetchData(selectedItemId)
        }

    }, [selectedItemId]);

    useEffect(() => {
        const fetchDataAndSetMainRegion = async () => {
            // Fetch initial data when the component mounts
            try {
                const data = await fetchData("657d9cc91a95c5b61f5d90b5"); // Fetch top-level data
                setMainRegion(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle the error, e.g., show an error message or log it
            }
        };

        fetchDataAndSetMainRegion(); // Invoke the async function

    }, []);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            parent: parent
        }))
    }, [parent])
    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            parent: parentid
        }))
    }, [parentid])

    const fetchData = async (parentId) => {
        try {
            setLoading(true);
            const response = await instance.get(`/assets/children/${parentId}`);
            setDrillDownData(response.data);

            if (parentId !== 'null') {
                const parentResponse = await instance.get(`/assets/asset/${parentId}`);

                setParentName(parentResponse.data);
                updateParent(parentResponse.data._id)
                updateLevel(parentResponse.data.level + 1)

                // If the _id exists, slice the array up to that index (exclusive)
                // If it doesn't exist, add the new object to the path
                updatePath((prevPath) => {
                    const existingIndex = prevPath.findIndex(item => item._id === parentResponse.data?._id);

                    if (existingIndex !== -1) {
                        return prevPath.slice(0, existingIndex + 1);
                    } else {
                        // Check if there are existing items with the same level
                        const itemsWithSameLevel = prevPath.filter(item => item.level === parentResponse.data?.level);

                        if (itemsWithSameLevel.length > 0) {
                            // Remove all items with the same level
                            const newPath = prevPath.filter(item => item.level !== parentResponse.data?.level);
                            // Add the new object
                            return [...newPath, { _id: parentResponse.data?._id, name: parentResponse.data?.name, level: parentResponse.data?.level }];
                        } else {
                            return [...prevPath, { _id: parentResponse.data?._id, name: parentResponse.data?.name, level: parentResponse.data?.level }];
                        }
                    }
                });

                if (parentResponse.data.parent !== null) {
                    const grandparentResponse = await instance.get(`/assets/asset/${parentResponse.data.parent}`);
                    setGrandparentName(grandparentResponse.data);
                } else {
                    setGrandparentName('');
                }
            } else {
                // Reset names for top-level data
                setParentName('');
                setGrandparentName('');
            }

            return response.data

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const handleItemClick = (itemId, level, parentId) => {
        // setLevel(level + 1)
        // // Update the selected items array based on user clicks
        // const updatedItems = selectedItems.slice(0, level);
        // updatedItems[level] = itemId;
        // setSelectedItems(updatedItems);
        setParent(itemId)

        // Fetch data for the next level based on the selected items
        fetchData(itemId);
    };

    const handleSystemChange = (e) => {
        setSelectedSystem(e.target.value);
    };

    const handleSystemEditChange = (e) => {
        setSelectedEditSystem(e.target.value);
    };

    const handleChangeCreate = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    };

    const handleUpdateCloseModal = () => {
        setShowEditSPlantSFacModal(false)
    }

    const handleUpdateConfirmationView = () => {
        setShowUpdateConfirmation(true);
    };


    const handleUpdateConfirmationClose = () => {
        setShowUpdateConfirmation(false);
    };


    const handleCreate = (e) => {
        e.preventDefault();

        if (formData.name === "" || formData.description === "" || formData.system === "") {
            console.log('Fill data')
        } else {
            console.log(level)
            instance.post(`/assets/addAsset/${level}`, formData).then((res) => {
                toast.success("Created successfully");
                console.log(res)
                setFormData({
                    name: '',
                    description: '',
                    system: 'primary',
                    parent: parent
                })
                fetchData(res.data?.parent)
            }).catch((err) => {
                console.log(err)
            })
            setShowAddModal(false)
        }

    }

    const handleDelete = (id, parent) => {
        instance.delete(`/assets/deleteAsset/${id}`).then((res) => {
            toast.success("Deleted successfully");
            fetchData(parent)
            setShowDeleteModal(false)

        }).catch((err) => {
            console.log(err)
        })
    }

    const handleEditSubmit = () => {
        console.log(formData)
        instance.put(`/assets/editAsset/${formData._id}`, formData).then((res) => {
            toast.success("Edited successfully");
            console.log(res)
            setFormData({
                name: '',
                description: '',
                system: 'primary',
                parent: ''
            })
            handlePlusSPlantSFacClick(res.data._id)

            fetchData(res.data?.parent)
            setShowEditSPlantSFacModal(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleDuplicate = (id) => {
        instance.post(`/assets/duplicate/${id}`).then((res) => {
            toast.success("Cloned successfully");
            fetchData(parent)
            handlePlusSPlantSFacClick(id)
        }).catch((err) => {
            console.log(err)
        })
    };
    const handleFilterChange = (event) => {
        setFilterTerm(event.target.value);
    };

    // const filteredData = drillDownData.filter((item) => {
    //     return item.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
    //            item.description.toLowerCase().includes(filterTerm.toLowerCase());
    // });

    const handleFetchData = (id) => {
        if (id !== null) {
            fetchData(id)
        }
    }

    return (
        <>
            <div className="bg-white p-4 h-[89.4vh] rounded-lg shadow-md">
                <ToastContainer />

                <div className="w-[96%] h-[94%] bg-[rgb(235,245,244)] m-6 rounded-2xl" style={{ border: '2px solid rgb(65,73,115)' }}>
                    <CiFilter className='ml-[98%] m-4' />

                    {/* <div className='flex items-end justify-end'>
                    <button className="rounded-21xl flex items-center justify-center py-2.5 px-5 gap-[9px] text-[10px] text-white  cursor-pointer text-center rounded  bg-blue-800 border-blue-800  ">
                        <CiImport />Import
                    </button>
                    <button className="rounded-21xl flex items-center justify-center py-2.5 px-5 gap-[9px] text-center text-[10px] text-white cursor-pointer rounded  bg-blue-800 border-blue-800 mt-4"
                        onClick={handleExport}
                    >
                        <CiExport />Export
                    </button>
                </div> */}
                    {loading ? (
                        <div className="flex justify-center items-center h-[80%]">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid">

                            </div>
                        </div>
                    ) : (
                        <div className='mt-4 h-[40%]'>
                            {grandparentName && grandparentName?.name?.length === 1 ? (
                                <b className="text-2xl cursor-pointer flex items-center justify-center" onClick={() => handleFetchData(grandparentName?.parent)}>
                                    {grandparentName?.description?.slice(0, 35)}
                                </b>
                            ) : (
                                <b className="text-2xl cursor-pointer flex items-center justify-center" onClick={() => handleFetchData(grandparentName?.parent)}>
                                    {grandparentName?.name && grandparentName?.name + ' - '}{grandparentName?.description?.slice(0, 35)}
                                </b>
                            )}
                            <div className='flex flex-col items-center justify-center mt-4 relative'>
                                {parentName?.name && level !== 2 ? (
                                    <div className="rounded-6xl  py-2 px-[15px] box-border rounded-2xl w-[400px]" onClick={() => handleFetchData(parentName?.parent)}>
                                        <div>
                                            <p className="m-0 text-black justify-center items-center flex font-semibold">{parentName?.name?.length !== 1 && parentName?.name}</p>
                                            <p className="m-0 text-black justify-center items-center flex font-semibold">{parentName?.description?.slice(0, 35)}</p>
                                        </div>
                                    </div>
                                ) :
                                    <div className="rounded-6xl flex justify-evenly py-2 px-[15px] box-border rounded-2xl w-[400px]" >
                                        {mainRegion && mainRegion.map((item, index) => (<div key={index} onClick={() => fetchData(item._id)} style={{ backgroundColor: parentName?.name?.trim() == item?.name?.trim() ? 'rgb(215,235,230)' : '', border: parentName?.name?.trim() == item?.name?.trim() ? '2px solid rgb(77,164,164)' : '', borderRadius: parentName?.name?.trim() == item?.name?.trim() ? '7px' : '', padding: '3px' }}>
                                            <p className="m-0 text-black justify-center items-center flex font-semibold">{item?.name?.length !== 1 && item?.name}</p>
                                            <p className="m-0 text-black justify-center items-center flex font-semibold">{item?.description?.slice(0, 35)}</p>
                                        </div>))}
                                    </div>
                                }
                                <div className='w-[98%] '>
                                    <div className="text-center text-xl text-white bg-[rgb(215,235,230)] rounded-2xl mt-[20px] h-[50vh] overflow-y-auto py-[12px] px-[5px]" style={{ border: '2px solid rgb(77,164,164)' }}>
                                        <div className="cursor-pointer flex items-end justify-end">
                                            {level > 1 && <CiCirclePlus className="text-slate-950 font-bold text-[20px]" onClick={() => setShowAddModal(true)} />}
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
                                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[-660px]">
                                                                        Name:
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="name"
                                                                        name="name"
                                                                        value={formData.name}
                                                                        onChange={handleChangeCreate}
                                                                        className="mt-1 ml-[-10px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px] text-black"
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
                                                                        value={formData.description}
                                                                        onChange={handleChangeCreate}
                                                                        className="mt-1 ml-[-10px] p-2 border border-gray-300 rounded-md w-[735px] h-[35px] text-black"
                                                                    />
                                                                </div>


                                                                <div className="mb-4 mt-2">
                                                                    <label htmlFor="system" className="block text-sm font-medium text-gray-700 ml-[-690px]">
                                                                        System:
                                                                    </label>
                                                                    <select
                                                                        id="system"
                                                                        name="system"
                                                                        value={formData.system}
                                                                        onChange={handleChangeCreate}
                                                                        //value={system}
                                                                        //onChange={(e) => setName(e.target.value)}
                                                                        className="mt-1 ml-[-10px] p-1 border border-gray-300 rounded-md w-[735px] h-[35px] text-black"
                                                                    >
                                                                        <option value="primary">primary</option>
                                                                        {/* <option value="primary">Primary</option> */}
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

                                        <div className="flex flex-wrap justify-center items-center gap-4">
                                            {drillDownData.map((item) => (
                                                <div key={item._id}>
                                                    <Draggable key={item._id}>
                                                        <div key={item._id} className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 mt-2"
                                                        >

                                                            <div className="relative w-[250px] h-[150px] mt-3 cursor-pointer">
                                                                {/* <input
                                                        type="text"
                                                        value={filterTerm}
                                                        onChange={handleFilterChange}
                                                        placeholder="Filter by name or description"
                                                        className="p-2 border rounded-md"
                                                    />
                                                     {filteredData.map((item) => (
                                                        <div key={item._id}>
                                                            
                                                        </div>))} */}
                                                                <div
                                                                    className="flex justify-center items-center bg-[#3773ca] rounded-xl font-light w-full h-full text-[15px]"

                                                                >
                                                                    <div className="font-semibold text-[15px] overflow-hidden" onClick={() => handleItemClick(item._id, item.level, item.parent)}>
                                                                        <p className="m-0 text-white mt-3 ">{item.name}</p>
                                                                        <p
                                                                            className="m-0 text-white whitespace-nowrap mb-3 overflow-ellipsis"
                                                                            style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}
                                                                        >
                                                                            {item.description}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                {level > 1 && <div
                                                                    className="absolute top-0 right-0 p-2 text-slate-400 cursor-pointer "
                                                                    onClick={() => handlePlusSPlantSFacClick(item._id)}
                                                                >
                                                                    <BsThreeDots className="font-lighter text-[20px]" />
                                                                </div>}

                                                                {showDropDownSPlantSFac[item._id] && (
                                                                    <div className="text-slate-400  absolute top-0 right-0 mt-8 mr-2 dropContent show">
                                                                        {/* <div className="dropdown"> */}
                                                                        <p className="m-0  whitespace-nowrap cursor-pointer p-tooltip" onClick={() => handleDeleteModalView(item._id)}
                                                                            style={{ '--i': 0 }}
                                                                        >
                                                                            <MdDeleteOutline />
                                                                            <span className="tooltip">Delete</span>
                                                                        </p>
                                                                        <p className="m-0  whitespace-nowrap cursor-pointer p-tooltip" onClick={() => { setShowEditSPlantSFacModal(true); setFormData(item); }}
                                                                            style={{ '--i': 1 }}
                                                                        >
                                                                            <CiEdit className='mt-2' />
                                                                            <span className="tooltip">Edit</span>
                                                                        </p>
                                                                        <p className="m-0  whitespace-nowrap cursor-pointer p-tooltip" onClick={() => handleDuplicate(item._id)}
                                                                            style={{ '--i': 2 }}
                                                                        >
                                                                            <HiOutlineDocumentDuplicate className='mt-2' />
                                                                            <span className="tooltip">Duplicate</span>
                                                                        </p>
                                                                        {/* </div> */}
                                                                    </div>
                                                                )}
                                                            </div>


                                                            {/* <div className=" font-light relative flex justify-center items-center bg-blue-800 rounded-xl w-[250px] h-[150px] text-[15px] mt-3 cursor-pointer">
                                                            <div className="absolute top-0 right-0 p-2 text-slate-500 cursor-pointer" onClick={() => handlePlusSPlantSFacClick(item._id)}>
                                                                <CiCirclePlus className="font-lighter text-[20px]" />
                                                            </div>
                                                            {showDropDownSPlantSFac[item._id] && (
                                                                <div className={`dropdown ${showDropDownSPlantSFac ? 'visible' : 'hidden'}`} >
                                                                    <p className="m-0 text-white whitespace-nowrap mt-3 cursor-pointer " onClick={() => handleDeleteModalView(item._id)}><MdDeleteOutline /></p>


                                                                    <p className="m-0 text-white whitespace-nowrap mt-3 cursor-pointer" onClick={() => { setShowEditSPlantSFacModal(true); setFormData(item); }}><CiEdit /></p>


                                                                    <p className="m-0 text-white whitespace-nowrap mt-3 cursor-pointer" onClick={() => handleDuplicate(item._id)}><HiOutlineDocumentDuplicate /></p>

                                                                </div>
                                                            )}
                                                            
                                                            {!showDropDownSPlantSFac[item._id] && (
                                                                <>
                                                                    <div className=" font-semibold text-[15px] overflow:hidden" onClick={() => handleItemClick(item._id, item.level, item.parent)}>
                                                                        <p className="m-0 text-white mt-3 ">{item.name}</p>
                                                                        <p className="m-0 text-white whitespace-nowrap mb-3 overflow-ellipsis" style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>{item.description}</p>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div> */}
                                                        </div>
                                                    </Draggable>
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
                                                                                    onClick={() => handleDelete(item._id, item.parent)}
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
                                                            <div className={`bg-slate-900 z-50 ${showUpdateConfirmation ? 'modal-overlay' : ''}`}>
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
                                                                            <div className="mb-4">
                                                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-[-690px]">
                                                                                    Name:
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    id="name-1"
                                                                                    name="name"
                                                                                    value={formData.name}
                                                                                    onChange={handleChangeCreate}
                                                                                    className="mt-1 ml-[-10px] p-2 border border-gray-300 rounded-md w-[740px] h-[35px] text-black"
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

                                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white ml-[-138px]" style={{ border: '2px solid rgb(65,73,115)' }}>
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
                                                                                handleUpdateConfirmationClose();
                                                                                handleEditSubmit();
                                                                            }}
                                                                        >
                                                                            Confirm Update
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : null}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DummyComp
