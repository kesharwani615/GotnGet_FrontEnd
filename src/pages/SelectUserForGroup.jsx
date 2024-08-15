/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../Redux/features/SidebarUserSlice";
import { RxAvatar } from "react-icons/rx";
import { useMyContext } from "./Chat_Container";
import { groupCreatorSlice } from "../Redux/features/GroupSlice.js";

const SelectGroupMember = () => {
    
  const {isOpen,setIsOpen,loggedInUser} = useMyContext()

  const dispatch = useDispatch()

  const [searchQuery, setSearchQuery] = useState("");

  const [fields,setFields] = useState({GroupName:'',Member:[]});

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [users,setUsers] = useState([]);

  const allUsers = useSelector((state)=>state.users);

  useEffect(()=>{
    setUsers(allUsers.users);
  },[allUsers])

  useEffect(()=>{
      // dispatch(fetchAllUsers());
  },[])

  const createGroup = ()=>{
    // console.log("fields:",fields);
    const group = fields.GroupName;
    const groupMember = [...fields.Member];

    console.log(group,groupMember);
    dispatch(groupCreatorSlice({group,groupMember}))

    setFields({GroupName:'',Member:[]});
    toggleModal();
  }

  const removeMember = (id) => {
  console.log(id);
  }

return (
    <>
      {isOpen && (
        <div
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full"
          aria-hidden={!isOpen}
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create a group
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <span className="sr-only">Close modal</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <div class="mb-6">
                  <label
                    for="success"
                    class="block mb-2 text-sm font-medium"
                  >
                    Group name
                  </label>
                  <input
                    type="text"
                    id="success"
                    value={fields.GroupName}
                    onChange={(e)=>setFields({...fields,GroupName:e.target.value})}
                    class="bg-green-50  text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                    placeholder="Enter Group Name"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Member..."
                    required
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
                <div  className="ShowAddedMember">
                {users?.map((item,index)=>{

                 if(fields.Member.includes(item.id)){
                return (<div key={index} className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 m-1">
             <span className="text-sm font-medium text-gray-700 mr-2">{item.FULL_NAME}</span>
                    <button
        onClick={()=>removeMember(item.id)}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
                </div>  ) 
               }
                })}
                
            </div>

                <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8"> 
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Full Name</th>
                <th className="px-5 py-3">User Name</th>
                <th className="px-5 py-3">Add</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {users?.map(user => (
                <tr key={user.id}>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{user.id}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                      <p className="whitespace-no-wrap">{user.FULL_NAME}</p>
                      {/* <img className="h-full w-full rounded-full" src={'abc'} alt="" /> */}
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{user.USER_NAME}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <button type="button" onClick={()=>setFields({...fields,Member:[...fields.Member,user.id]})} id={user.id} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
          <span className="text-xs text-gray-600 sm:text-sm"> Showing 1 to 5 of {users?.length} Entries </span>
          <div className="mt-2 inline-flex sm:mt-0">
            <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Prev</button>
            <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>
               </div>

              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={()=>createGroup()}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                Create
                </button>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Cancle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectGroupMember;
