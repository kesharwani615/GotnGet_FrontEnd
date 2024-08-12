/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaArrowLeft } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import Conversation_container from './Conversation_container';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { SendMessageToUsers } from '../Redux/features/Send_AND_Get_Message';
import Sidebar_Container from './Sidebar_Container';
import { SendGroupMessage } from '../Redux/features/GroupSlice';
import { useSocket } from '../Socket/Socket';

const MyContext = createContext('')

export const useMyContext = () => {
  return useContext(MyContext)
}

export const ContextProvider = ({children})=>{

  const [allow,setAllow] = useState(false);

  const [DisplayingUser,setDisplayingUser] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const [User_Message,setUser_Message] = useState([]);

  const [Group_Message,setGroup_Message] = useState([]);

  return( 
   <MyContext.Provider value={{allow,setAllow,DisplayingUser,setDisplayingUser,isOpen,setIsOpen,User_Message,setUser_Message,Group_Message,setGroup_Message}}>
    {children}
  </MyContext.Provider>
  )
}

const Chat_Container = () => {

  const dispatch = useDispatch()

  const sentMessage = useSelector((state)=>state?.SendMessage?.message_sent);

  const [InstantMessage,setInstantMessage] = useState([]);
  
  const {User_Message,setUser_Message,Group_Message,setGroup_Message} = useMyContext()


    // console.log(socket);
    const {socket} = useSocket();

    useEffect(()=>{
      console.log('called!!!!',socket)
        socket && socket.on('new_Message',(message)=>{
            setInstantMessage(message);
          })

        return () => {
            socket && socket?.off("new_Message");
            }
    },[socket,sentMessage])

    useEffect(()=>{
      setUser_Message([...InstantMessage,...User_Message]);//adding message for showing instantly
    },[InstantMessage])
  
  const [innerWidth,setInnerWidth] = useState(window.innerWidth);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  window.addEventListener('resize',(e)=>setInnerWidth(e.target.innerWidth));

  const {allow,setAllow,DisplayingUser} = useMyContext();

  const onSubmit = (data) => {
    const id = DisplayingUser?.id;
    const type = DisplayingUser?.type;
    if(id && !type)
    dispatch(SendMessageToUsers({data,id}));
    else if(id && type)
    dispatch(SendGroupMessage({data,id}))
    reset();
   };
 
  return (
    <div className='custom relative flex justify-center items-center min-h-[100vh]'>
      <div className={`overflow-hidden absolute sm:static ${!allow?'z-10':'z-0'}`}>
      <Sidebar_Container/>
     </div>
   <div className={`absolute sm:static ${allow?'z-10':'z-0'} min-h-[calc(100vh-200px)] md:w-[calc(100vw-300px)] w-[300px] border border-black`}>
       <div className='flex justify-between items-center px-3 h-[50px] w-full bg-green-500'>
       {/* <FaArrowLeft onClick={()=>navigate('/sidebar')}/> */}
       {
        innerWidth < 640 &&
         <FaArrowLeft onClick={()=>setAllow(false)}/>
         
       }
        <div>
            <h3 className='text-white font-semibold'>{DisplayingUser?.type==='group'? DisplayingUser.groupName : DisplayingUser?.FULL_NAME }</h3>
        </div>
       <BsThreeDotsVertical/>
       </div>
      <Conversation_container type={DisplayingUser?.type}  id={DisplayingUser?.id} />
      <form onSubmit={handleSubmit(onSubmit)} className='w-full min-h-[100%] bg-white flex justify-between items-center border-t-[1px]'>
        <textarea type="text" placeholder='Enter Your Message' 
        id="Message"
        {...register('message', { required: 'Text is Required' })}
        className='no-scrollbar resize-none min-w-[calc(100%-30px)] px-2 pt-2 min-h-10 w-full outline-none'
        />
         <button type="submit" className='h-full w-full'>
        <FaLocationArrow  className='text-xl cursor-pointer'/> 
         </button>
      </form>
    </div>
    </div>
  )
}

export default Chat_Container
