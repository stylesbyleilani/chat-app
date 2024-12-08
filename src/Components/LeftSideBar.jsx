
import React, { useEffect, useState } from 'react';
import p1 from "../assets/p1.jpg";
import { IoIosSearch } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa6";
import AddUser from './AddUser';
import { useUserStore } from '../Library/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../Library/firebase';
import { useChatStore } from '../Library/chatStore';

const LeftSideBar = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data().chats;
      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);
        const user = userDocSnap.data();
        return { ...item, user };
      });
  
      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });
  
    return () => {
      unsub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChat = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    const chatIndex = userChat.findIndex((item) => item.chatId === chat.chatId);
    if (chatIndex !== -1) {
      userChat[chatIndex].isSeen = true;
  
      const userChatsRef = doc(db, "userchats", currentUser.id);
      try {
        await updateDoc(userChatsRef, {
          chats: userChat,
        });
        changeChat(chat.chatId, chat.user);
      } catch (error) {
        console.error("Error updating chat:", error);
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return formattedTime;
  };

  const filteredChats = chats.filter(chat => 
    chat.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className='rightsidebar h-full w-[100%] rounded-lg flex-1 bg-[#041D56] text-[#cbe4ed]'> 
      <div className="div p-7"> 
        <div className="div flex justify-between items-center">
          <h1 className='font-medium text-xl text-blue-100'>
          {currentUser?.username.charAt(0).toUpperCase() + currentUser?.username.slice(1)}

          </h1>
          <img src={currentUser.avatar} alt="" className='w-10 h-10 rounded-full' />
        </div>

        <div className="chats mt-3 flex-1">
          <h1 className='text-xl font-medium mt-4 text-blue-100'>Chats</h1>

          <div className="overflow-hidden w-full">
            <div className="flex items-center gap-2 justify-between">
              <div className="input flex gap-1 items-center mt-3 bg-gray-600 flex-1 border-[2px]  border-blue-700 rounded-lg">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="bg-transparent outline-none p-1 w-full" 
                  onChange={(e) => setInput(e.target.value)} 
                />
              </div>
              <div 
                onClick={() => setAddMode((prev) => !prev)} 
                className="input flex gap-2 items-center mt-3 bg-gray-600 p-2 border-[2px]  border-blue-700 rounded-lg flex-shrink-0"
              >
                {addMode ? <FaMinus /> : <FaPlus />}
              </div>
            </div>
          </div>




<div className="hide-scrollbar overflow-y-scroll mt-3 h-[400px]">
  {filteredChats.map((chat) => (
    <div 
      key={chat.chatId} 
      className="diuser flex mt-5 items-center   justify-between" 
      onClick={() => handleSelect(chat)}
    >
      <img src={chat.user.avatar || p1} alt="" className='w-10 h-10 rounded-full' />
      
      <div className="div flex flex-col items-center">
        {/* <h1 className='font-medium text-lg text-blue-100'>{chat.user.username}</h1> */}


        {/* <h1 className="font-medium text-lg text-blue-100">
  {chat.user.username.charAt(0).toUpperCase() + chat.user.username.slice(1)}
</h1> */}

<h1 className="font-medium text-lg text-blue-100">
  {chat.user.username.length > 6
    ? chat.user.username.charAt(0).toUpperCase() + chat.user.username.slice(1, 9) + "..."
    : chat.user.username.charAt(0).toUpperCase() + chat.user.username.slice(1)}
</h1>


        <p className='text-gray-500'>
          {chat.lastMessage.slice(0, 4)}{chat.lastMessage.length > 4 ? '...' : ''}
        </p>
      </div>

      
      <div className="d flex flex-col items-center text-center w-16">
        <p className='text-sm text-blue-100'>{chat.updatedAt ? formatTimestamp(chat.updatedAt) : ''}</p>
        <div 
          className="rounded-full bg-red-500 w-4 h-4 flex items-center justify-center mt-1"
          style={{ backgroundColor: chat?.isSeen ? 'transparent' : 'blue' }}
        />
      </div>
    </div>
  ))}
</div>





        </div>
      </div>
      {addMode && <AddUser />}
    </div>
  );
}

export default LeftSideBar;

































// // import React, { useEffect, useState } from 'react';
// // import p1 from "../assets/p1.jpg";
// // import { IoIosSearch } from "react-icons/io";
// // import { FaPlus, FaMinus } from "react-icons/fa6";
// // import AddUser from './AddUser';
// // import { useUserStore } from '../Library/userStore';
// // import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
// // import { db } from '../Library/firebase';
// // import { useChatStore } from '../Library/chatStore';

// // const LeftSideBar = () => {
// //   const [addMode, setAddMode] = useState(false);
// //   const [chats, setChats] = useState([]);
// //   const [input, setInput] = useState("");
  
// //   const { currentUser } = useUserStore();
// //   const { changeChat } = useChatStore();

// //   useEffect(() => {
// //     const unsub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
// //       const items = res.data().chats;
// //       const promises = items.map(async (item) => {
// //         const userDocRef = doc(db, "users", item.receiverId);
// //         const userDocSnap = await getDoc(userDocRef);
// //         const user = userDocSnap.data();
// //         return { ...item, user };
// //       });
  
// //       const chatData = await Promise.all(promises);
// //       setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
// //     });
  
// //     return () => {
// //       unsub();
// //     };
// //   }, [currentUser.id]);

// //   const handleSelect = async (chat) => {
// //     const userChat = chats.map((item) => {
// //       const { user, ...rest } = item;
// //       return rest;
// //     });
// //     const chatIndex = userChat.findIndex((item) => item.chatId === chat.chatId);
// //     if (chatIndex !== -1) {
// //       userChat[chatIndex].isSeen = true;
  
// //       const userChatsRef = doc(db, "userchats", currentUser.id);
// //       try {
// //         await updateDoc(userChatsRef, {
// //           chats: userChat,
// //         });
// //         changeChat(chat.chatId, chat.user);
// //       } catch (error) {
// //         console.error("Error updating chat:", error);
// //       }
// //     }
// //   };

// //   const formatTimestamp = (timestamp) => {
// //     const date = new Date(timestamp);
// //     const hours = date.getHours();
// //     const minutes = date.getMinutes();
// //     const ampm = hours >= 12 ? 'PM' : 'AM';
// //     const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
// //     return formattedTime;
// //   };

// //   const filteredChats = chats.filter(chat => 
// //     chat.user.username.toLowerCase().includes(input.toLowerCase())
// //   );

// //   return (
// //     <div className='relative h-full w-full md:w-[350px] lg:w-[400px] rounded-lg bg-[#041D56] text-[#cbe4ed]'> 
// //       <div className="p-3 md:p-5 lg:p-7 flex flex-col h-full"> 
// //         {/* Header */}
// //         <div className="flex justify-between items-center">
// //           <h1 className='font-medium text-lg md:text-xl text-gray-500'>
// //             {currentUser?.username.charAt(0).toUpperCase() + currentUser?.username.slice(1)}
// //           </h1>
// //           <img 
// //             src={currentUser.avartar} 
// //             alt="" 
// //             className='w-8 h-8 md:w-10 md:h-10 rounded-full object-cover' 
// //           />
// //         </div>

// //         {/* Chat Section */}
// //         <div className="flex-1 mt-2 md:mt-3">
// //           <h1 className='text-lg md:text-xl font-medium text-gray-500'>Chats</h1>

// //           {/* Search and Add Section */}
// //           <div className="mt-2 md:mt-3 w-full">
// //             <div className="flex items-center gap-2">
// //               <div className="flex-1 flex items-center bg-gray-600 border-2 border-blue-800 rounded-lg">
// //                 <input 
// //                   type="text" 
// //                   placeholder="Search" 
// //                   className="bg-transparent outline-none p-1.5 md:p-2 w-full text-sm md:text-base" 
// //                   onChange={(e) => setInput(e.target.value)} 
// //                 />
// //               </div>
// //               <button 
// //                 onClick={() => setAddMode((prev) => !prev)} 
// //                 className="flex items-center justify-center bg-gray-600 p-1.5 md:p-2 border-2 border-blue-800 rounded-lg"
// //               >
// //                 {addMode ? <FaMinus className="w-4 h-4" /> : <FaPlus className="w-4 h-4" />}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Chat List */}
// //           <div className="hide-scrollbar overflow-y-auto mt-3 h-[calc(100vh-200px)] md:h-[400px]">
// //             {filteredChats.map((chat) => (
// //               <div 
// //                 key={chat.chatId} 
// //                 className="flex items-center justify-between p-2 mt-2 hover:bg-gray-700/30 rounded-lg cursor-pointer transition-colors" 
// //                 onClick={() => handleSelect(chat)}
// //               >
// //                 <div className="flex items-center gap-3 flex-1">
// //                   <img 
// //                     src={chat.user.avartar || p1} 
// //                     alt="" 
// //                     className='w-8 h-8 md:w-10 md:h-10 rounded-full object-cover' 
// //                   />
                  
// //                   <div className="flex flex-col min-w-0">
// //                     <h1 className='font-medium text-base md:text-lg text-gray-500 truncate'>
// //                       {chat.user.username}
// //                     </h1>
// //                     <p className='text-sm text-gray-500 truncate'>
// //                       {chat.lastMessage}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <div className="flex flex-col items-end ml-2">
// //                   <p className='text-xs md:text-sm text-gray-500'>
// //                     {chat.updatedAt ? formatTimestamp(chat.updatedAt) : ''}
// //                   </p>
// //                   {!chat?.isSeen && (
// //                     <div className="rounded-full bg-blue-500 w-3 h-3 md:w-4 md:h-4 mt-1" />
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* Add User Modal */}
// //       {addMode && (
// //         <div className="absolute top-0 left-0 w-full h-full">
// //           <AddUser />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default LeftSideBar;






