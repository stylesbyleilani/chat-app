

import React from 'react';
import { CiLogout } from 'react-icons/ci';
import { FaRegChartBar } from 'react-icons/fa';
import { GrAnalytics } from 'react-icons/gr';
import { IoSettingsOutline } from 'react-icons/io5';
import { SlCalender } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import p1 from "../assets/p1.jpg";
import Logo from "../assets/logo.jpg";
import { useUserStore } from '../Library/userStore';

const RightSideBar = () => {
  const {currentUser,isLoading,fetchUserInfo} = useUserStore()

  return (
    <div className='rightsidebar flex-1  bg-[#041D56] text-[#cbe4ed] rounded-lg flex flex-col p-5 h-full'>

      <div className="flex items-center gap-2 mb-6">
        <img src={Logo} alt="Logo" className='w-7 rounded-sm shadow-sm shadow-blue-400' />
        <h1 className='font-medium text-xl'>Learapp</h1>
      </div>

      <div className="profile-section flex flex-col items-center gap-2 mb-6">
        <img src={currentUser.avartar} alt="Profile" className='rounded-full w-16 h-16' />
        <h1 className='text-lg'>{currentUser.username} </h1>
        <p className='text-gray-500'>+23477893667</p>
      </div>

      <div className="contact-info text-start mb-4">
        <label className='text-gray-500'>E-mail</label>
        <p className='text-md font-medium'>marydoe@gmail.com</p>
        <label className='text-gray-500 mt-2'>Status</label>
        <p className='text-md font-medium'>Product Designer</p>
      </div>

      <hr className='w-full my-6 border-gray-600' />

      <div className=" hide-scrollbar overflow-y-scroll mt-3 h-[400px] flex flex-col gap-3">
        <Link to='/messages' className='flex items-center gap-3 hover:bg-gray-500 p-2 rounded-md'>
          <FaRegChartBar />
          <span className="font-medium">Messages</span>
        </Link>
        <Link to='/privacy' className='flex items-center gap-3 hover:bg-gray-500 p-2 rounded-md'>
          <GrAnalytics />
          <span className="font-medium">Privacy & Security</span>
        </Link>
        <Link to='/settings' className='flex items-center gap-3 hover:bg-gray-500 p-2 rounded-md'>
          <IoSettingsOutline />
          <span className="font-medium">Settings</span>
        </Link>
        <Link to='/language' className='flex items-center gap-3 hover:bg-gray-500 p-2 rounded-md'>
          <SlCalender />
          <span className="font-medium">Language</span>
        </Link>
        <Link to='/darkmode' className='flex items-center gap-3 hover:bg-gray-500 p-2 rounded-md'>
          <FaRegChartBar />
          <span className="font-medium">Dark Mode</span>
        </Link>

        <Link to='/archived' className='flex items-center gap-3 hover:bg-gray-500 p-2 rounded-md'>
          <FaRegChartBar />
          <span className="font-medium">Archived</span>
        </Link>
        <Link to='/logout' className='flex items-center gap-3 hover:bg-gray-500 p-2 rounded-md'>
          <CiLogout />
          <span className="font-medium">Log out</span>
        </Link>
      </div>
    </div>
  );
}

export default RightSideBar;
