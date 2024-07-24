import React from 'react'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { useMyContext } from './Chat_Container'

const UserSideBar = () => {

  const {setAllow} = useMyContext()

  return (
    <div onClick={()=>setAllow(true)} className='flex h-[56.1px] w-full border-b-2 border-black cursor-pointer hover:bg-green-300 '>  
      <IoPersonCircleOutline className='text-[55px]'/>
      <div className='pl-2 py-[4px] text-[24px] '>
        Test
      </div>
    </div>
  )
}

export default UserSideBar