// ///TEST

// // import React, { useEffect, useState } from 'react';
// // import p1 from "../assets/p1.jpg";
// // import { IoIosSearch } from "react-icons/io";
// // import { FaPlus, FaMinus } from "react-icons/fa6";
// // import AddUser from './AddUser';
// // import { useUserStore } from '../Library/userStore';
// // import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
// // import { db } from '../Library/firebase';
// // import { useChatStore } from '../Library/chatStore';

// // const LeftSideBar = () => {
// //   const [addMode, setAddMode] = useState(false);
// //   const [chats, setChats] = useState([]);
// //   const [input, setInput] = useState("");
  
// //   const { currentUser } = useUserStore();
// //   const { changeChat } = useChatStore();

// //   useEffect(() => {
// //     const unsub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
// //       const items = res.data().chats;
// //       const promises = items.map(async (item) => {
// //         const userDocRef = doc(db, "users", item.receiverId);
// //         const userDocSnap = await getDoc(userDocRef);
// //         const user = userDocSnap.data();
// //         return { ...item, user };
// //       });
  
// //       const chatData = await Promise.all(promises);
// //       setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
// //     });
  
// //     return () => {
// //       unsub();
// //     };
// //   }, [currentUser.id]);

// //   const handleSelect = async (chat) => {
// //     const userChat = chats.map((item) => {
// //       const { user, ...rest } = item;
// //       return rest;
// //     });
// //     const chatIndex = userChat.findIndex((item) => item.chatId === chat.chatId);
// //     if (chatIndex !== -1) {
// //       userChat[chatIndex].isSeen = true;
  
