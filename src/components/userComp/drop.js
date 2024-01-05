import React, { useEffect, useRef, useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { instance } from "../../api";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [useEffectCall, setUseEffectCall] = useState(false);
  const [allUserData, setAllUserData] = useState([]);

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const deleteUserModal = (id) => {
    console.log(id);
    instance
      .delete(`/users/delete-user/${id}`)
      .then((response) => {
        if (response) {
         
          console.log("ressss",response);
          setUseEffectCall(!useEffectCall);
          setDeleteOpen(false)
        } else {
          console.error("Error Deleting User");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
                        {allUserData.length !== 0 ? (
                            allUserData?.map((item, index) => (                           
                        <button
                            key={item._id}
                            type="button"
                            className="mr-2 inline-flex justify-center px-4 py-2 text-sm font-semibold text-white bg-[rgb(183,78,78)] rounded-md hover:bg-[rgb(133,160,238)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                            onClick={() => deleteUserModal(item._id)}
                        >
                            Delete
                        </button>
                        ))
                        ):(
                            <div>No Data</div>
                        )}
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
            </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
