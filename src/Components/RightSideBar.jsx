// import React from 'react'
// import { CiLogout } from 'react-icons/ci'
// import { FaRegChartBar } from 'react-icons/fa'
// import { GrAnalytics } from 'react-icons/gr'
// import { IoSettingsOutline } from 'react-icons/io5'
// import { SlCalender } from 'react-icons/sl'
// import { Link } from 'react-router-dom'
// import p1 from "../assets/p1.jpg"
// import Logo from "../assets/logo.jpg"

// import { IoIosHelpCircleOutline } from 'react-icons/io'

// const RightSideBar = () => {
//   return (
//     <div className='rightsidebar rounded-lg flex-1 bg-[#041D56] text-[#cbe4ed]'>  
//     <div className="div p-7"> 
//       <div className="div  flex gap-2 items-center ">
//         <img src={Logo} alt="" className='w-7  rounded-sm shadow-sm shadow-blue-400' />
//       <h1  className='font-medium text-xl '>Yapper</h1>
//       </div>
// <div className="img flex  mt-7 justify-center items-center flex-col gap-1">
//   <img src={p1} alt=""  className='rounded-full w-9 h-9'/>
//   <h1 className='text-lg'>Mary Doe</h1>
//   <p className='text-gray-500'>+23477893667</p>
// </div>
// <div className="div text-start">
//   <label htmlFor="" className='text-gray-500'>E-mail</label>
//   <p className='text-md font-medium'>marydoe@gmail.com</p>
// </div>
// <div className="div text-start mt-2">
//   <label htmlFor="" className='text-gray-500'>Status</label>
//   <p className='text-md font-medium'>Product Designer</p>
// </div>

// <hr  className='w-full mt-7'/>
// <div className="  flex bg-red-500 justify-between flex-col">
// <div className="div  bg-blue-600 flex flex-col gap-3 mt-6">
// <Link to='/note' className='flex  gap-3 items-center   hover:bg-gray-500 hover:p-1 hover:rounded-md hover:text-[#ededed] '>
//           <IoIosHelpCircleOutline />
//           <span className="list-items font-medium">Messages</span>
//         </Link>

//         <Link to='/note' className='flex hover:text-lei-800 gap-3 items-center   hover:bg-gray-500 hover:p-1 hover:rounded-md hover:text-[#ededed]'>
//           <IoIosHelpCircleOutline />
//           <span className="list-items font-medium">Privacy & Security</span>
//         </Link>
//         <Link to='/note' className='flex hover:text-lei-800 gap-3 items-center   hover:bg-gray-500 hover:p-1 hover:rounded-md hover:text-[#ededed]'>
//           <IoIosHelpCircleOutline />
//           <span className="list-items font-medium">Settings</span>
//         </Link>
//         <Link to='/note' className='flex hover:text-lei-800 gap-3 items-center   hover:bg-gray-500 hover:p-1 hover:rounded-md hover:text-[#ededed]'>
//           <IoIosHelpCircleOutline />
//           <span className="list-items font-medium">Language</span>
//         </Link>
//         <Link to='/note' className='flex hover:text-lei-800 gap-3 items-center   hover:bg-gray-500 hover:p-1 hover:rounded-md hover:text-[#ededed]'>
//           <IoIosHelpCircleOutline />
//           <span className="list-items font-medium">Dark Mode</span>
//         </Link>
//         </div>
//        <div className="div bg-green-400 flex flex-col gap-3 mt-3">
//        <Link to='/note' className='flex hover:text-lei-800 gap-3 items-center   hover:bg-gray-500 hover:p-1 hover:rounded-md hover:text-[#ededed]'>
//           <IoIosHelpCircleOutline />
//           <span className="list-items font-medium">Archived</span>
//         </Link>
//         <Link to='/note' className='flex hover:text-lei-800 gap-3 items-center   hover:bg-gray-500 hover:p-1 hover:rounded-md hover:text-[#ededed]'>
//         <CiLogout />

//           <span className="list-items font-medium">Log out</span>
//         </Link>
//        </div>
//        </div>

//     </div>f


//     </div>
  
  
//   )
// }

// export default RightSideBar


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
    {/* // <div className='rightsidebar flex-1 bg-[#041D56] text-[#cbe4ed] rounded-lg flex flex-col p-5 h-full overflow-y-auto'> */}

      {/* Logo and Title */}
      <div className="flex items-center gap-2 mb-6">
        <img src={Logo} alt="Logo" className='w-7 rounded-sm shadow-sm shadow-blue-400' />
        <h1 className='font-medium text-xl'>Learapp</h1>
      </div>

      {/* Profile Section */}
      <div className="profile-section flex flex-col items-center gap-2 mb-6">
        <img src={currentUser.avartar} alt="Profile" className='rounded-full w-16 h-16' />
        <h1 className='text-lg'>{currentUser.username} </h1>
        <p className='text-gray-500'>+23477893667</p>
      </div>

      {/* Contact Information */}
      <div className="contact-info text-start mb-4">
        <label className='text-gray-500'>E-mail</label>
        <p className='text-md font-medium'>marydoe@gmail.com</p>
        <label className='text-gray-500 mt-2'>Status</label>
        <p className='text-md font-medium'>Product Designer</p>
      </div>

      <hr className='w-full my-6 border-gray-600' />

      {/* Navigation Links */}
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
      {/* </div> */}

      {/* Additional Links */}
      {/* <div className="additional-links flex flex-col gap-3 mt-4"> */}
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
