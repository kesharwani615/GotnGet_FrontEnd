import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`
})

// let token = JSON.parse(localStorage.getItem('accessToken'));

// console.log("token:",token);

// console.log("import.meta.VITE_BASE_URL",import.meta.env.VITE_BASE_URL)

const getAllUser = () => API.get('/users/fetchAllUsers',{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
  },
})

const sendMessage = ({ data, id }) =>  API.post(`/messages/sendSingalUserMsg/${id}`,data,{
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        },
      });
  
const getMessage = (id) => API.get(`/messages/getSingalUserMsg/${id}`,{
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
    },
})

const CreateGroup = ({group,groupMember}) => API.post(`/group/groupCreator`,{group,groupMember},{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
  },
})

const getAllGroups = () => API.get(`/group/getAllGroups`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
  },
})

const getGroupMessage = (id) => API.get(`/group/getGroupMsg/${id}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
  },
})

const SendGroupMessage = ({data,id}) => API.post(`/group/sendGroupMsg/${id}`,data,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
  },
})

const login = (data) => API.post(`/users/login`,data);

const register = (data) => API.post(`/users/register`,data)

const logout = () => API.get(`/users/logout`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
  },
})

export {register,getAllUser,sendMessage,getMessage,login,logout,CreateGroup,getAllGroups,getGroupMessage,SendGroupMessage};