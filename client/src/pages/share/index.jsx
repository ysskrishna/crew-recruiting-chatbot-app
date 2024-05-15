import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { forkChat, getPublicChat } from "../../redux/api/chatApi";
import { selectPublicChat } from "../../redux/features/chatSlice";
import '../dashboard/styles.css'
import LoginWrapper from "../../components/LoginWrapper";
import { selectIsAuthenticated } from "../../redux/features/authSlice";


const Share = () => {
    let params = useParams();
    const chatId = params?.chatId;
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const publicChat = useSelector(selectPublicChat);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(()=> {
        if (chatId.length > 0) {
            dispatch(getPublicChat(chatId))
        }
    },[])

    useEffect(() => {
        if (publicChat?.content) {
            setMessages(publicChat?.content)
        } else {
            setMessages([]);
        }
    }, [publicChat])

    const handleFork =  () => {
        dispatch(forkChat(chatId, "/dashboard"))
    };
    
    return (
        <PageWrapper>
            <div className="flex flex-col">
                <div className="self-center my-5 w-4/5 max-w-[1200px] max-md:self-center max-md:w-[90%] max-sm:w-[90%]">
                
                <p className="text-center text-3xl">
                    Title: {publicChat?.title}
                </p>
                <div className="flex flex-col">
                    <p className="text-center mt-2">Please signin to fork and start working</p>
                    <div className="flex flex-row mt-5 justify-center gap-2">
                        {isAuthenticated ? 
                            <button
                                onClick={handleFork}
                                className="bg-[#ececec] hover:bg-gray-200 font-bold py-2 px-4 ml-2 rounded"
                            >
                            Fork
                            </button>
                        : <LoginWrapper redirectPath={`/share/${chatId}`} />
                    }
                    </div>
                </div>
                <hr class="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
            
                <div className="flex flex-col gap-5 max-h-[80%] py-2 overflow-y-auto mt-5">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={message.chat_message_type == "USER" ? "user" : "system"}
                    >
                    <p>{message.message}</p>
                    </div>
                ))}
                </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Share;