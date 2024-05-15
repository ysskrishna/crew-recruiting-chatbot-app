import { createSlice } from '@reduxjs/toolkit';


export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    chat: {},
    publicChat: {}
  },
  reducers: {
    setChats: (state, action) => {
        state.chats = action.payload.chats;
    },
    setChat: (state, action) => {
      state.chat = action.payload.chat;
    },
    setPublicChat: (state, action) => {
      state.publicChat = action.payload.publicChat;
    },
  },
});

export const { setChats, setChat, setPublicChat } = chatSlice.actions;

// selectors
export const selectChats = (state) => state.chat.chats;
export const selectChat = (state) => state.chat.chat;
export const selectPublicChat = (state) => state.chat.publicChat;

export default chatSlice.reducer;
