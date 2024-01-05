import React, { useEffect, useRef, useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { instance } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dropdown = ({ userId, parentSetUseEffectCall, userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [permissionOpen, setPermissionOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [useEffectCall, setUseEffectCall] = useState(false);
  const [plants, setPlants] = useState([]);
  // const [permissions, setPermissions] = useState([]);
  const [selectedPlants, setSelectedPlants] = useState([]);
  // const [permissions, setPermissions] = useState([
  //     {
  //         plant: null,
  //         access: {
  //             edit: false,
  //             delete: false,
  //             create: false,
  //             duplicate: false,
  //         },
  //     }
  // ]);


  const [formData, setFormData] = useState({
    name: userData.name || "",
    email: userData.email || "",
    // password:"",
  });


  const handleSelectAll = (e) => {
    const selectedPlantId = e.target.checked ? 'all' : null;
    setSelectedPlants(selectedPlantId !== null ? [selectedPlantId] : []);
  };



  //   const handleSelectRow = (plantId) => {
  //     setSelectedPlants((prevSelectedPlants) => {

  //       if (prevSelectedPlants.includes(plantId)) {
  //         // Deselect the row
  //         return prevSelectedPlants.filter((id) => id !== plantId);
  //       } else {
  //         // Select the row
  //         return [...prevSelectedPlants, plantId];
  //       }
  //     });
  //   };

  // const handleSelectRow = (plantId) => {
  //   setSelectedPlants((prevSelectedPlants) => {
  //     const hasEditPermission = permissions.some((p) => p.plant === plantId && p.access.edit);

  //     if (hasEditPermission) {
  //       if (prevSelectedPlants.includes(plantId)) {
  //         // Deselect the row
  //         return prevSelectedPlants.filter((id) => id !== plantId);
  //       } else {
  //         // Select the row
  //         return [...prevSelectedPlants, plantId];
  //       }
  //     } else {
  //       // If no "Edit" permission, do not select the row
  //       return prevSelectedPlants.filter((id) => id !== plantId);
  //     }
  //   });
  // };


  //   useEffect(() => {
  //     const fetchPlant = async () => {
  //         try {
  //             const response = await instance.get('/plants/all-plant')
  //             console.log(response.data)
  //             setPlants(response.data)
  //         } catch (error) {
  //             console.log(error)
  //         }
  //     }

  //     fetchPlant()
  // }, [useEffectCall])

  // useEffect(() => {
  //     const fetchPlant = async () => {
  //       try {
  //         const response = await instance.get('/plants/all-plant');
  //         console.log(response.data);

  //         // const initialPermissions = response.data.map((plant) => ({
  //         //   plant: plant._id,
  //         //   access: {
  //         //     edit: false,
  //         //     delete: false,
  //         //     create: false,
  //         //     duplicate: false,
  //         //   },
  //         // }));
  //         const existingPermissions = response.data.map((plant) => {
  //             const existingPermission = userData.permissions?.find((p) => p.plant === plant._id);
  //             return existingPermission || {
  //               plant: plant._id,
  //               access: {
  //                 edit: false,
  //                 delete: false,
  //                 create: false,
  //                 duplicate: false,
  //               },
  //             };
  //           });

  //         setPermissions(existingPermissions);
  //         setPlants(response.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     fetchPlant();
  //   }, [userData]);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await instance.get('/plants/all-plant');

        // const existingPermissions = response.data.map((plant) => {
        //   const existingPermissionIndex = Array.isArray(userData.permissions)
        //     ? userData.permissions.findIndex((p) => p.plant === plant._id)
        //     : -1;

        //   if (existingPermissionIndex !== -1 && userData.permissions[existingPermissionIndex]) {
        //     return {
        //       plant: plant._id,
        //       access: {
        //         ...userData.permissions[existingPermissionIndex].access,
        //       },
        //     };
        //   } else {
        //     return {
        //       plant: plant._id,
        //       access: {
        //         edit: false,
        //         delete: false,
        //         create: false,
        //         duplicate: false,
        //       },
        //     };
        //   }
        // });

        // setPermissions(existingPermissions);
        setPlants(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlant();
  }, []);




  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // const togglePermission = (plantId, accessType) => {
  //   setPermissions((prevPermissions) =>
  //     prevPermissions.map((permission) =>
  //       permission.plant === plantId
  //         ? {
  //             ...permission,
  //             access: {
  //               ...permission.access,
  //               [accessType]: !permission.access[accessType],
  //             },
  //           }
  //         : permission
  //     )
  //   );
  // };




  const deleteUserModal = async () => {
    try {
      const response = await instance.delete(`/users/delete-user/${userId}`);
      toast.success("Deleted Successfully");
      console.log("ressss", response);
      setUseEffectCall(!useEffectCall);
      parentSetUseEffectCall((prev) => !prev);
      setDeleteOpen(false)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeAddUser = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmitEditUser = () => {
    console.log(formData);

    // const selectedPlants = permissions
    // .filter((permission) => Object.values(permission.access).some((value) => value))
    // .map((permission) => permission.plant);


    const updatedUserData = {
      ...formData,
      plant: permissions,
    };

    instance
      .put(`/users/edit-user/${userData._id}`, updatedUserData)
      .then((res) => {
        toast.success("Permissions udpated");
        setPermissionOpen(false)

        setEditOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
    //setPermissions([]);
    //setPermissionOpen(false);
  };

  const [permissions, setPermissions] = useState([]);

  useEffect(()=>{
    setPermissions(userData?.plant)
    userData?.plant.forEach((item)=>{
      setMasterCheckboxes(prevState=>({
        ...prevState,
        [item.plant]:true
      }))
    })
  },[])
  const [masterCheckboxes, setMasterCheckboxes] = useState({});

  const handleMasterCheckboxChange = (rowId) => {
    setMasterCheckboxes((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));

    setPermissions((prevPermissions) => {
      const existingRow = prevPermissions.find((row) => row.plant === rowId);

      if (!existingRow) {
        return [
          ...prevPermissions,
          {
            plant: rowId,
            access: {
              edit: false,
              delete: false,
              create: false,
              duplicate: false,
            },
          },
        ];
      }

      // If master checkbox is unchecked, remove the row from permissions
      if (masterCheckboxes[rowId]) {
        return prevPermissions.filter((row) => row.plant !== rowId);
      }

      return prevPermissions;
    });
  };

  const handleCheckboxChange = (rowId, type) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((row) =>
        row.plant === rowId
          ? {
            ...row,
            access: {
              ...row.access,
              [type]: !row.access[type],
            },
          }
          : row
      )
    );
  };

  return (
    <div className="relative inline-block ">
      <ToastContainer />
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
                          <label class="block text-gray-700 text-sm font-bold mb-2" for="name" >
                            Name
                          </label>
                          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter Name" name='name' value={formData.name} onChange={handleChangeAddUser} />
                        </div>
                        <div class="mb-4">
                          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
                          </label>
                          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Enter Email" name='email' value={formData.email} onChange={handleChangeAddUser} />
                        </div>
                        {/* <div class="mb-6">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                        Password
                                    </label>
                                    <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" name='password' value={formData.password} onChange={handleChangeAddUser}  />
                                    <p class="text-red-500 text-xs italic">Please choose a password.</p>
                                </div> */}
                      </form>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end ">
                    <button
                      type="button"
                      className="mr-2 inline-flex justify-center px-4 py-2 text-sm font-semibold text-white bg-[rgb(133,160,238)] rounded-md hover:bg-[rgb(133,160,238)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                      onClick={handleSubmitEditUser}
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
                      onClick={deleteUserModal}
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
                        {plants.length !== 0 ? (
                          plants?.map((item, index) => (
                            <React.Fragment key={item._id}>
                              <tr class="bg-white dark:bg-white hover:bg-gray-50 dark:hover:bg-[rgb(223,232,251)]">
                                <th scope="col" class="p-4">
                                  <div class="flex items-center">
                                    <input id={`checkbox-${item._id}`} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      checked={masterCheckboxes[item._id] || false}
                                      onChange={() => handleMasterCheckboxChange(item._id)}
                                    />
                                    <label htmlFor={`checkbox-${item._id}`} class="sr-only">checkbox</label>
                                  </div>
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">{index + 1}</th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
                                  {item.name}
                                </th>
                                <td class="px-6 py-4">
                                  <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-white dark:border-gray-600 dark:text-white">
                                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                      <div class="flex items-center ps-3">
                                        <input
                                          id={`edit-checkbox-${item._id}`} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                          checked={permissions.some(
                                            (p) => p.plant === item._id && p.access.edit
                                          )}
                                          onChange={() => handleCheckboxChange(item._id, 'edit')}
                                          disabled={!masterCheckboxes[item._id]}
                                        />
                                        <label for={`edit-checkbox-${item._id}`} class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Edit</label>
                                      </div>
                                    </li>
                                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                      <div class="flex items-center ps-3">
                                        <input id="react-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                          checked={permissions.some(
                                            (p) => p.plant === item._id && p.access.delete
                                          )}
                                          onChange={() => handleCheckboxChange(item._id, 'delete')}
                                          disabled={!masterCheckboxes[item._id]}
                                        />
                                        <label for="react-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Delete</label>
                                      </div>
                                    </li>
                                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                      <div class="flex items-center ps-3">
                                        <input id="angular-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                          checked={permissions.some(
                                            (p) => p.plant === item._id && p.access.duplicate
                                          )}
                                          onChange={() => handleCheckboxChange(item._id, 'duplicate')}
                                          disabled={!masterCheckboxes[item._id]}
                                        />
                                        <label for="angular-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Duplicate</label>
                                      </div>
                                    </li>
                                    <li class="w-full dark:border-gray-600">
                                      <div class="flex items-center ps-3">
                                        <input id="laravel-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                          checked={permissions.some(
                                            (p) => p.plant === item._id && p.access.create
                                          )}
                                          onChange={() => handleCheckboxChange(item._id, 'create')}
                                          disabled={!masterCheckboxes[item._id]}
                                        />
                                        <label for="laravel-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Create</label>
                                      </div>
                                    </li>
                                  </ul>
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
                  <div className="mt-10 flex justify-end">
                    <button
                      type="button"
                      className="mr-2 inline-flex justify-center px-4 py-2 text-sm font-semibold text-white bg-[rgb(183,78,78)] rounded-md hover:bg-[rgb(133,160,238)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                      // onClick={() => setPermissionOpen(false)}
                      onClick={handleSubmitEditUser}
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
