import React, { useEffect } from 'react'
import Chat_Container, { useMyContext } from './pages/Chat_Container'
import './App.css'
import Sidebar_Container from './pages/Sidebar_Container'
import {io} from 'socket.io-client';

const App = () => {

  const {allow} = useMyContext();

  useEffect(() => {
			const socket = io('http://localhost:5600/');
      console.log(socket);

			return () => socket.close();
	},[]);

  return (
    <div className='relative flex justify-center items-center min-h-[100vh]'>
     <div className={`absolute ${allow?'z-10':'z-0'}`}>
      <Chat_Container/>
     </div>
     <div className={`overflow-hidden absolute ${!allow?'z-10':'z-0'}`}>
      <Sidebar_Container/>
     </div>

     {/* <Routes>
     <Route path="/" element={<Chat_Container />}/>
     <Route path="/sidebar" element={<Sidebar_Container />}/>
     </Routes> */}
     
    </div>
  )
}

export default App