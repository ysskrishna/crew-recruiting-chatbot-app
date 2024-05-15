import store from "../store";
import { selectAccessToken } from "../features/authSlice";

const handleFetch = async (url, method, body, isPublic=false) => {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    if (!isPublic) {
        const accessToken = selectAccessToken(store.getState());

        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }
    }
    
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
  
    return response.json();
};

