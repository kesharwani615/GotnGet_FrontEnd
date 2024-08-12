import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/SidebarUserSlice.js'
import Send_Msg from './features/Send_AND_Get_Message.js'
import loginReducer from './features/loginUser.js';
import GroupCreatorReducer from './features/GroupSlice.js';

const store = configureStore({
  reducer: {
    users: userSlice,
    SendMessage:Send_Msg,
    loggedInUser:loginReducer,
    GroupCreated:GroupCreatorReducer
    },
  });
  
  export default store;