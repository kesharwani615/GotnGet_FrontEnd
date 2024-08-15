/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'
import Chat_Container, { useMyContext } from './pages/Chat_Container'
import './App.css'
import Sidebar_Container from './pages/Sidebar_Container'
import {io} from 'socket.io-client';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import {LoginForm} from './pages/Login';
import NotFound from './NotFount';
import UserProfile from './pages/UserProfile';
import SelectGroupMember from './pages/SelectUserForGroup';
import { jwtDecode } from 'jwt-decode';
import { Logout_User } from './Redux/features/loginUser';
import { useDispatch } from 'react-redux';
import Signup from './pages/Signup';

const App = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch();
  
  const token = JSON.parse(localStorage.getItem('accessToken')) || false;
  const [diffSeconds,setdiffSeconds] = useState();

  useEffect(()=>{

  if (token) {
    const decodedToken = jwtDecode(token);
    let intervalId;
  
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const diffInSeconds = Math.floor(decodedToken.exp - currentTimeInSeconds);
      console.log(diffInSeconds);
      ()=>setdiffSeconds(diffInSeconds);
  
      if (diffInSeconds <= 0) {
        localStorage.clear();
        dispatch(Logout_User());
        navigate('/login');
      }
  }
  },[])

  return (
    <div>
    <Routes>
    <Route path="/" element={token?<Chat_Container/>:<Navigate to={'/login'}/>} />
    <Route path="/profile" element={<UserProfile/>} />
    <Route path="/GroupMember" element={<SelectGroupMember/>}/>
    <Route path="/login" element={<LoginForm />}/>
    <Route path="/signup" element={<Signup />}/>
    <Route path="*" element={ <NotFound/> }/>
    </Routes>

    <SelectGroupMember/>
    </div>
       )
}

export default App