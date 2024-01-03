import React, { useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

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
                <li className='hover:bg-slate-500'>
                    Edit
                </li>
                <li className='mt-2 hover:bg-slate-500'>
                    Delete
                </li>
                <li className='mt-2 hover:bg-slate-500'>
                    Permission
                </li>
            </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
