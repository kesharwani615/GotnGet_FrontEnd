/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { useMyContext } from './Chat_Container'

const UserSideBar = ({user}) => {

  const {setAllow,DisplayingUser,setDisplayingUser} = useMyContext()

  const {id} = user;

  return (
    <div onClick={()=>{window.innerWidth<640?setAllow(true):setAllow(false),setDisplayingUser(user)}}  className='flex h-[56.1px] w-full border-b-2 border-black cursor-pointer hover:bg-green-300 '>  
      {!(user?.groupName)?
      <>
      <IoPersonCircleOutline className='text-[55px]'/>
      <div className='pl-2 py-[4px] text-[24px]' key={id}>
      { user.USER_NAME }
      </div>
      </>
      :
      <>
        <IoPersonCircleOutline className='text-[55px]'/>
      <div className='pl-2 py-[4px] text-[24px]' key={id}>
      { user.groupName }
      </div>
      </>
      }
    </div>
  )
}

export default UserSideBar
