import React, { useRef, useState, Fragment } from "react";
import { Dialog } from '@headlessui/react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import './Drpdown';
import Dropdown from "./Drpdown";


const UserComp = () => {
    const [open, setOpen] = useState(false);


    const cancelButtonRef = useRef(null)

    return (
        <>
            <div className="bg-white p-4 h-[89.4vh] rounded-lg shadow-md main-container">
                <div className="flex items-end justify-end ">
                    <button className="bg-[rgb(185,213,251)] w-16 h-10 rounded-lg text-black" onClick={() => setOpen(true)}>
                        Add
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
                                Create a User
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
                            <div class="w-full max-w-xs">
                                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                    <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                            Name
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter Name" />
                                    </div>
                                    <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                            Email
                                        </label>
                                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter Email" />
                                    </div>
                                    <div class="mb-6">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                            Password
                                        </label>
                                        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                                        <p class="text-red-500 text-xs italic">Please choose a password.</p>
                                    </div>
                                    <div class="mb-6">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                            Confirm Password
                                        </label>
                                        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                                        <p class="text-red-500 text-xs italic">Please re-write the password.</p>
                                    </div>
                                </form>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                className="mr-2 inline-flex justify-center px-4 py-2 text-sm font-semibold text-white bg-[rgb(133,160,238)] rounded-md hover:bg-[rgb(133,160,238)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                                onClick={() => setOpen(false)}
                            >
                                Create
                            </button>
                            <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                            </div>
                        </div>
                        </div>
                    </Dialog>

                </div>
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
                                {/* <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Delete</span>
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr class="bg-white dark:bg-white hover:bg-gray-50 dark:hover:bg-[rgb(223,232,251)]">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">1</th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
                                    Sree Dev
                                </th>
                                <td class="px-6 py-4">
                                    sree@gmail.com
                                </td>
                            
                                <td class="px-6 py-4 text-right">
                                    <Dropdown/>
                                </td>
                            </tr>
                            <tr class="bg-white dark:bg-white hover:bg-gray-50 dark:hover:bg-[rgb(223,232,251)]">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">2</th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
                                    Akhila Vijayan
                                </th>
                                <td class="px-6 py-4">
                                    akhila@gmail.com
                                </td>
                            
                                <td class="px-6 py-4 text-right">
                                    <Dropdown/>
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