import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { instance } from "../../api";

const AssetsComponenet = ({ plantId }) => {
    const navigate = useNavigate()
    const [asset, setAsset] = useState([])
    const [loading, setLoading] = useState(false)
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

    return (

            <div className="bg-white p-4 h-[89.4vh] rounded-lg shadow-md main-container">
                <div className="top-0 left-0 m-4 cursor-pointer">
                    <Link to='/'>
                        <FaArrowLeft className="text-slate-500 font-lighter text-[20px]" />
                    </Link>
                </div>
                {loading && <div className="h-[78%] max-h-[80%]  m-6 rounded-2xl" style={{ border: '2px solid rgb(17,110,255)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <div className="cursor-pointer flex items-end justify-end m-4">
                        <CiCirclePlus className="text-slate-950 font-bold text-[20px]" />
                    </div>
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

                                        {/* <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[-40%] mt-2">
                                        <div className="font-semibold bg-[rgb(55,115,202)] rounded-xl w-[200px] h-[100px] text-[15px] mt-14 flex items-center justify-center">
                                            <p className="m-0 text-white mt-[-20px]">West</p>
                                            <p className="m-0 text-white mt-8 ml-[-45px]">Assets</p>

                                        </div>
                                    </div>

                                </div>
                                <div className="flex">
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[1%] mt-2">
                                        <div className="font-semibold bg-[rgb(55,115,202)] rounded-xl w-[200px] h-[100px] text-[15px] mt-[-1px] flex items-center justify-center">
                                            <p className="m-0 text-white mt-[-20px]  ">North</p>
                                            <p className="m-0 text-white mt-8 ml-[-47px]">Assets</p>

                                        </div>
                                    </div>
                                    <div className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden shrink-0 ml-[-40%] mt-2">
                                        <div className="font-semibold bg-[rgb(55,115,202)] rounded-xl w-[200px] h-[100px] text-[15px]  mt-[-1px] flex items-center justify-center">
                                            <p className="m-0 text-white mt-[-20px]  ">South</p>
                                            <p className="m-0 text-white mt-8 ml-[-46px]">Assets</p>

                                        </div>
                                    </div> */}

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>}

            </div>

    )
}

export default AssetsComponenet;