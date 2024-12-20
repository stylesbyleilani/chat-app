













import React, { useEffect, useState } from 'react';
import RightSideBar from '../Components/RightSideBar';
import LeftSideBar from '../Components/LeftSideBar';
import ChatBar from '../Components/ChatBar';
import Login from './Login';
import Notiication from '../Components/Notiication';
import Details from '../Components/Details';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Library/firebase';
import { useUserStore } from '../Library/userStore';
import { useChatStore } from '../Library/chatStore';
import { Menu, X, MessageCircle, Info } from 'lucide-react';

const HomePage = () => {
  const { chatId } = useChatStore();
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const [showSidebar, setShowSidebar] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  useEffect(() => {
    if (chatId && window.innerWidth < 768) {
      setShowSidebar(false);
      setShowDetails(false);
    }
  }, [chatId]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#041D56]">
        <div className="flex items-center gap-2 p-4 bg-green-500 rounded-lg">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Login />;
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  return (
    <div className="h-screen bg-[#041D56] overflow-hidden">
      <div className="hidden md:flex h-full">
        <div className={`${chatId && showDetails ? 'w-[300px]' : 'w-[350px]'} h-full border-r border-gray-700 flex-shrink-0 transition-all duration-300`}>
          <LeftSideBar />
        </div>

        <div className="flex-1 h-full flex flex-col relative">
          {chatId ? (
            <>
              <div className="absolute top-0 right-1 z-10 mt-4">
                <button
                  onClick={toggleDetails}
                  className="p-2 text-white  hover:bg-gray-700 rounded-full transition-colors"
                >
                  <Info className={`w-8 h-8  ${showDetails ? 'text-neutral-600' : 'text-neutral-600'}`} />
                </button>
              </div>
              <ChatBar />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col gap-4 bg-gray-800">
              <MessageCircle className="w-16 h-16 text-gray-400" />
              <p className="text-gray-400 text-lg">Select a chat to start messaging</p>
            </div>
          )}
        </div>

        {chatId && (
          <div 
            className={`w-[300px] h-full transition-all duration-300 border-l border-gray-700 bg-[#041D56] ${
              showDetails ? 'translate-x-0' : 'translate-x-full'
            } flex-shrink-0`}
          >
            <div className="h-full overflow-y-auto">
              <Details />
            </div>
          </div>
        )}
      </div>

      <div className="md:hidden h-full relative">
        <div className="h-16 bg-[#041D56] flex items-center justify-between px-4 border-b border-gray-700">
          <button
            onClick={() => {
              setShowSidebar(!showSidebar);
              setShowDetails(false);
            }}
            className="p-2 text-white hover:bg-gray-700 rounded-full"
          >
            {showSidebar ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-white text-lg font-semibold">Lerrap</h1>
          {chatId && (
            <button
              onClick={toggleDetails}
              className="p-2 text-white hover:bg-gray-700 rounded-full"
            >
              <Info className={`w-6 h-6 ${showDetails ? 'text-blue-400' : 'text-gray-400'}`} />
            </button>
          )}
        </div>

        <div className="h-[calc(100%-4rem)] relative">
          <div 
            className={`absolute inset-0 bg-[#041D56] transform transition-transform duration-300 z-20 ${
              showSidebar ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <LeftSideBar />
          </div>

          <div 
            className={`absolute inset-0 bg-[#041D56] transform transition-transform duration-300 ${
              showSidebar ? 'translate-x-full' : 'translate-x-0'
            }`}
          >
            {chatId ? (
              <ChatBar />
            ) : (
              <div className="flex-1 flex items-center justify-center flex-col gap-4">
                <MessageCircle className="w-16 h-16 text-gray-400" />
                <p className="text-gray-400 text-lg text-center px-4">
                  Select a chat to start messaging
                </p>
              </div>
            )}
          </div>

          {chatId && (
            <div 
              className={`absolute inset-0 bg-[#041D56] transform transition-transform duration-300 z-30 ${
                showDetails ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="h-16 flex items-center px-4 border-b border-gray-700">
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 text-white hover:bg-gray-700 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="ml-4 text-white text-lg font-semibold">Chat Details</h2>
              </div>
              <div className="h-[calc(100%-4rem)] overflow-y-auto">
                <Details />
              </div>
            </div>
          )}
        </div>
      </div>

      <Notiication />
    </div>
  );
};

export default HomePage;