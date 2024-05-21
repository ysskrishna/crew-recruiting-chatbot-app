import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import closeicon from "../../../assets/close-icon.png";
import menuicon from "../../../assets/menuicon.png";

import ChatTitle from "./ChatTitle";
import { logoutUser, selectUser } from "../../../redux/features/authSlice";
import { selectChats } from "../../../redux/features/chatSlice";
import { getChat } from "../../../redux/api/chatApi";

const Sidebar = ({ onNewChat }) => {
  const dispatch = useDispatch();

  const chats = useSelector(selectChats);
  const user = useSelector(selectUser);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Function to check if the screen size is mobile
    const isMobileScreen = () => window.innerWidth < 768;

    // Set initial state based on screen size
    setIsSidebarOpen(!isMobileScreen());
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isSidebarOpen ? (
        <div
          className={`flex flex-col justify-between bg-[#f9f9f9] p-4 w-[85%] z-10 h-screen ${
            isSidebarOpen ? "" : "hidden"
          }`}
        >
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
            <h3 className="text-2xl font-bold text-start p-4 ml-0">History</h3>
            <img
              src={closeicon}
              alt="closeicon"
              className="w-6 h-6 self-center  cursor-pointer md:hidden"
              onClick={toggleSidebar}
            />
            </div>
            
            
            <div className="overflow-y-auto">
              {chats?.map(chat => (<ChatTitle chat={chat} onClick={(chat_id)=> {dispatch(getChat(chat_id))}} />))}
            </div>
          </div>
          <div className="flex flex-col  justify-end">
            <div className="my-2 text-lg mx-auto">Welcome, <span className="italic">{user?.name}</span></div>
            <button
              className="bg-[#ececec] hover:bg-gray-200  font-bold py-2 px-4 rounded"
              onClick={onNewChat}
            >
              New Chat
            </button>
            <button
              className="bg-[#ececec] hover:bg-gray-200  font-bold  py-2 px-4 rounded mt-4"
              onClick={()=> dispatch(logoutUser())}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="relative h-screen px-4 ">
          <img
            src={menuicon}
            className="w-8 h-10 top-0 mt-4 fixed cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
      )}
    </>
  );
};
export default Sidebar;