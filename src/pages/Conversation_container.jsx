/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessageToUsers } from "../Redux/features/Send_AND_Get_Message";
import { useMyContext } from "./Chat_Container";
import { getGroupMessage } from "../Redux/features/GroupSlice";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useSocket } from "../Socket/Socket";

const Conversation_container = ({type,id}) => {

  const dispatch = useDispatch();

  const {User_Message,setUser_Message,Group_Message,setGroup_Message} = useMyContext();
  
  const MessageforUser = useSelector((state)=>state?.SendMessage?.userMessage);
  
  const MessageforGroup = useSelector((state)=>state?.GroupCreated?.GroupMessage);

 useEffect(()=>{
 setUser_Message(MessageforUser)
 },[MessageforUser]);

 useEffect(()=>{
 setUser_Message(MessageforGroup)
 },[MessageforGroup]);


  // const loggedInUser = useSelector((state) => state.loggedInUser.userLogin);
  const loggedInUser = JSON.parse(localStorage.getItem('LoginedUser'))

  useEffect(()=>{
  if(id && !type){
     dispatch(getMessageToUsers(id))
  }
  else if(id && type){
    dispatch(getGroupMessage(id))
  }
  },[id])

  return (
    <div className="custom-scrollbar flex flex-col-reverse p-3 gap-2 h-[calc(100vh-150px)] overflow-auto text-black bg-black">
      {type==='group' ? 
      Group_Message?.map((item,index)=>(
      <div key={index} className={`w-fit ${loggedInUser.id == item.SenderId?'self-end  bg-green-400':'self-start bg-white'} font-serif px-2 py-1 max-w-[60%] rounded-md  pt-1 break-words`}>
          <div className="flex gap-2">
          <IoPersonCircleOutline className='text-[30px]'/>
          <p className="pt-1 font-bold">
          {item.FULL_NAME}
          </p>
          </div>
          <p className="pl-2">
          {item.Message}
          </p>
      </div>
      ))
      :
      User_Message?.map((item,index)=>(
      <div key={index} className={`w-fit ${loggedInUser.id == item.SenderId?'self-end  bg-green-400':'self-start bg-white'} font-serif px-2 py-1 max-w-[60%] rounded-md  pt-1 break-words`}>
          {item.Message}
      </div>
      ))
      }

      {/* <div className="w-fit self-end px-2 py-1 max-w-[60%] rounded-md  pt-1 break-words bg-green-400">
        hello
      </div> */}
    </div>
  );
};

export default Conversation_container;