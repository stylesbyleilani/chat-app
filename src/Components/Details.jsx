

// import React, { useState } from 'react';
// import p1 from "../assets/p1.jpg";
// import { auth, db } from '../Library/firebase';
// import { useChatStore } from '../Library/chatStore';
// import { useUserStore } from '../Library/userStore';
// import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
// import { GoFileMedia } from "react-icons/go";
// import { SiReactquery } from "react-icons/si";
// import { MdSaveAlt } from "react-icons/md";
// import { IoIosNotifications } from "react-icons/io";
// import { CiLogin } from "react-icons/ci";

// const Details = () => {
//   const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
//   const { currentUser } = useUserStore();
  
//   // State to toggle the visibility of images
//   const [showMedia, setShowMedia] = useState(false);

//   const handleBlock = async () => {
//     if (!user || !currentUser) return;

//     // Reference to the user document
//     const userDocRef = doc(db, "users", currentUser.id);
//     const receiverDocRef = doc(db, "users", user.id);

//     try {
//       // Block or unblock the user based on the current state
//       if (isReceiverBlocked) {
//         // Unblock the user
//         await updateDoc(userDocRef, {
//           blocked: arrayRemove(user.id),
//         });
//         await updateDoc(receiverDocRef, {
//           blockedBy: arrayRemove(currentUser.id),
//         });
//         console.log("User unblocked");
//       } else {
//         // Block the user
//         await updateDoc(userDocRef, {
//           blocked: arrayUnion(user.id),
//         });
//         await updateDoc(receiverDocRef, {
//           blockedBy: arrayUnion(currentUser.id),
//         });
//         console.log("User blocked");
//       }

//       // Update the block state locally in the store
//       changeBlock();
//     } catch (error) {
//       console.log("Error blocking/unblocking user: ", error);
//     }
//   };

//   const handleDeleteChat = async () => {
//     if (!chatId || !currentUser) return;

//     const userChatsRef = doc(db, "userchats", currentUser.id);
//     const receiverChatsRef = doc(db, "userchats", user.id);

//     try {
//       // Fetch current user's chats
//       const userChatsSnap = await getDoc(userChatsRef);
//       if (userChatsSnap.exists()) {
//         const userChats = userChatsSnap.data().chats;
//         const updatedChats = userChats.filter(chat => chat.chatId !== chatId);
//         // Update the user's chats
//         await updateDoc(userChatsRef, { chats: updatedChats });
//         console.log("User's chat list updated.");
//       }

//       // Fetch receiver's chats and delete the chat from their list as well
//       const receiverChatsSnap = await getDoc(receiverChatsRef);
//       if (receiverChatsSnap.exists()) {
//         const receiverChats = receiverChatsSnap.data().chats;
//         const updatedReceiverChats = receiverChats.filter(chat => chat.chatId !== chatId);
//         // Update the receiver's chats
//         await updateDoc(receiverChatsRef, { chats: updatedReceiverChats });
//         console.log("Receiver's chat list updated.");
//       }

//     } catch (error) {
//       console.error("Error deleting chat: ", error);
//     }
//   };

//   return (
//     <div className='rightsidebar w-[80%] max-w-[400px] bg-[#041D56] text-gray-400 rounded-lg p-8 h-full flex flex-col gap-6'>
//       <div className="flex items-center gap-4">
//         <img src={user?.avartar || p1} alt="Profile" className='w-10 h-10 rounded-full'/>
//         <div>
//           <span className="font-semibold text-lg">
//             {user?.username.charAt(0).toUpperCase() + user?.username.slice(1)}
//           </span>
//           <p className="text-sm opacity-80">Love nature</p>
//         </div>
//       </div>

//       <div className="chat-setting mt-4 flex flex-col gap-5">
//         <div className="flex gap-3 items-center cursor-pointer" onClick={() => setShowMedia(!showMedia)}>
//           <GoFileMedia />
//           <h1 className="text-sm">Media and Docs</h1>
//         </div>
//         <div className="flex gap-3 items-center">
//           <SiReactquery />
//           <h1 className="text-sm">Wallpaper</h1>
//         </div>
//         <div className="flex gap-3 items-center">
//           <IoIosNotifications />
//           <h1 className="text-sm">Notification</h1>
//         </div>
//         <div className="flex gap-3 items-center">
//           <MdSaveAlt />
//           <h1 className="text-sm">Shared Photos</h1>
//         </div>
//       </div>

//       {/* Media and Docs Section */}
//       {showMedia && (
//         <div className="media-docs mt-4">
//           <h2 className="text-sm">Media Files</h2>
//           <div className="media-gallery flex gap-4 mt-2">
//             {/* Example images */}
//             <img src="path_to_image_1.jpg" alt="Media 1" className="w-20 h-20 object-cover rounded-lg" />
//             <img src="path_to_image_2.jpg" alt="Media 2" className="w-20 h-20 object-cover rounded-lg" />
//             <img src="path_to_image_3.jpg" alt="Media 3" className="w-20 h-20 object-cover rounded-lg" />
//             {/* Add more images as needed */}
//           </div>
//         </div>
//       )}

//       <div className="text-start mt-7">
//         <button onClick={handleBlock} className="text-red-600 text-sm">
//           {
//             isCurrentUserBlocked ? 
//               "You are Blocked" : 
//               isReceiverBlocked ? 
//                 "User Blocked" : "Block User"
//           }
//         </button>
//       </div>
//       <div className="text-start">
//         <button onClick={handleDeleteChat} className="text-sm text-red-600">
//           Delete Chat
//         </button>
//       </div>
//       <div className="text-start flex items-center gap-3">
//         <button className="text-sm text-blue-500" onClick={() => auth.signOut()}>Log Out</button>
//         <CiLogin />
//       </div>
//     </div>
//   );
// };

