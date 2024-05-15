import config from '../../config';

export const login = (data) => async (dispatch) => {
    try {
      console.log("data", data);
      console.log("baseUrl", config?.baseUrl)
    } catch (error) {
      console.error('UnknownError:', error);
    }
};