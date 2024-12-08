


import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import p1 from "../assets/p1.jpg";
import { db } from '../Library/firebase';
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { useUserStore } from '../Library/userStore';
import { IoIosSearch } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa6";

const AddUser = () => {
  const [user, setUser] = useState(null);
  const {currentUser,isLoading,fetchUserInfo} = useUserStore()

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q); 

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data()); 
      } else {
        console.log("User not found");
        toast.error("user not found")
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  const handleAdd = async () => {  
    
    try {
      const ChatRef = collection(db, "chats");
      const userChatRef = collection(db, "userchats");

      const newChatRef = doc(ChatRef);
  
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: []
      });


      
      await setDoc(doc(userChatRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        })
      }, { merge: true });
      
      await setDoc(doc(userChatRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        })
      }, { merge: true });
      
    
  
      console.log("New chat ID:", newChatRef.id);

    } catch (error) {
      console.log(error);
      console.error("Error adding chat document:", error);

    }
  };
  

  return (

             <div className=" 
        fixed inset-0 md:inset-auto rounded-md bg-blue-950
        md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
        w-full md:w-[400px] 

        h-[150px] md:h-[150px] flex flex-col  items-center justify-center mt-64 md:mt-0
        z-[70] border border-blue-900
       ">
      <form className='flex gap-5 justify-center item-center' onSubmit={handleSearch}>
        <input type="text" placeholder='Username' name='username' className='p-2 bg-gray-600 rounded-sm border-none outline-none'/>
        <button className='py-1 px-3 bg-gray-600 font-medium text-blue-100 rounded-md'> <IoIosSearch className='font-medium text-xl'/></button>
      </form>

      {user && (
        <div className="user mt-7 flex items-center justify-between">
          <div className="detail flex items-center gap-3">
            <img src={user.avatar || p1} alt="User Avatar" className='w-10 h-10 rounded-full'/>
            <span>{user.username}</span>
            <button onClick={handleAdd} className='py-2 px-3 bg-gray-600 font-medium text-blue-100 rounded-md cursor-pointer ml-7'><FaPlus className='font-medium text-lg'/> </button>

          </div>
        </div>             

      )}
      <ToastContainer/>
    </div> 
  );
}

export default AddUser;




















