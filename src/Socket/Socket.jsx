/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

export const useSocket = () => {

    const [socket,setSocket] = useState();

    const LoggedInUser = JSON.parse(localStorage.getItem('LoginedUser'));
   
    useEffect(() => {
      const socket = io('http://localhost:5600/',{
          query:{
            userId: LoggedInUser.id,
          }
        });
        setSocket(socket)
        console.log(socket);
   
        return () => socket.close();
    },[]);
   
     return {socket};
}

