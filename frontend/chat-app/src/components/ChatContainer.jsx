import React from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';

function ChatContainer() {
  const { messages, getMessages, isUsersLoading, isMessagesLoading, selectedUser } = useChatStore();


  if (isMessagesLoading){
     return (
   <div className='flex flex-1 flex-col overflow-auto'>
      <ChatHeader />

      <MessageSkeleton />

      <MessageInput />
    </div>)
  }
  return (
    <div className='flex flex-1 flex-col overflow-auto'>
      <ChatHeader />

      <p>messagewss</p>

      <MessageInput />
    </div>
  )
}

export default ChatContainer