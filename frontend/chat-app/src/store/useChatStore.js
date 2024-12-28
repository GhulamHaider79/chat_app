import { create } from "zustand";
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';


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
        const res = await axiosInstance.get('/message/users');
        set({ users: res.data });
    } catch (error) {
        console.log("error in getting users in chat page", error.response.data.message);
        toast.error(error.response.data.message);
    }finally {
       set({ isUsersLoading: false})
    }
    },

    getMessages: async () =>  {
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/message/${userId}`, data);
            set({ users: res.data });
            
        } catch (error) {
            console.log("error in getting Messages", error.message);
            toast.error(error.response.data.message);
        }finally {
           set({ isUsersLoading: false})
        }
    },

    sendMessage: async (messageData) => {
    const { messages, selectedUser } = get();
   try {
    const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
    set({ messages: [...messages, res.data] });
   } catch (error) {
    console.log("error in sending Messages", error.message);
    toast.error(error.response.data.message);
   }

    },

    // todo: optimize this one late
    setSelectedUser: ( selectedUser ) => set({ selectedUser }),


    } 
));