/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Chat_Container, { useMyContext } from './pages/Chat_Container'
import './App.css'
import Sidebar_Container from './pages/Sidebar_Container'
import {io} from 'socket.io-client';
import { Route, Routes } from 'react-router-dom';
import {LoginForm} from './pages/Login';
import NotFound from './NotFount';
import UserProfile from './pages/UserProfile';
import SelectGroupMember from './pages/SelectUserForGroup';

const App = () => {
  
  // const {socket} = useSocketIo();

  return (
    <div>
    <Routes>
    <Route path="/" element={<Chat_Container/>} />
    <Route path="/profile" element={<UserProfile/>} />
    <Route path="/GroupMember" element={<SelectGroupMember/>} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="*" element={ <NotFound/> } />
    </Routes>

    <SelectGroupMember/>
    </div>
       )
}

export default App