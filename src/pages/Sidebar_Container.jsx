/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import { RxAvatar } from 'react-icons/rx';
import UserSideBar from './UserSideBar';
import { useMyContext } from './Chat_Container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../Redux/features/SidebarUserSlice';
import { getAllGroups } from '../Redux/features/GroupSlice';
import { Logout_User } from '../Redux/features/loginUser.js';
import { useNavigate } from 'react-router-dom';

const Sidebar_Container = () => {
  const { allow, setIsOpen } = useMyContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [isOpenThreeDot, setIsOpenThreeDot] = useState(false);

  const dropdownRef = useRef(null);

  // const LoginUser = useSelector((state)=>state.loggedInUser.userLogin);

  const loggedInUser = useCallback(
    () => JSON.parse(localStorage.getItem('LoginedUser')),
    []);

  const users = useSelector((state) => state.users);

  const All_groups = useSelector((state) => state.GroupCreated.AllGroups);
  
  const IsLogOut = useSelector((state) => state.loggedInUser.userLogout);

  const IsLogin = loggedInUser();
  
  // Filter groups and users
  const groups = All_groups?.filter((item) =>
    item?.user_id?.includes(IsLogin?.id)
  );

  const filtered_User = users.users?.filter(
    (item) => item.id !== IsLogin?.id
  );

  const All_Users = [...filtered_User, ...groups];

  useEffect(() => {
    const handleResize = (e) => setInnerWidth(e.target.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    console.log('IsLogin:',IsLogin);
    if (IsLogin) {
      dispatch(fetchAllUsers());
      dispatch(getAllGroups());
    }
  }, []);

  useEffect(() => {
    if (IsLogOut) navigate('/login');
  }, [IsLogOut, navigate]);

  const toggleDropdown = useCallback((e) => {
    e.stopPropagation();
    setIsOpenThreeDot((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpenThreeDot(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      className={`${
        allow ? 'translate-x-[-300px]' : 'translate-x-[0px]'
      } transition-all duration-700 min-h-[calc(100vh-40px)] w-[300px] bg-white border border-black`}
    >
      <div className='flex justify-between items-center px-3 h-[50px] w-full bg-green-600'>
        <div className='min-w-[90px] flex items-center justify-between'>
          <div className='flex flex-col'>
            <RxAvatar className='text-3xl relative top-2' />
            <GoDotFill className='cursor-pointer z-10 self-end text-md text-green-400' />
          </div>
          <h3 className='text-white font-semibold'>
            {IsLogin?.fullName}
          </h3>
        </div>
        <div className=''>
          <div className='relative inline-block' ref={dropdownRef}>
            <div
              className='cursor-pointer text-2xl text-gray-600 hover:text-gray-800'
              onClick={toggleDropdown}
            >
              <BsThreeDotsVertical className='cursor-pointer' />
            </div>
            {isOpenThreeDot && (
              <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md z-10'>
                <ul className='list-none p-0 m-0'>
                  <li
                    className='p-2 hover:bg-gray-100 cursor-pointer'
                    onClick={() => setIsOpenThreeDot(false)}
                  >
                    View Profile
                  </li>
                  <li
                    className='p-2 hover:bg-gray-100 cursor-pointer'
                    onClick={() => {
                      setIsOpenThreeDot(false);
                      setIsOpen(true);
                    }}
                  >
                    Create Group
                  </li>
                  <li
                    className='p-2 hover:bg-gray-100 cursor-pointer'
                    onClick={() => {
                      setIsOpenThreeDot(false);
                      dispatch(Logout_User());
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='h-[450px] overflow-y-auto border-gray-300 custom-scrollbar'>
        <div className=''>
          {All_Users?.length > 0 &&
            All_Users.map((user, index) => (
              <UserSideBar key={index} user={user} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar_Container;
