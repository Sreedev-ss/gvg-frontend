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

import Draggable from 'react-draggable';


const DummyComp = () => {
    const { hierarchicalPath, updatePath, selectedItemId, updateParent, updateLevel } = useHierarchy();
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
    const [level, setLevel] = useState(0)
    const [useEffectCall, setUseEffectCall] = useState(false)
    const [exportData, setExportData] = useState([])

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        system: 'primary',
        parent: ''
    })
    //TODO - i) Set this function in sidebar. ii) call drill-asset api and recursely push all data into exportedData


    // const handleExport = () => {
    //     const fields = ['name', 'description', 'system']; 

    //     try {
    //       const csv = Papa.unparse({
    //         fields: fields,
    //         data: drillDownData,
    //       });
    //       console.log("drillll:",drillDownData);

    //       const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    //       const link = document.createElement('a');
    //       const url = URL.createObjectURL(blob);

    //       link.href = url;
    //       link.setAttribute('download', 'exported_data.csv');
    //       document.body.appendChild(link);
    //       link.click();
    //       document.body.removeChild(link);
    //     } catch (error) {
    //       console.error('Error exporting data:', error);
    //     }
    //   };

    const handlePlusSPlantSFacClick = (itemId) => {
        setShowDropDownSPlantSFac(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }));
    }

    useEffect(() => {

        if (selectedItemId != null) {
            fetchData(selectedItemId)
        }

    }, [selectedItemId]);

    useEffect(() => {
        // Fetch initial data when the component mounts
        fetchData("657d9cc91a95c5b61f5d90b5"); // Fetch top-level data

    }, []);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            parent: parent
        }))
    }, [parent])

    const fetchData = async (parentId) => {
        try {
            const response = await instance.get(`/assets/children/${parentId}`);
            setDrillDownData(response.data);

            if (parentId !== 'null') {
                const parentResponse = await instance.get(`/assets/asset/${parentId}`);
                setParentName(parentResponse.data);
                updateParent(parentResponse.data._id)
                updateLevel(parentResponse.data.level)
                const existingIndex = hierarchicalPath.findIndex(item => item._id === parentResponse.data?._id);

                // If the _id exists, slice the array up to that index (exclusive)
                // If it doesn't exist, add the new object to the path
                updatePath((prevPath) => {
                    if (existingIndex !== -1) {
                        return prevPath.slice(0, existingIndex + 1);
                    } else {
                        return [...prevPath, { _id: parentResponse.data?._id, name: parentResponse.data?.name }];
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

        } catch (error) {
            console.log(error)
        }
    };

    const handleItemClick = (itemId, level, parentId) => {
        setLevel(level + 1)
        // Update the selected items array based on user clicks
        const updatedItems = selectedItems.slice(0, level);
        updatedItems[level] = itemId;
        setSelectedItems(updatedItems);
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
    }


    const handleCreate = (e) => {
        e.preventDefault();
        console.log(level)

        if (formData.name === "" || formData.description === "" || formData.system === "") {
            console.log('Fill data')
        } else {
            instance.post(`/assets/addAsset/${level}`, formData).then((res) => {
                console.log(res)
                setFormData({
                    name: '',
                    description: '',
                    system: 'primary',
                    parent: ''
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
            fetchData(parent)
            setShowDeleteModal(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleEditSubmit = () => {
        console.log(formData)
        instance.put(`/assets/editAsset/${formData._id}`, formData).then((res) => {
            console.log(res)
            setFormData({
                name: '',
                description: '',
                system: 'primary',
                parent: ''
            })
            fetchData(res.data?.parent)
            setShowEditSPlantSFacModal(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleDuplicate = (id) => {
        console.log(id)
        instance.post(`/assets/duplicate/${id}`).then((res) => {
            fetchData(parent)
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <div className="bg-white p-4 h-[89.4vh] rounded-lg shadow-md">
            <div className="w-[95%] h-[90%] bg-[rgb(235,245,244)] m-6 rounded-2xl" style={{ border: '2px solid rgb(65,73,115)' }}>
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
                <div className='mt-4'>
                    {grandparentName && grandparentName?.name?.length === 1 ? (
                        <b className="text-2xl cursor-pointer flex items-center justify-center" onClick={() => fetchData(grandparentName?.parent)}>
                            {grandparentName?.description?.slice(0, 35)}
                        </b>
                    ) : (
                        <b className="text-2xl cursor-pointer flex items-center justify-center" onClick={() => fetchData(grandparentName?.parent)}>
                            {grandparentName?.name && grandparentName?.name + ' - '}{grandparentName?.description?.slice(0, 35)}
                        </b>
                    )}
                    <div className='flex flex-col items-center justify-center mt-4 relative'>
                        {parentName?.name && (<div className="rounded-6xl  py-2 px-[15px] box-border bg-[rgb(215,235,230)] rounded-2xl w-[400px]" style={{ border: '2px solid rgb(77,164,164)' }} onClick={() => fetchData(parentName?.parent)}>
                            <p className="m-0 text-black justify-center items-center flex font-semibold">{parentName?.name?.length !== 1 && parentName?.name}</p>
                            <p className="m-0 text-black justify-center items-center flex font-semibold">{parentName?.description.slice(0, 35)}</p>
                        </div>)}
                        <div className=''>
                            <div className="text-center text-xl text-white bg-[rgb(215,235,230)] rounded-2xl  mt-[20px] w-[127vh] min-h-[54vh]" style={{ border: '2px solid rgb(77,164,164)', overflowY: 'auto', maxHeight: '54vh' }}>
                                <div className="cursor-pointer flex items-end justify-end">
                                    <CiCirclePlus className="text-slate-950 font-bold text-[20px]" onClick={() => setShowAddModal(true)} />
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
                                        <Draggable key={item._id}>
                                            <div key={item._id} className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden  shrink-0 mt-2"
                                            >

                                                <div className=" font-light relative flex justify-center items-center bg-blue-800 rounded-xl w-[300px] h-[150px] text-[15px] mt-3 cursor-pointer">
                                                    <div className="absolute top-0 right-0 p-2 text-blue-800  cursor-pointer" onClick={() => handlePlusSPlantSFacClick(item._id)}>
                                                        <BsThreeDots className="font-lighter text-[20px] hover:text-green-50" />
                                                    </div>
                                                    {showDropDownSPlantSFac[item._id] && (


                                                        <div className={`dropdown ${showDropDownSPlantSFac ? 'visible' : 'hidden'}`} >
                                                            <p className="m-0 text-white whitespace-nowrap mt-3 cursor-pointer " onClick={() => setShowDeleteModal(true)}><MdDeleteOutline /></p>
                                                            {showDeleteModal ? (
                                                                <>
                                                                    <div className="">
                                                                        <div
                                                                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                                        >
                                                                            <div className=" my-6 mx-auto">

                                                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-green-50 outline-none focus:outline-none">

                                                                                    <div className="flex items-start justify-between p-5 ">
                                                                                        <h3 className="text-3xl font-semibold text-black">
                                                                                            Delete
                                                                                        </h3>
                                                                                        <button
                                                                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                                            onClick={() => setShowDeleteModal(false)}
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
                                                                                            onClick={() => setShowDeleteModal(false)}
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

                                                            <p className="m-0 text-white whitespace-nowrap mt-3 cursor-pointer" onClick={() => { setShowEditSPlantSFacModal(true); setFormData(item); }}><CiEdit /></p>
                                                            {showEditSPlantSFacModal ? (
                                                                <>
                                                                    <div className="bg-slate-900">
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
                                                                                            className="mt-1 ml-[-10px] p-2 border border-gray-300 rounded-md w-[740px] h-[35px] text-black"
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
                                                                                        >
                                                                                            Update
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                                                    </div>
                                                                </>
                                                            ) : null}

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
                                                    {/* <p className="m-0 text-white ">BULID</p>
                                    <p className="m-0 text-white mb-3 ">Bulidings</p> */}
                                                </div>
                                            </div>
                                        </Draggable>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DummyComp
