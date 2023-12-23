import React, { useRef } from 'react'
// import './Sidebar.scss',
import { GiPathDistance } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosPlay } from "react-icons/io";
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import Papa from 'papaparse';
import { useHierarchy } from '../../context/HierarchyContext';
import { instance } from '../../api';

const Sidebar = () => {
    const { hierarchicalPath, selectItem, parentid, level } = useHierarchy();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("loginData");
        navigate('/authentication/login')
    }

    const linkStyle = {
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
    }

    const handleLiClick = (id) => {
        selectItem(id)
    }




    const handleExport = () => {
        const fields = ['name', 'description', 'system', 'parent', 'level'];

        try {
            const exportedData = [];
            instance.get(`/assets/drill-asset/${parentid}`).then((res) => {
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
                console.log(err)
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

    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const levelofAsset = parseInt(level + 1)
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
                    level:item.level
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
                    })
                })
            }
        });
        window.location.reload()
    };

    const handleImportButtonClick = () => {
        // Trigger click event of the hidden input element
        fileInputRef.current.click();
    };
    return (
        <aside className="bg-white p-4 text-white rounded-lg mr-4 w-60 flex flex-col justify-between">
            <div className='overflow-hidden'>
                <Link to='/'>
                    <div className=" font-bold text-[25px]  text-[rgb(157,49,113)] flex justify-center items-center">
                        GVG - Plant
                    </div>
                </Link>
                <div className="flex items-center mt-3">
                    <GiPathDistance className="text-black" />
                    <b className="text-[15px] underline text-black m-2">Path</b>
                </div>
                <div className="flex items-center text-[14px] mt-5 text-black">
                    {/* <IoIosPlay className="text-black" /> */}
                    {/* <Link to="/dashboardMain" style={linkStyle}>
                        East Assets
                    </Link> */}
                    <ul className="hierarchical-path">
                        {hierarchicalPath.map((pathItem, index) => (
                            <span key={index} style={{ marginLeft: `${index * 10}px` }} className={`flex items-center mt-2`}>
                                <IoIosPlay className={`text-black `} />
                                <li title={pathItem?.name} className='liPath w-28 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap' onClick={() => handleLiClick(pathItem?._id)} key={index} >{pathItem?.name}</li>
                            </span>
                        ))}
                    </ul>
                </div>
            </div>

            <div >
                <div className='ml-9'>
                    <div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <button className="rounded-31xl flex items-center justify-center py-2.5 px-5 gap-[9px] text-[14px] text-white  cursor-pointer text-center rounded  bg-blue-800 border-blue-800  "
                            onClick={handleImportButtonClick}
                        >
                            <CiImport />Import
                        </button>
                    </div>
                    <button className="rounded-31xl flex items-center justify-center py-2.5 px-5 gap-[9px] text-center text-[14px] text-white cursor-pointer rounded  bg-blue-800 border-blue-800 mt-4"
                        onClick={handleExport}
                    >
                        <CiExport />Export
                    </button>
                </div>
                {/* <div className='mt-10'>
                    <div className=" text-zinc-900 text-[14px] flex items-center justify-center">
                        <IoMdSettings style={{ marginRight: '10px', marginBottom: '-3px' }} />
                        Settings
                    </div>
                    <div className=" text-zinc-900 text-[14px] cursor-pointer flex items-center justify-center" onClick={handleLogout}>
                        <IoIosLogOut style={{ marginRight: '10px', marginBottom: '-3px' }} />
                        Logout
                    </div>
                </div> */}
            </div>
        </aside>
    )
}

export default Sidebar
