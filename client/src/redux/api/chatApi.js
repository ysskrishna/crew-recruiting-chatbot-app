import config from '../../config';
import {handleFetch} from '../common/api'
import { toastSuccess, toastError } from "../../utils/toast";
import { setChat, setChats, setPublicChat } from '../features/chatSlice';
import router from '../../utils/router';


export const getAllChats = () => async (dispatch) => {
    try {
      const url = `${config?.baseUrl}/chat/all`;
      const method = 'GET';
      const response = await handleFetch(url, method)
      console.log("getAllChats response", response);

      await dispatch(setChats({
        chats: response?.result
      }));
      if (response?.result?.length > 0){
        await dispatch(setChat({
          chat: response?.result?.[0]
        }));
        await dispatch(getAllChats());
      }
    } catch (error) {
      console.error('UnknownError:', error);
      toastError('Unable to fetch user chats');
    }
};

export const getChat = (chatId) => async (dispatch) => {
    try {
      const url = `${config?.baseUrl}/chat/${chatId}`;
      const method = 'GET';
      const response = await handleFetch(url, method)
      console.log("getChat response", response);

      await dispatch(setChat({
        chat: response?.result
      }));
    } catch (error) {
      console.error('UnknownError:', error);
      toastError('Unable to fetch user chat');
    }
};

export const updateChat = (data) => async (dispatch) => {
  try {
    const url = `${config?.baseUrl}/chat`;
    const method = 'POST';
    const response = await handleFetch(url, method, data);
    console.log("updateChat response", response);

    await dispatch(setChat({
      chat: response?.result
    }));
  } catch (error) {
    console.error('UnknownError:', error);
    toastError('Unable to fetch user chat');
  }
};


export const shareChat = (chatId) => async (dispatch) => {
  try {
    const url = `${config?.baseUrl}/chat/${chatId}/share`;
    const method = 'GET';
    const response = await handleFetch(url, method)
    console.log("shareChat response", response);

    window.open(`/share/${chatId}`, '_blank');
    toastSuccess('Share chat success');
  } catch (error) {
    console.error('UnknownError:', error);
    toastError('Unable to share user chat');
  }
};

export const getPublicChat = (chatId) => async (dispatch) => {
  try {
    const url = `${config?.baseUrl}/chat/${chatId}/public`;
    const method = 'GET';
    const response = await handleFetch(url, method, null, true)
    console.log("getPublicChat response", response);
    
    await dispatch(setPublicChat({
      publicChat: response?.result
    }));
  } catch (error) {
    console.error('UnknownError:', error);
    toastError('Unable to get public chat');
  }
};


export const forkChat = (chatId, redirectPath="/dashboard") => async (dispatch) => {
  try {
    const url = `${config?.baseUrl}/chat/${chatId}/fork`;
    const method = 'GET';
    const response = await handleFetch(url, method, null)
    console.log("forkChat response", response);
    
    if (redirectPath && redirectPath.length > 0) {
      await router.navigate(redirectPath);
    }
    toastSuccess('Fork chat success');
  } catch (error) {
    console.error('UnknownError:', error);
    toastError('Unable to fork public chat');
  }
};