// export default Details;



import React, { useState, useEffect } from 'react';
import p1 from "../assets/p1.jpg";
import { auth, db, storage } from '../Library/firebase';
import { useChatStore } from '../Library/chatStore';
import { useUserStore } from '../Library/userStore';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { GoFileMedia } from "react-icons/go";
import { SiReactquery } from "react-icons/si";
import { MdSaveAlt } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { CiLogin } from "react-icons/ci";

const Details = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
  const { currentUser } = useUserStore();
  
  // State to toggle the visibility of images
  const [showMedia, setShowMedia] = useState(false);
  const [mediaUrls, setMediaUrls] = useState([]);

  // Function to fetch media files from Firebase Storage
  const fetchMediaFiles = async () => {
    // Replace with your actual media paths in Firebase Storage
    const mediaPaths = [
      'media/path_to_image_1.jpg',
      'media/path_to_image_2.jpg',
      'media/path_to_image_3.jpg',
    ];

    try {
      const urls = await Promise.all(mediaPaths.map(path => getDownloadURL(ref(storage, path))));
      setMediaUrls(urls);
    } catch (error) {
      console.log("Error fetching media files:", error);
    }
  };

  useEffect(() => {
    if (showMedia) {
      fetchMediaFiles();
    }
  }, [showMedia]);

  const handleBlock = async () => {
    if (!user || !currentUser) return;

    // Reference to the user document
    const userDocRef = doc(db, "users", currentUser.id);
    const receiverDocRef = doc(db, "users", user.id);

    try {
      if (isReceiverBlocked) {
        // Unblock the user
        await updateDoc(userDocRef, {
          blocked: arrayRemove(user.id),
        });
        await updateDoc(receiverDocRef, {
          blockedBy: arrayRemove(currentUser.id),
        });
        console.log("User unblocked");
      } else {
        // Block the user
        await updateDoc(userDocRef, {
          blocked: arrayUnion(user.id),
        });
        await updateDoc(receiverDocRef, {
          blockedBy: arrayUnion(currentUser.id),
        });
        console.log("User blocked");
      }

      // Update the block state locally in the store
      changeBlock();
    } catch (error) {
      console.log("Error blocking/unblocking user: ", error);
    }
  };

  const handleDeleteChat = async () => {
    if (!chatId || !currentUser) return;

    const userChatsRef = doc(db, "userchats", currentUser.id);
    const receiverChatsRef = doc(db, "userchats", user.id);

    try {
      // Fetch current user's chats
      const userChatsSnap = await getDoc(userChatsRef);
      if (userChatsSnap.exists()) {
        const userChats = userChatsSnap.data().chats;
        const updatedChats = userChats.filter(chat => chat.chatId !== chatId);
        // Update the user's chats
        await updateDoc(userChatsRef, { chats: updatedChats });
        console.log("User's chat list updated.");
      }

      const receiverChatsSnap = await getDoc(receiverChatsRef);
      if (receiverChatsSnap.exists()) {
        const receiverChats = receiverChatsSnap.data().chats;
        const updatedReceiverChats = receiverChats.filter(chat => chat.chatId !== chatId);
        await updateDoc(receiverChatsRef, { chats: updatedReceiverChats });
        console.log("Receiver's chat list updated.");
      }

    } catch (error) {
      console.error("Error deleting chat: ", error);
    }
  };

  return (
    <div className='rightsidebar w-[80%] max-w-[400px] bg-[#041D56] text-blue-100 rounded-lg p-8 h-full flex flex-col gap-6'>
      <div className="flex items-center gap-4">
        <img src={user?.avatar || p1} alt="Profile" className='w-10 h-10 rounded-full'/>
        <div>
          <span className="font-semibold text-lg">
            {user?.username.charAt(0).toUpperCase() + user?.username.slice(1)}
          </span>
          <p className="text-sm opacity-80">Love nature</p>
        </div>
      </div>

      <div className="chat-setting mt-4 flex flex-col gap-5">
        <div className="flex gap-3 items-center cursor-pointer" onClick={() => setShowMedia(!showMedia)}>
          <GoFileMedia />
          <h1 className="text-sm">Media and Docs</h1>
        </div>
        <div className="flex gap-3 items-center">
          <SiReactquery />
          <h1 className="text-sm">Wallpaper</h1>
        </div>
        <div className="flex gap-3 items-center">
          <IoIosNotifications />
          <h1 className="text-sm">Notification</h1>
        </div>
        <div className="flex gap-3 items-center">
          <MdSaveAlt />
          <h1 className="text-sm">Shared Photos</h1>
        </div>
      </div>

      {/* Media and Docs Section */}
      {showMedia && (
        <div className="media-docs mt-4">
          <h2 className="text-sm">Media Files</h2>
          <div className="media-gallery flex gap-4 mt-2">
            {mediaUrls.length > 0 ? (
              mediaUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Media ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ))
            ) : (
              <p className='text-sm'>No media available.</p>
            )}
          </div>
        </div>
      )}

      <div className="text-start mt-7">
        <button onClick={handleBlock} className="text-red-600 text-sm">
          {
            isCurrentUserBlocked ? 
              "You are Blocked" : 
              isReceiverBlocked ? 
                "User Blocked" : "Block User"
          }
        </button>
      </div>
      <div className="text-start">
        <button onClick={handleDeleteChat} className="text-sm text-red-600">
          Delete Chat
        </button>
      </div>
      <div className="text-start flex items-center gap-3">
        <button className="text-sm text-blue-500" onClick={() => auth.signOut()}>Log Out</button>
        <CiLogin />
      </div>
    </div>
  );
};

export default Details;