// //       const userChatsRef = doc(db, "userchats", currentUser.id);
// //       try {
// //         await updateDoc(userChatsRef, {
// //           chats: userChat,
// //         });
// //         changeChat(chat.chatId, chat.user);
// //       } catch (error) {
// //         console.error("Error updating chat:", error);
// //       }
// //     }
// //   };

// //   const formatTimestamp = (timestamp) => {
// //     const date = new Date(timestamp);
// //     const hours = date.getHours();
// //     const minutes = date.getMinutes();
// //     const ampm = hours >= 12 ? 'PM' : 'AM';
// //     const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
// //     return formattedTime;
// //   };

// //   const filteredChats = chats.filter(chat => 
// //     chat.user.username.toLowerCase().includes(input.toLowerCase())
// //   );

// //   return (
// //     // <div className='relative h-full w-full md:w-[350px] lg:w-[400px] rounded-lg bg-[#041D56] text-[#cbe4ed]'> 
// //     <div className='h-full flex flex-col bg-[#041D56] text-[#cbe4ed]'> 

// //       {/* <div className="p-3 md:p-5 lg:p-7 flex flex-col h-full">  */}
// //       <div className="flex-shrink-0 p-4 space-y-4">

// //         {/* Header */}
// //         <div className="flex justify-between items-center">
// //           <h1 className='font-medium text-lg md:text-xl text-gray-500'>
// //             {currentUser?.username.charAt(0).toUpperCase() + currentUser?.username.slice(1)}
// //           </h1>
// //           <img 
// //             src={currentUser.avartar} 
// //             alt="" 
// //             className='w-8 h-8 md:w-10 md:h-10 rounded-full object-cover' 
// //           />
// //         </div>

