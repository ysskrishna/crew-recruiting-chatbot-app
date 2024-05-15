import React, { useEffect, useState } from "react";

import PageWrapper from "../../components/PageWrapper";
import Sidebar from "./components/Sidebar";
import './styles.css';
import { useSelector, useDispatch } from "react-redux";
import { getAllChats, shareChat, updateChat } from '../../redux/api/chatApi';
import { selectChat, setChat } from '../../redux/features/chatSlice';
import { toastError } from "../../utils/toast";


const Dashboard = () => {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(null);

    const handleSendMessage = () => {
        if (newMessage.trim().length > 0) {
            console.log(chatId, newMessage);

            let data = {"message": newMessage}
            if (chatId){
                data["chat_id"] = chatId
            }
            dispatch(updateChat(data));
            setNewMessage('');
            dispatch(getAllChats());
        } else {
            toastError("Message should not be empty");
        }
    };

    const dispatch = useDispatch();
    const chat = useSelector(selectChat);

    useEffect(()=> {
        dispatch(getAllChats());
    },[]);

    useEffect(()=>{
        if (chat?.content) {
            setMessages(chat?.content)
            setChatId(chat?.chat_id);
        } else {
            setMessages([])
            setChatId(null);
        }
    },[chat])

    const handleNewChat = () => {
        dispatch(setChat({}));
    }

    const handleShare = () => {
        dispatch(shareChat(chatId))
    }

    return (
        <PageWrapper>
            <div className="flex md:flex-row flex-col md:h-screen relative items-center justify-center w-full h-screen self-center max-md:self-center max-md:w-[90%] max-sm:w-[90%]">
                <div className="flex flex-col w-full items-start md:w-[25%]">
                    <Sidebar onNewChat={handleNewChat} />
                </div>
                <div className="md:w-[75%] w-full flex flex-col p-4">
                    <div className="flex flex-col gap-5 fixed md:w-[70%] w-[85%] bottom-[100px] max-h-[80%] py-2 overflow-y-auto mt-5">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={message.chat_message_type == "USER" ? "user" : "system"}
                        >
                        <p>{message.message}</p>
                        </div>
                    ))}
                    </div>

                    {/* Input box and send button */}
                    <div className="flex items-center md:w-[70%] w-[90%]  justify-center fixed bottom-0 mb-6">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="border border-gray-300 rounded py-2 px-4 w-full"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-[#ececec] hover:bg-gray-200 font-bold py-2 px-4 ml-2 rounded"
                        >
                        Send
                        </button>
                        {
                            chatId && chatId.length > 0 &&  (
                                <button
                                    onClick={handleShare}
                                    className="bg-[#ececec] hover:bg-gray-200 font-bold py-2 px-4 ml-2 rounded"
                                >
                                Share
                                </button>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Dashboard;