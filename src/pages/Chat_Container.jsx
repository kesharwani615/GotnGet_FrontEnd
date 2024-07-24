import React, { useContext, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaArrowLeft } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import Conversation_container from './Conversation_container';
import { Navigate, useNavigate } from 'react-router-dom';
import { createContext } from 'react';

const MyContext = createContext()

export const useMyContext = () => {
  return useContext(MyContext)
}

export const ContextProvider = ({children})=>{

  const [allow,setAllow] = useState(true);

  return( 
   <MyContext.Provider value={{allow,setAllow}}>
    {children}
  </MyContext.Provider>
  )
}

const Chat_Container = () => {

  const navigate = useNavigate();

  const {allow,setAllow} = useMyContext();
  
  console.log('allow:',allow)

  return (
    <div className="min-h-[500px] w-[300px] border border-black rounded-md">
       <div className='flex justify-between items-center px-3 h-[50px] w-full rounded-t-md bg-green-500'>
       {/* <FaArrowLeft onClick={()=>navigate('/sidebar')}/> */}
       <FaArrowLeft onClick={()=>setAllow(false)}/>
        <div>
            <h3 className='text-white font-semibold'>Shivam</h3>
        </div>
       <BsThreeDotsVertical/>
       </div>
      <Conversation_container/>
      <div className='w-full min-h-[100%] bg-white flex justify-between items-center border-t-[1px]'>
        <textarea type="text" placeholder='Enter Your Message' className='no-scrollbar resize-none min-w-[calc(100%-30px)] px-2 pt-2 min-h-10 w-full outline-none'/>
         <div className='h-full w-full'>
        <FaLocationArrow className='text-xl cursor-pointer'/> 
         </div>
      </div>
    </div>
  )
}

export default Chat_Container
