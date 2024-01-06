import React, { useEffect, useRef, useState } from 'react'
// import './Sidebar.scss',
import { GiPathDistance } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosPlay } from "react-icons/io";
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { Dialog } from '@headlessui/react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { HiBuildingLibrary } from "react-icons/hi2";
import { SiGoogleanalytics } from "react-icons/si";
import Papa from 'papaparse';
import { instance } from '../../api';
import { useHierarchy } from '../../context/HierarchyContext';
import './AdminSidebar.css';
import { FaRegUser } from "react-icons/fa";
import readXlsxFile from 'read-excel-file';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgProfile } from "react-icons/cg";

const AdminSidebar = () => {
    const [loading, setLoading] = useState(false);
    const { hierarchicalPath, selectItem, parentid, level } = useHierarchy();
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [importFile, setImportFile] = useState(null)
    const [plants, setPlants] = useState([])
    const [userData, setUserData] = useState(JSON?.parse(localStorage?.getItem("loginData")))
    const role = userData.role ? userData.role:''
    const [selectedPlant, setSelectedPlant] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    })

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                const response = await instance.get('/plants/all-plant')
                setPlants(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchPlant()
    }, [])
    const handleLogout = () => {
        localStorage.removeItem("loginData")
        navigate('/authentication/login')
    }

    const handleExport = () => {
        const fields = ['Location', 'Description', 'System', 'Parent', 'Level'];

        try {
            //setLoading(true)
            const exportedData = [];
            instance.get(`/assets/allAsset/${selectedPlant}`).then((res) => {
                res.data.forEach(async (item) => {
                    await flattenHierarchy(item, exportedData);
                });
                const csv = Papa.unparse({
                    fields: fields,
                    data: exportedData,
                });

                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);

                link.href = url;
                link.setAttribute('download', 'exported_asset_data.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setOpen(false)
            }).catch(err => {
                console.log(err);
                //setLoading(false);
            })
            function flattenHierarchy(item, exportedData) {
                exportedData.push({
                    Location: item.name,
                    Description: item.description,
                    System: item.system,
                    Parent: item.parent,
                    Level: item.level
                });

                if (item.children && item.children.length > 0) {
                    item.children.forEach((child) => {
                        flattenHierarchy(child, exportedData);
                    });
                }
            }
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    const handleLiClick = (id) => {
        selectItem(id)
    }

    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImportFile(file)
    };

    const handleImportButtonClick = () => {
        // Trigger click event of the hidden input element
        fileInputRef.current.click();
    };

    const handleCreateView = () => {
        setFormData({
            name: '',
            description: '',

        })
        setImportFile(null)
        setShowAddModal(true)
    };

    const handleCreate = (e) => {
        e.preventDefault();

        if (formData.name === "" || formData.description === "" || importFile == null) {
            console.log('Fill data')
        } else {
            setLoading(true)
            instance.post(`/plants/create-plant`, formData).then((res) => {
                toast.success("Created successfully");
                console.log(res.data)
                Papa.parse(importFile, {
                    header: true,
                    dynamicTyping: true,
                    complete: (result) => {
                        const parsedData = result?.data;
                        const extractedData = parsedData.map((item) => ({
                            name: item.Location,
                            description: item.Description,
                            system: item.System,
                            parent: item.Parent,
                            level: item.Level,
                            plant: res.data.plant._id
                        }));

                        console.log(extractedData)

                        // extractedData.forEach((element, index) => {
                        instance.post(`/assets/addAssetImport`, extractedData).then((res) => {

                            if (res.data) {
                                console.log(res.data)
                                setLoading(false)
                                setShowAddModal(false)
                                setFormData({
                                    name: '',
                                    description: '',
                                })

                                // handleLiClick("657d9cc91a95c5b61f5d90b5")
                            } else {
                                console.log('Error adding data')
                            }
                            window.location.reload()
                        }).catch((err) => {
                            console.log(err)
                        })
                        // })
                    }
                });
            }).catch((err) => {
                setLoading(false)
                window.location.reload()
                console.log(err)
            })

        }

    };
    const handleChangeCreate = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    };

    const handleChangeFile = (event) => {
        const file = event.target.files[0];
        const allowedTypes = ['text/csv'];
        if (file && allowedTypes.includes(file.type)) {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
        }
    };
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);
    const handleRadioChange = (id) => {
        setSelectedPlant(id)
    };
    const handleExportClose = () => {
        console.log("clicked");
        setOpen(false);
    }

    return (

        <aside className="bg-white overflow-hidden text-white py-5 rounded-lg mr-4 w-60 sidebar-container flex flex-col justify-between items-center bg-bottom ">
            {/* <ToastContainer /> */}

            <div>
                <Link to='/'>
                    <div className=" font-bold text-[25px]  text-[rgb(157,49,113)] flex justify-center items-center">
                        GVG - Plant
                    </div>
                </Link>
                {role == "admin" && <div className=" font-bold text-[15px]  text-[rgb(157,49,113)] flex justify-center items-center">
                    Admin Dashboard
                </div>}

                <div className='mt-10'>
                    <Link to='/'>
                        <div className=" text-zinc-900 text-[14px] flex items-start justify-start">
                            <HiBuildingLibrary style={{ marginRight: '8px', marginTop: '4px' }} />
                            Dashboard
                        </div>
                    </Link>
                    {role == "admin" &&
                        <>
                            <Link to='/reports'>
                                <div className="mt-5 text-zinc-900 text-[14px] cursor-pointer flex items-start justify-start">
                                    <SiGoogleanalytics style={{ marginRight: '8px', marginTop: '4px' }} />
                                    Reporting & Analytics
                                </div>
                            </Link>
                            <Link to='/user'>
                                <div className="mt-5 text-zinc-900 text-[14px] cursor-pointer flex items-start justify-start">
                                    <FaRegUser style={{ marginRight: '8px', marginTop: '4px' }} />
                                    Users
                                </div>
                            </Link>
                        </>}
                </div>
            </div>
            <div>
                {role == "admin" && <div>
                    <div>
                        {/* <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    /> */}
                        <button className="rounded-31xl flex items-center justify-center py-2.5 px-5 gap-[9px] text-[14px] text-white  cursor-pointer text-center rounded  bg-[rgb(254,0,144)] border-[rgb(254,0,144)] hover:bg-[rgb(254,116,194)]  "
                            //onClick={handleImportButtonClick}
                            onClick={handleCreateView}
                        >

                            <CiImport />Import
                        </button>

                        <Dialog
                            open={open}
                            onClose={() => setOpen(false)}
                            initialFocus={cancelButtonRef}
                        >
                            <div className="fixed inset-0 z-10 flex items-center justify-center">
                                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                                <div className="relative bg-white p-4 rounded-lg text-left shadow-xl w-96">
                                    <div className="flex items-center justify-between mb-4">
                                        <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                                            Select a plant
                                        </Dialog.Title>
                                        <button
                                            className="text-gray-500 hover:text-gray-700"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            <span className="sr-only">Close</span>
                                            <IoIosCloseCircleOutline className="h-6 w-6" />
                                        </button>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-500">
                                        <div className="w-full max-w-xs">
                                            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                                                {plants.length !== 0 && plants.map((item, index) => (
                                                    <div key={index} className="mb-4 flex items-center gap-2">
                                                        <label className="block text-gray-700 text-sm font-bold" htmlFor={`name-${index}`}>
                                                            {item.name}
                                                        </label>
                                                        <input
                                                            className=""
                                                            type="radio"
                                                            name="name"
                                                            id={`name-${index}`}
                                                            onChange={() => handleRadioChange(item._id)}
                                                        />
                                                    </div>
                                                ))}


                                            </form>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="mr-2 inline-flex justify-center px-4 py-2 text-sm font-semibold text-white bg-[rgb(133,160,238)] rounded-md hover:bg-[rgb(133,160,238)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                                            disabled={!selectedPlant}
                                            onClick={handleExport}
                                        >
                                            Export

                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                                            onClick={handleExportClose}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Dialog>

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
                                                        Import Plant
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
                                                <div>
                                                    <div>
                                                        <label htmlFor="csvFile" style={{ fontSize: '13px' }}>
                                                            Upload Your CSV File:
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center mt-2">
                                                        <input
                                                            type="file"
                                                            id="csvFile"
                                                            name="csvFile"
                                                            accept=".csv"
                                                            onChange={!loading ? handleFileChange : null}
                                                            className="hidden"
                                                        />
                                                        <label
                                                            htmlFor="csvFile"
                                                            className="cursor-pointer border border-gray-300 py-2 px-4 rounded-md bg-[rgb(183,211,249)] hover:bg-gray-100 ml-7"
                                                        >
                                                            Upload
                                                        </label>
                                                        {importFile && (
                                                            <div className="ml-3 text-gray-700">{importFile.name}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-end p-6">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 h-10"
                                                        type="button"
                                                        onClick={() => !loading ? setShowAddModal(false) : null}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="bg-[rgb(138,168,249)] text-white active:bg-[rgb(138,168,249)] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={!loading ? handleCreate : null}
                                                    //onClick={handleImportButtonClick}
                                                    >
                                                        {loading ?
                                                            <div className="flex justify-center items-center h-[80%]">
                                                                <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-white border-solid">

                                                                </div>
                                                            </div> : 'Import'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </div>
                            </>
                        ) : null}


                    </div>
                    <div>
                        <button className="rounded-31xl flex items-center justify-center py-2.5 px-5 gap-[9px] text-center text-[14px] text-white cursor-pointer rounded  bg-[rgb(254,0,144)] border-[rgb(254,0,144)] hover:bg-[rgb(254,116,194)] mt-4"
                            onClick={() => setOpen(true)}
                        >

                            <>
                                <CiExport />Export
                            </>

                        </button>
                    </div>
                </div>}

                <div className=''>
                    <div className="mt-16 text-zinc-900 text-[14px] cursor-pointer flex items-center justify-center">
                        <CgProfile style={{ marginRight: '10px' }} />
                        {userData?.name}
                    </div>
                    <div className="mt-4 text-zinc-900 text-[14px] cursor-pointer flex items-center justify-center" onClick={handleLogout}>
                        <IoIosLogOut style={{ marginRight: '10px' }} />
                        Logout
                    </div>
                </div>
            </div>
        </aside >

    )
}

export default AdminSidebar;
