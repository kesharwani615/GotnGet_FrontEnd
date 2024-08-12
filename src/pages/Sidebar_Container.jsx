/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import { RxAvatar } from 'react-icons/rx';
import UserSideBar from './UserSideBar';
import { useMyContext } from './Chat_Container';
import { useDispatch , useSelector} from 'react-redux';
import { fetchAllUsers } from '../Redux/features/SidebarUserSlice';
import { getAllGroups } from '../Redux/features/GroupSlice';

const Sidebar_Container = () => {

  const {allow,setIsOpen} = useMyContext();

  const dispatch = useDispatch()

  const [innerWidth,setInnerWidth] = useState(null);

  window.addEventListener('resize',(e)=>setInnerWidth(e.target.innerWidth))

  const loggedInUser = JSON.parse(localStorage.getItem('LoginedUser'))

  const users = useSelector((state) => state.users);
  
  const All_groups = useSelector((state) => state.GroupCreated.AllGroups);

  //filter the group if the current user does not exist on that group, group will not shown;
  const groups = All_groups?.filter((item,index)=>item?.user_id?.includes(loggedInUser.id));

  //filter the current user
  const filtered_User = users.users?.filter((item)=>item.id !== loggedInUser.id);

  const All_Users = [...filtered_User,...groups]

  useEffect(()=>{
    dispatch(fetchAllUsers());
    dispatch(getAllGroups());
  },[])

  const [isOpenThreeDot, setIsOpenThreeDot] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event from bubbling to the document
    setIsOpenThreeDot((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    // console.log("e.target:",e.target);
    // console.log(dropdownRef.current , !dropdownRef.current.contains(e.target))
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpenThreeDot(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return( 
    <div className={`${allow ? 'translate-x-[-300px]':'translate-x-[0px]'} transition-all duration-700 min-h-[calc(100vh-40px)] w-[300px] bg-white border border-black `}>
       <div className='flex justify-between items-center px-3 h-[50px] w-full bg-green-600'>
       <div className='min-w-[90px] flex items-center justify-between'>
        <div className='flex flex-col '>
        <RxAvatar className='text-3xl relative top-2'/>
        <GoDotFill className='cursor-pointer z-10 self-end text-md text-green-400'/>
        </div>
            <h3 className='text-white font-semibold'>{loggedInUser.fullName}</h3>
        </div>
       <div className=''>
       <div className="relative inline-block" ref={dropdownRef}>
      <div
        className="cursor-pointer text-2xl text-gray-600 hover:text-gray-800"
        onClick={toggleDropdown}
      >
       <BsThreeDotsVertical className='cursor-pointer'/>
       </div>
      {isOpenThreeDot && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md z-10">
          <ul className="list-none p-0 m-0">
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsOpenThreeDot(false)}
            >
            View Profile
             </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() =>{ setIsOpenThreeDot(false),setIsOpen(true)}}
            >
            Create Group
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsOpenThreeDot(false)}
            >
             option 3
            </li>
          </ul>
        </div>
      )}
    </div>
       </div>
       </div>
       <div className='h-[450px] overflow-y-auto border-gray-300 custom-scrollbar'>
        <div className=''>
        {
        All_Users.length>0 && All_Users?.map((user,index)=> <UserSideBar key={index} user={user}/>)
        }        
       </div>
       </div>
    </div>
  )
}

export default Sidebar_Container
