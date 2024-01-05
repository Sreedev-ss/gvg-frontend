import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { instance } from "../../api";
import { useHierarchy } from "../../context/HierarchyContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssetsComponenet = ({ plantId }) => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [asset, setAsset] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const {  parentid } = useHierarchy();
    const [formData, setFormData] = useState({
        description: '',
        system: 'primary',
        parent: id,
        plant: plantId
    })

    useEffect(() => {
        setLoading(false)
        instance.get(`/assets/children/null/${plantId}`).then((res) => {

            if (res.data.length == 0) {
                instance.get(`/assets/allAsset/${plantId}`).then((res) => {
                    if (res.data) {
                        navigate(`/asset/${res.data[0].parent}/${plantId}`)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                setLoading(true)
            }
            setAsset(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

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
                parent: parentid
            }
        ))
        setShowAddModal(true)
    }

    return (

            <div className="bg-white p-4 h-[89.4vh] rounded-lg shadow-md main-container">
                <ToastContainer/>
                <div className="top-0 left-0 m-4 cursor-pointer">
                    <Link to='/'>
                        <FaArrowLeft className="text-slate-500 font-lighter text-[20px]" />
                    </Link>
                </div>
                {loading && <div className="h-[78%] max-h-[80%]  m-6 rounded-2xl" style={{ border: '2px solid rgb(17,110,255)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <div className="cursor-pointer flex items-end justify-end m-4">
                        <CiCirclePlus className="text-slate-950 font-bold text-[20px]" onClick={handleCreateView} />
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
                                                    //onClick={handleCreate}
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
                        <div className='flex items-center justify-center'>
                            <div className=' mt-0 left-0 top-60'>
                                <div className="text-center text-xl text-white ">
                                    <div className={`grid ${asset.length == 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-5`}>
                                        {asset.map((item, index) => (
                                            <div key={index} className="rounded-6xl bg-cornflowerblue overflow-hidden" onClick={() => navigate(`/asset/${item?.name}/${plantId}`)}>
                                                <div className="font-semibold bg-[rgb(55,115,202)] rounded-xl w-[200px] h-[100px] text-[15px] mt-14 flex flex-col items-center justify-center">
                                                    <p className="m-0 text-white  ">{item?.name?.split(" ")[0]}</p>
                                                    {item?.name?.split(" ")[1] !== "" && <p className="m-0 text-white  ">{item?.name?.split(" ")[1]}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                }

            </div>
    )
}

export default AssetsComponenet;