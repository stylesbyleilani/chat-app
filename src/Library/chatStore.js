


// import { doc, getDoc } from 'firebase/firestore';
// import { create } from 'zustand'
// import { db } from './firebase';
// import { useUserStore } from './userStore';

// export const useChatStore = create((set) => ({
//   chatId: null,
//   user:null,
//   isCurrentUserBlocked:false,
//   isReceiverBlocked:false,
    
//   changeChat:(chatId,user)=>{
//     const currentUser = useUserStore.getState().currentUser
//     //  checck i current user is blocked
//    if (user.blocked.includes(currentUser.id)){
//     return set({
//       chatId,
//       user:null,
//       isCurrentUserBlocked:true,
//       isReceiverBlocked:false,
//     })
//    }

//     // check i receiver is blocked
    
//     else if (currentUser.blocked.includes(user.id)){
//       return set({
//         chatId,
//         user:user,
//         isCurrentUserBlocked:false,
//         isReceiverBlocked:true,
//       })
//      }else{
    
//    return  set({
//       chatId,
//       user:null,
//       isCurrentUserBlocked:false,
//       isReceiverBlocked:false,
//     })
//   }
// // change the blocked action

//   changeBlock:()=>{
//     set((state)=>({...state, isReceiverBlocked: !state.isReceiverBlocked }))
//   }
//   }
// }))


import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from './firebase';
import { useUserStore } from './userStore';

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,

  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    // Check if the current user is blocked by the other user
    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // Check if the receiver (other user) is blocked by the current user
    if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    }

    // If no blocking is involved, set the chat with the other user
    return set({
      chatId,
      user,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },

  // Toggle the block status for the receiver
  changeBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },
}));
