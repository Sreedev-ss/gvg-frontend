import React, { useRef, useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react'
import { IoIosCloseCircleOutline } from "react-icons/io";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [permissionOpen, setPermissionOpen] = useState(false);
  const cancelButtonRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block ">
      <Link
        href=""
        onClick={toggleDropdown}
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        <FaArrowCircleRight className="text-xl" />
      </Link>
      {isOpen && (
        <div className="absolute right-0 mt-0 bg-white border border-gray-300 rounded shadow-md mr-6">
            <ul className='w-24 cursor-pointer mr-2'>
                <li className='hover:bg-slate-500' onClick={() => setEditOpen(true)}>
                    Edit
                </li>

                <Dialog
                    open={editOpen}
                    onClose={() => setEditOpen(false)}
                    initialFocus={cancelButtonRef}
                >
                    <div className="fixed inset-0 z-10 flex items-center justify-center">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="relative bg-white p-4 rounded-lg text-left shadow-xl w-96">
                        <div className="flex items-center justify-between mb-4">
                        <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                            Edit User
                        </Dialog.Title>
                        <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => setEditOpen(false)}
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
                            onClick={() => setEditOpen(false)}
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                            onClick={() => setEditOpen(false)}
                        >
                            Cancel
                        </button>
                        </div>
                    </div>
                    </div>
                </Dialog>

                <li className='mt-2 hover:bg-slate-500' onClick={() => setDeleteOpen(true)}>
                    Delete
                </li>
                <Dialog
                    open={deleteOpen}
                    onClose={() => setDeleteOpen(false)}
                    initialFocus={cancelButtonRef}
                >
                    <div className="fixed inset-0 z-10 flex items-center justify-center">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="relative bg-white p-4 rounded-lg text-left shadow-xl w-96">
                        <div className="flex items-center justify-between mb-4">
                        <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                            Delete User
                        </Dialog.Title>
                        <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => setDeleteOpen(false)}
                            ref={cancelButtonRef}
                        >
                            <span className="sr-only">Close</span>
                            <IoIosCloseCircleOutline className="h-6 w-6" />
                        </button>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                        <div class="w-full max-w-xs">
                            <p>Are you sure you want to delete this user?</p>
                            </div>
                        </div>
                        <div className="mt-10 flex justify-end">
                        <button
                            type="button"
                            className="mr-2 inline-flex justify-center px-4 py-2 text-sm font-semibold text-white bg-[rgb(183,78,78)] rounded-md hover:bg-[rgb(133,160,238)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                            onClick={() => setDeleteOpen(false)}
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                            onClick={() => setDeleteOpen(false)}
                        >
                            Cancel
                        </button>
                        </div>
                    </div>
                    </div>
                </Dialog>

                <li className='mt-2 hover:bg-slate-500' onClick={() => setPermissionOpen(true)}>
                    Permission
                </li>
                <Dialog
                    open={permissionOpen}
                    onClose={() => setPermissionOpen(false)}
                    initialFocus={cancelButtonRef}
                >
                    <div className="fixed inset-0 z-10 flex items-center justify-center  ">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="relative bg-white p-4 rounded-lg text-left shadow-xl w-[80%]">
                        <div className="flex items-center justify-between mb-4">
                        <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                            Permission
                        </Dialog.Title>
                        <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => setPermissionOpen(false)}
                            ref={cancelButtonRef}
                        >
                            <span className="sr-only">Close</span>
                            <IoIosCloseCircleOutline className="h-6 w-6" />
                        </button>
                        </div>

                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-7">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[rgb(137,165,251)] dark:text-white">
                                    <tr>
                                        <th></th>
                                        <th scope="col" class="px-6 py-3">Sl. No.</th>
                                        <th scope="col" class="px-6 py-3">
                                            Plant Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Permissions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white dark:bg-white hover:bg-gray-50 dark:hover:bg-[rgb(223,232,251)]">
                                        <th scope="col" class="p-4">
                                            <div class="flex items-center">
                                                <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">1</th>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
                                            Plant A
                                        </th>
                                        <td class="px-6 py-4">                                    
                                            <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-white dark:border-gray-600 dark:text-white">
                                                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                    <div class="flex items-center ps-3">
                                                        <input id="vue-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                        <label for="vue-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Edit</label>
                                                    </div>
                                                </li>
                                                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                    <div class="flex items-center ps-3">
                                                        <input id="react-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                        <label for="react-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Delete</label>
                                                    </div>
                                                </li>
                                                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                    <div class="flex items-center ps-3">
                                                        <input id="angular-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                        <label for="angular-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Duplicate</label>
                                                    </div>
                                                </li>
                                                <li class="w-full dark:border-gray-600">
                                                    <div class="flex items-center ps-3">
                                                        <input id="laravel-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                        <label for="laravel-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Create</label>
                                                    </div>
                                                </li>
                                            </ul> 
                                        </td>
                                    </tr> 
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-10 flex justify-end">
                            <button
                                type="button"
                                className="mr-2 inline-flex justify-center px-4 py-2 text-sm font-semibold text-white bg-[rgb(183,78,78)] rounded-md hover:bg-[rgb(133,160,238)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                                onClick={() => setPermissionOpen(false)}
                            >
                                Allow
                            </button>
                            <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                                onClick={() => setPermissionOpen(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                    </div>
                </Dialog>
            </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
