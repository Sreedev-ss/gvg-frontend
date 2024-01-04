import React, { useRef, useState } from 'react'
// import './Sidebar.scss',
import { GiPathDistance } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosPlay } from "react-icons/io";
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { HiBuildingLibrary } from "react-icons/hi2";
import { SiGoogleanalytics } from "react-icons/si";
import Papa from 'papaparse';
import { instance } from '../../api';
import { useHierarchy } from '../../context/HierarchyContext';
import './AdminSidebar.css';
import { FaRegUser } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminSidebar = () => {
    const [loading, setLoading] = useState(false);
    const { hierarchicalPath, selectItem, parentid, level } = useHierarchy();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/authentication/login')
    }

    const handleExport = () => {
        const fields = ['name', 'description', 'system', 'parent', 'level'];

        try {
            //setLoading(true)
            const exportedData = [];
            instance.get(`/assets/allAsset`).then((res) => {
                toast.success("Exported Successfully");
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
            }).catch(err => {
                console.log(err);
                //setLoading(false);
            })
            function flattenHierarchy(item, exportedData) {
                exportedData.push({
                    name: item.name,
                    description: item.description,
                    system: item.system,
                    parent: item.parent,
                    level: item.level
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
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: (result) => {
                const parsedData = result?.data;

                const extractedData = parsedData.map((item) => ({
                    name: item.name,
                    description: item.description,
                    system: item.system,
                    parent: item.parent,
                    level: item.level
                }));

                extractedData.forEach((element, index) => {
                    instance.post(`/assets/addAssetImport`, element).then((res) => {
                        if (res.data) {
                            console.log(res.data)
                            handleLiClick("657d9cc91a95c5b61f5d90b5")
                        } else {
                            console.log('Error adding data')
                        }
                    }).catch((err) => {
                        console.log(err)
                    }).finally(() => {
                        toast.success("Imported Successfully");
                        window.location.reload()
                    })
                })
            }
        });

    };

    const handleImportButtonClick = () => {
        // Trigger click event of the hidden input element
        fileInputRef.current.click();
    };

    return (
        
        <aside className="bg-white overflow-hidden text-white py-5 rounded-lg mr-4 w-60 sidebar-container flex flex-col justify-between items-center bg-bottom">
            {/* <ToastContainer /> */}
            <div>
                <Link to='/'>
                    <div className=" font-bold text-[25px]  text-[rgb(157,49,113)] flex justify-center items-center">
                        GVG - Plant
                    </div>
                </Link>
                <div className=" font-bold text-[15px]  text-[rgb(157,49,113)] flex justify-center items-center">
                    Admin Dashboard
                </div>

                <div className='mt-10'>
                    <Link to='/'>
                        <div className=" text-zinc-900 text-[14px] flex items-start justify-start">
                            <HiBuildingLibrary style={{ marginRight: '8px', marginTop: '4px' }} />
                            Dashboard
                        </div>
                    </Link>
                    <div className="mt-5 text-zinc-900 text-[14px] cursor-pointer flex items-start justify-start">
                        <SiGoogleanalytics style={{ marginRight: '8px', marginTop: '4px' }} />
                        Reporting & Analytics
                    </div>
                    <Link to='/user'>
                        <div className="mt-5 text-zinc-900 text-[14px] cursor-pointer flex items-start justify-start">
                            <FaRegUser style={{ marginRight: '8px', marginTop: '4px' }} />
                            Users
                        </div>
                    </Link>
                </div>
            </div>
            <div>
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <button className="rounded-31xl flex items-center justify-center py-2.5 px-5 gap-[9px] text-[14px] text-white  cursor-pointer text-center rounded  bg-[rgb(254,0,144)] border-[rgb(254,0,144)] hover:bg-[rgb(254,116,194)]  "
                        onClick={handleImportButtonClick}>

                        <CiImport />Import
                    </button>
                </div>
                <button className="rounded-31xl flex items-center justify-center py-2.5 px-5 gap-[9px] text-center text-[14px] text-white cursor-pointer rounded  bg-[rgb(254,0,144)] border-[rgb(254,0,144)] hover:bg-[rgb(254,116,194)] mt-4"
                    onClick={handleExport}
                >
                    {loading ? (
                        <div className="flex justify-center items-center h-[80%]">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid">

                            </div>
                        </div>
                    ) : (
                        <>
                            <CiExport />Export
                        </>
                    )}
                </button>

                <div className=''>
                    <div className="mt-16 text-zinc-900 text-[14px] cursor-pointer flex items-center justify-center">
                        <IoMdSettings style={{ marginRight: '10px' }} />
                        Settings
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
