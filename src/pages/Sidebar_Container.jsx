import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaLocationArrow } from "react-icons/fa";
import { GoDotFill } from 'react-icons/go';
import { RxAvatar } from 'react-icons/rx';
import UserSideBar from './UserSideBar';
import { useRef } from 'react';
import { useMyContext } from './Chat_Container';

const Sidebar_Container = () => {

  const {allow} = useMyContext();

  return (
    <div className={`${allow? 'translate-x-[-300px]':'translate-x-[0px]'} transition-all duration-700 min-h-[500px] w-[300px]  bg-white border border-black rounded-md`}>
       <div className='flex justify-between items-center px-3 h-[50px] w-full rounded-t-md bg-green-600'>
       <div className='min-w-[90px] flex items-center justify-between'>
        <div className='flex flex-col '>
        <RxAvatar className='text-3xl relative top-2'/>
        <GoDotFill className='cursor-pointer z-10 self-end text-md text-green-400'/>
        </div>
            <h3 className='text-white font-semibold'>Shivam</h3>
        </div>
       <BsThreeDotsVertical/>
       </div>
       <div className='h-[450px] overflow-y-auto border-gray-300 custom-scrollbar'>
        <div className=''>
       <UserSideBar/>
       <UserSideBar/>
       <UserSideBar/>
       <UserSideBar/>
       <UserSideBar/>
       <UserSideBar/>
       <UserSideBar/>
       <UserSideBar/>
       <UserSideBar/>
      
       </div>
       </div>
    </div>
  )
}

export default Sidebar_Container
