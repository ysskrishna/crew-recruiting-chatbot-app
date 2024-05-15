import React from "react"

const ChatTitle = ({ chat, onClick }) => {
  return (
    <div className="flex flex-col bg-[#f9f9f9] px-1 py-0.5">
      <button className="hover:bg-[#ececec] text-black font-bold py-2 px-2 rounded text-left truncate" onClick={()=> onClick(chat?.chat_id)}>
        {chat?.title}
      </button>
    </div>
  );
};

export default ChatTitle;