// //         {/* Chat Section */}
// //         {/* <div className="flex-1 mt-2 md:mt-3"> */}
// //           <h1 className='text-lg md:text-xl font-medium text-gray-500'>Chats</h1>

// //           {/* Search and Add Section */} 
// //           <div className="mt-2 md:mt-3 w-full">
// //             <div className="flex items-center gap-2">
// //               <div className="flex-1 flex items-center bg-gray-600 border-2 border-blue-800 rounded-lg">
// //                 <input 
// //                   type="text" 
// //                   placeholder="Search" 
// //                   className="bg-transparent outline-none p-1.5 md:p-2 w-full text-sm md:text-base" 
// //                   onChange={(e) => setInput(e.target.value)} 
// //                 />
// //               </div>
// //               <button 
// //                 onClick={() => setAddMode((prev) => !prev)} 
// //                 className="flex items-center justify-center bg-gray-600 p-1.5 md:p-2 border-2 border-blue-800 rounded-lg"
// //               >
// //                 {addMode ? <FaMinus className="w-4 h-4" /> : <FaPlus className="w-4 h-4" />}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Chat List */}
// //           <div className="hide-scrollbar overflow-y-auto mt-3 h-[calc(100vh-200px)] md:h-[400px]">
// //             {filteredChats.map((chat) => (
// //               <div 
// //                 key={chat.chatId} 
// //                 className="flex items-center justify-between p-2 mt-2 hover:bg-gray-700/30 rounded-lg cursor-pointer transition-colors" 
// //                 onClick={() => handleSelect(chat)}
// //               >
// //                 <div className="flex items-center gap-3 flex-1">
// //                   <img 
// //                     src={chat.user.avartar || p1} 
// //                     alt="" 
// //                     className='w-8 h-8 md:w-10 md:h-10 rounded-full object-cover' 
// //                   />
                  
// //                   <div className="flex flex-col min-w-0">
// //                     <h1 className='font-medium text-base md:text-lg text-gray-500 truncate'>
// //                       {chat.user.username}
// //                     </h1>
// //                     <p className='text-sm text-gray-500 truncate'>
// //                       {chat.lastMessage}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <div className="flex flex-col items-end ml-2">
// //                   <p className='text-xs md:text-sm text-gray-500'>
// //                     {chat.updatedAt ? formatTimestamp(chat.updatedAt) : ''}
// //                   </p>
// //                   {!chat?.isSeen && (
// //                     <div className="rounded-full bg-blue-500 w-3 h-3 md:w-4 md:h-4 mt-1" />
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* Add User Modal */}
// //       {addMode && (
// //         <div className="absolute top-0 left-0 w-full h-full">
// //           <AddUser />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default LeftSideBar;





// //TEST END





































