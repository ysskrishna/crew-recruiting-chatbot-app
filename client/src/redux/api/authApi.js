import config from '../../config';
import {handleFetch} from '../common/api'
import { toastSuccess, toastError, toastInfo } from "../../utils/toast";
import { setAuth, setIsLoading } from '../features/authSlice';
import router from '../../utils/router';

export const login = (data, redirectPath="/dashboard") => async (dispatch) => {
    try {
      await dispatch(setIsLoading({isLoading:true}));
      const url = `${config?.baseUrl}/user/login`;
      const method = 'POST';
      const response = await handleFetch(url, method, data, true)
      console.log("login response", response);

      await dispatch(setAuth({
        accessToken: response?.result?.access_token,
        user: response?.result?.user,
        isAuthenticated: true
      }));
      if (redirectPath && redirectPath.length > 0) {
        await router.navigate(redirectPath);
      }
      toastSuccess('Login success');
    } catch (error) {
      await dispatch(setIsLoading({isLoading:false}));
      console.error('UnknownError:', error);
      toastError('Something went wrong. Please try again');
    }
};