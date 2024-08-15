/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessageToUsers } from "../Redux/features/Send_AND_Get_Message";
import { useMyContext } from "./Chat_Container";
import { getGroupMessage } from "../Redux/features/GroupSlice";
import { IoPersonCircleOutline } from "react-icons/io5";

const Conversation_container = ({ group, id }) => {
  const dispatch = useDispatch();

  const {
    socket,
    User_Message,
    setUser_Message,
    Group_Message,
    setGroup_Message,
  } = useMyContext();

  const MessageforUser = useSelector((state) => state?.SendMessage?.userMessage);
  const MessageforGroup = useSelector(
    (state) => state?.GroupCreated?.GroupMessage
  );

  const loggedInUser = JSON.parse(localStorage.getItem("LoginedUser"));

  useEffect(() => {
    if (MessageforUser.length) {
      setUser_Message(MessageforUser);
    }
  }, [MessageforUser]);

  useEffect(() => {
    if (MessageforGroup.length) {
      setGroup_Message(MessageforGroup);
    }
  }, [MessageforGroup]);

  useEffect(() => {
    if (id) {
      if (!group?.type) {
        dispatch(getMessageToUsers(id));
      } else {
        // Joining the group when someone opens the group container
        socket?.emit("join_room", group.groupName);
        dispatch(getGroupMessage(id));
      }
    }
  }, [id, group?.type, socket, dispatch]);

  return (
    <div className="custom-scrollbar flex flex-col-reverse p-3 gap-2 h-[calc(100vh-150px)] overflow-auto text-black bg-black">
      {(group?.type === "group" ? Group_Message : User_Message)?.map(
        (item, index) => (
          <div
            key={index}
            className={`w-fit ${
              loggedInUser.id === item.SenderId
                ? "self-end bg-green-400"
                : "self-start bg-white"
            } font-serif px-2 py-1 max-w-[60%] rounded-md pt-1 break-words`}
          >
            {group?.type === "group" && (
              <div className="flex gap-2">
                <IoPersonCircleOutline className="text-[30px]" />
                <p className="pt-1 font-bold">{item.FULL_NAME}</p>
              </div>
            )}
            <p className="pl-2">{item.Message}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Conversation_container;
