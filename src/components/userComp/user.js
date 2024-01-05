import React, { useRef, useState, Fragment, useEffect } from "react";
import './Drpdown';
import Dropdown from "./Drpdown";
import { instance } from "../../api";

const UserComp = () => {
    const [allUserData, setAllUserData] = useState([]);
    const [useEffectCall, setUseEffectCall] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await instance.get(`/users/all-user`);
                console.log("ress",res);
                setAllUserData(res.data);
            } catch (error) {
                console.log("errrrr",error);
            }
        };
        fetchData();
    },[useEffectCall]);

    return (
        <>
            <div className="bg-white p-4 h-[89.4vh] rounded-lg shadow-md main-container">
                <h1 className="flex items-center justify-center text-xl"><strong>USERS</strong></h1>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-7">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[rgb(236,140,165)] dark:text-white">
                    <tr>
                        <th scope="col" class="px-6 py-3">Sl. No.</th>
                        <th scope="col" class="px-6 py-3">
                        Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                        Email
                        </th>

                        <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Updates</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {allUserData.length !== 0 ? (
                        allUserData?.map((item, index) => (
                        <React.Fragment key={item._id}>
                            <tr class="bg-white dark:bg-white hover:bg-gray-50 dark:hover:bg-[rgb(223,232,251)]">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">{index+1}</th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
                                {item.name}
                            </th>
                            <td class="px-6 py-4">
                                {item.email}
                            </td>

                            <td class="px-6 py-4 text-right">
                                <Dropdown />
                            </td>
                            </tr>  
                        </React.Fragment>
                        ))
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full mt-150">
                                <div className="flex justify-center items-center w-full">
                                    <p className="ml-450">No Data</p>
                                </div>
                            </div>
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    )
}

export default UserComp;