// // import React, { useEffect, useState } from 'react';
// // import p1 from "../assets/p1.jpg";
// // import { IoIosSearch } from "react-icons/io";
// // import { FaPlus, FaMinus } from "react-icons/fa6";
// // import AddUser from './AddUser';
// // import { useUserStore } from '../Library/userStore';
// // import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
// // import { db } from '../Library/firebase';
// // import { useChatStore } from '../Library/chatStore';

// // const LeftSideBar = () => {
// //   const [addMode, setAddMode] = useState(false);
// //   const [chats, setChats] = useState([]);
// //   const [input, setInput] = useState("");
  
// //   const { currentUser } = useUserStore();
// //   const { changeChat } = useChatStore();

// //   // ... rest of your existing useEffect and handler functions remain the same ...

// //   const filteredChats = chats.filter(chat => 
// //     chat.user.username.toLowerCase().includes(input.toLowerCase())
// //   );

// //   return (
// //     <div className='h-full flex flex-col bg-[#041D56] text-[#cbe4ed]'> 
// //       {/* Fixed Header Section */}
// //       <div className="flex-shrink-0 p-4 space-y-4">
// //         {/* User Header */}
// //         <div className="flex justify-between items-center">
// //           <h1 className='font-medium text-lg md:text-xl text-gray-500'>
// //             {currentUser?.username.charAt(0).toUpperCase() + currentUser?.username.slice(1)}
// //           </h1>
// //           <img 
// //             src={currentUser.avartar} 
// //             alt="" 
// //             className='w-8 h-8 md:w-10 md:h-10 rounded-full object-cover' 
// //           />
// //         </div>

// //         {/* Chats Title */}
// //         <h1 className='text-lg md:text-xl font-medium text-gray-500'>Chats</h1>

// //         {/* Search and Add Section */}
// //         <div className="w-full">
// //           <div className="flex items-center gap-2">
// //             <div className="flex-1 flex items-center bg-gray-600 border-2 border-blue-800 rounded-lg">
// //               <input 
// //                 type="text" 
// //                 placeholder="Search" 
// //                 className="bg-transparent outline-none p-1.5 md:p-2 w-full text-sm md:text-base" 
// //                 onChange={(e) => setInput(e.target.value)} 
// //               />
// //             </div>
// //             <button 
// //               onClick={() => setAddMode((prev) => !prev)} 
// //               className="flex items-center justify-center bg-gray-600 p-1.5 md:p-2 border-2 border-blue-800 rounded-lg"
// //             >
// //               {addMode ? <FaMinus className="w-4 h-4" /> : <FaPlus className="w-4 h-4" />}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Scrollable Chat List */}
// //       <div className="flex-1 overflow-y-auto p-4">
// //         {filteredChats.map((chat) => (
// //           <div 
// //             key={chat.chatId} 
// //             className="flex items-center justify-between p-2 mb-2 hover:bg-gray-700/30 rounded-lg cursor-pointer transition-colors" 
// //             onClick={() => handleSelect(chat)}
// //           >
// //             <div className="flex items-center gap-3 flex-1">
// //               <img 
// //                 src={chat.user.avartar || p1} 
// //                 alt="" 
// //                 className='w-8 h-8 md:w-10 md:h-10 rounded-full object-cover' 
// //               />
              
// //               <div className="flex flex-col min-w-0">
// //                 <h1 className='font-medium text-base md:text-lg text-gray-500 truncate'>
// //                   {chat.user.username}
// //                 </h1>
// //                 <p className='text-sm text-gray-500 truncate'>
// //                   {chat.lastMessage}
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="flex flex-col items-end ml-2">
// //               <p className='text-xs md:text-sm text-gray-500'>
// //                 {chat.updatedAt ? formatTimestamp(chat.updatedAt) : ''}
// //               </p>
// //               {!chat?.isSeen && (
// //                 <div className="rounded-full bg-blue-500 w-3 h-3 md:w-4 md:h-4 mt-1" />
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
      
// //       {/* Add User Modal */}
// //       {addMode && (
// //         <div className="absolute inset-0 z-50">
// //           <AddUser />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default LeftSideBar;





