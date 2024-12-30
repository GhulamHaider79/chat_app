import { create } from "zustand";
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create( (set, get) => (
    {
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    

    getUsers: async () => {
    set({isUsersLoading: true});
    try {
        const res = await axiosInstance.get('/messages/users');
        set({ users: res.data });
    } catch (error) {
        console.log("error in getting users in chat page", error.response.data.message);
        toast.error(error.response.data.message);
    }finally {
       set({ isUsersLoading: false})
    }
    },

    getMessages: async (userId) =>  {
        const {  messages } = get();
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);  
            set({ messages: res.data }); 
            
            set({isMessagesLoading: false}); 
        } catch (error) {
            console.log("error in getting Messages", error);
            
        }finally {
           set({ isUsersLoading: false})
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            
          const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
          
          set({ messages: [...messages, res.data] });
          
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },

// add real time get messages functionality now call this function chatContainer component 
subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },
// when user logout i will unsubscribe all messages
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },


    // todo: optimize this one late
    setSelectedUser: ( selectedUser ) => set({ selectedUser }),


    } 
));