import React, { useEffect, useState } from 'react'
import { instance } from '../../api';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const DummyComp = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [drillDownData, setDrillDownData] = useState([]);
    const [parentName, setParentName] = useState('');
    const [grandparentName, setGrandparentName] = useState('');

    useEffect(() => {
        // Fetch initial data when the component mounts
        fetchData('null'); // Fetch top-level data
    }, []);

    const fetchData = async (parentId) => {
        try {
            const response = await instance.get(`/assets/children/${parentId}`);
            setDrillDownData(response.data);
            if (parentId !== 'null') {
                const parentResponse = await instance.get(`/assets/asset/${parentId}`);
                setParentName(parentResponse.data);

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

    const handleItemClick = (itemId, level) => {
        console.log('hi')
        // Update the selected items array based on user clicks
        const updatedItems = selectedItems.slice(0, level);
        updatedItems[level] = itemId;
        setSelectedItems(updatedItems);

        // Fetch data for the next level based on the selected items
        fetchData(itemId);
    };

    return (
        <div className="bg-white p-4 h-[89.4vh] rounded-lg shadow-md">
            <div className="top-0 left-0 m-4 cursor-pointer">
                <Link to='/assets' onClick={() => fetchData(parentName?.parent)}>
                    <FaArrowLeft className="text-slate-500 font-lighter text-[20px]" />
                </Link>
            </div>
            <div className="w-[95%] h-[90%] bg-[#ebf5f4] m-6 rounded-2xl" style={{ border: '2px solid rgb(65,73,115)'}}>
                <div className='mt-4'>
                    {grandparentName && grandparentName?.name?.length === 1 ? (
                        <b className="text-2xl cursor-pointer flex items-center justify-center" onClick={() => fetchData(grandparentName?.parent)}>
                            {grandparentName?.description?.slice(0,35)}
                        </b>
                    ) : (
                        <b className="text-2xl cursor-pointer flex items-center justify-center" onClick={() => fetchData(grandparentName?.parent)}>
                            {grandparentName?.name && grandparentName?.name + ' - '}{grandparentName?.description?.slice(0,35)}
                        </b>
                    )}
                    <div className='flex flex-col items-center justify-center mt-4 relative'>
                        {parentName?.name && (<div className="rounded-6xl  py-2 px-[15px] box-border bg-[rgb(215,235,230)] rounded-2xl w-[400px]" style={{ border: '2px solid rgb(77,164,164)'}} onClick={() => fetchData(parentName?.parent)}>
                            <p className="m-0 text-black justify-center items-center flex font-semibold">{parentName?.name?.length !== 1 && parentName?.name}</p>
                            <p className="m-0 text-black justify-center items-center flex font-semibold">{parentName?.description.slice(0,35)}</p>
                        </div>)}
                        <div className=''>
                            <div className="text-center text-xl text-white bg-[rgb(215,235,230)] rounded-2xl  mt-[20px] w-[127vh] min-h-[54vh]" style={{ border: '2px solid rgb(77,164,164)', overflowY: 'auto', maxHeight: '54vh'  }}>
                                <div className="flex flex-wrap justify-center items-center gap-4">
                                    {drillDownData.map((item) => (
                                        <div key={item._id} onClick={() => handleItemClick(item._id, item.level)} className=" rounded-6xl bg-cornflowerblue h-[215px] overflow-hidden  shrink-0 mt-2">
                                            <div className="font-light flex justify-center items-center bg-blue-800 rounded-xl w-[300px] h-[150px] text-[15px] mt-3">
                                                <div className=" font-semibold text-[15px] overflow:hidden">
                                                    <p className="m-0 text-white mt-3 ">{item.name}</p>
                                                    <p className="m-0 text-white whitespace-nowrap mb-3 overflow-ellipsis"  style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>{item.description}</p>
                                                </div>
                                                {/* <p className="m-0 text-white ">BULID</p>
                                    <p className="m-0 text-white mb-3 ">Bulidings</p> */}
                                            </div>
                                        </div>
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
