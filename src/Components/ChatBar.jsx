

import React, { useEffect, useState } from 'react';
import p1 from "../assets/p1.jpg";
import { FaPhoneAlt, FaVideo } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../Library/firebase';
import { useChatStore } from '../Library/chatStore';
import { useUserStore } from '../Library/userStore';
import upload from '../Library/Upload';
import { Paperclip, Send, Smile } from 'lucide-react';

const ChatBar = () => {
  const [emoji, setEmoji] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const [callStatus, setCallStatus] = useState(null);

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const { currentUser } = useUserStore();

  const handleVoiceCall = () => {
    setCallStatus('voice');
  };

  const handleVideoCall = () => {
    setCallStatus('video');
  };

  const handleEndCall = () => {
    setCallStatus(null);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleEmoji = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => unSub();
  }, [chatId]);

  const handleSend = async () => {
    if (!currentUser || !chatId) return;
    if (!text.trim() && !img.file) return;

    try {
      if (img.file) {
        const imgUrl = await upload(img.file);
        
        const imageMessage = {
          senderId: currentUser.id,
          text: "",
          img: imgUrl,
          createdAt: new Date(),
          type: "image"
        };

        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion(imageMessage)
        });

        setChat((prevChat) => ({
          ...prevChat,
          messages: [...(prevChat?.messages || []), imageMessage]
        }));

        setImg({ file: null, url: "" });
      }

      if (text.trim()) {
        const textMessage = {
          senderId: currentUser.id,
          text: text.trim(),
          createdAt: new Date(),
          type: "text"
        };

        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion(textMessage)
        });

        setChat((prevChat) => ({
          ...prevChat,
          messages: [...(prevChat?.messages || []), textMessage]
        }));

        setText("");
      }

      const userChatRef = doc(db, "userchats", currentUser.id);
      const userChatSnapshot = await getDoc(userChatRef);

      if (userChatSnapshot.exists()) {
        const userChatData = userChatSnapshot.data();
        const chatIndex = userChatData.chats?.findIndex((c) => c.chatId === chatId);

        if (chatIndex !== -1) {
          userChatData.chats[chatIndex].lastMessage = text.trim() || "Sent an image";
          userChatData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatData.chats
          });
        }
      }
      
      // Close emoji picker after sending
      setEmoji(false);

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className='chatbar text-gray-500 bg-gray-900 w-full h-full flex flex-col'>
      {/* Call notification UI */}
      {callStatus && (
        <div className='absolute top-0 left-0 right-0 bg-blue-900 text-white p-2 flex justify-between items-center'>
          <span>{callStatus === 'voice' ? 'Voice' : 'Video'} Call in Progress</span>
          <button onClick={handleEndCall} className='text-red-500'>End Call</button>
        </div>
      )}

      {/* Chat Header */}
      <div className='flex items-center bg-gray-800 justify-between p-3'>
        <div className="profile flex items-center gap-3">
          <img src={user?.avatar || p1} alt="Profile" className='w-10 h-10 rounded-full'/>
          <div className="flex flex-col gap-1">
            <h1 className='font-medium text-xl text-gray-200'>
              {user?.username.charAt(0).toUpperCase() + user?.username.slice(1)}
            </h1>
            <div className="flex gap-1 items-center text-sm text-gray-400">
              <span className="bg-green-400 w-2 h-2 rounded-full"></span>
              <p>Online</p>
            </div>
          </div>
        </div>
        <div className="icons flex items-center gap-3 text-gray-100">
          <div onClick={handleVoiceCall} className="bg-neutral-600 p-2 rounded-full cursor-pointer"><FaPhoneAlt/></div>
          <div onClick={handleVideoCall} className="bg-neutral-600 p-2 rounded-full cursor-pointer"><FaVideo/></div>
          <div className="bg-neutral-600 p-2 rounded-full"><HiOutlineDotsVertical/></div>
        </div>
      </div>

      <div className="hide-scrollbar text-center p-2 text-gray-400">
        <span className="text-sm text-gray-400">{formatDate(new Date())}</span>
      </div>

      {/* Messages Section */}
      <div className="chats flex-1 overflow-y-auto p-3 space-y-3">
        {chat?.messages?.map((message, index) => (
          <div key={index} className={`flex items-start gap-2 ${message.senderId === currentUser.id ? 'justify-end' : ''}`}>
            {/* <img src={p1} alt="Profile" className='w-7 h-7 object-cover rounded-full' /> */}
                         <img src={user?.avatar || p1} className='w-7 h-7 object-cover rounded-full'/>

            <div className={`px-4 py-3 rounded-lg max-w-xs ${message.senderId === currentUser.id ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300'}`}>
              <p>{message.text}</p>
              {message.img && <img src={message.img} alt="Attachment" className='w-20 h-20 mt-2' />}
            </div>
          </div>
        ))}

        {img.url && (
          <div className="preview flex justify-end p-3">
            <img src={img.url} alt="Preview" className='w-32 h-32 object-cover' />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <label 
              htmlFor="file"
              className="p-2 text-gray-400 hover:text-gray-300 cursor-pointer transition-colors"
            >
              <Paperclip className="w-6 h-6" />
            </label>
            <input 
              type="file" 
              id="file" 
              accept="image/*"
              className="hidden" 
              onChange={handleImg}
              disabled={isCurrentUserBlocked || isReceiverBlocked}
            />
          </div>

          <div className="flex-1 bg-gray-700 rounded-lg">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isCurrentUserBlocked || isReceiverBlocked}
                placeholder={isCurrentUserBlocked || isReceiverBlocked ? "You can't send messages" : "Type a message..."}
                className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              
              <div className="relative">
                <button 
                  onClick={() => setEmoji(!emoji)}
                  className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
                  disabled={isCurrentUserBlocked || isReceiverBlocked}
                >
                  <Smile className="w-6 h-6" />
                </button>
                
                {emoji && (
                  <div className="absolute bottom-12 right-0 z-50">
                    <div className="shadow-lg rounded-lg">
                      <EmojiPicker
                        onEmojiClick={handleEmoji}
                        width={300}
                        height={400}
                        theme="dark"
                        searchPlaceholder="Search emoji..."
                        previewConfig={{
                          showPreview: false
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={(!text.trim() && !img.file) || isCurrentUserBlocked || isReceiverBlocked}
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBar;


