import React from "react";

const UserComp = () => {
    return (
        <>
            <div className="bg-white p-4 h-[89.4vh] rounded-lg shadow-md main-container">
                <h1 className="flex items-center justify-center text-xl"><strong>USERS</strong></h1>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-7">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[rgb(187,76,113)] dark:text-white">
                            <tr>
                                <th scope="col" class="px-6 py-3">Sl. No.</th>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                
                                <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Edit</span>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Delete</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr class="bg-white dark:bg-white hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">1</th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
                                    Sree Dev
                                </th>
                                <td class="px-6 py-4">
                                    sree@gmail.com
                                </td>
                            
                                <td class="px-6 py-4 text-right">
                                    <a href="/edit" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <a href="/delete" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default UserComp;