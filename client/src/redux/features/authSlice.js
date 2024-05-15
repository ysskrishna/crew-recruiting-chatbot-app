import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    userId: null,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setAuth: (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.userId = action.payload.userId;
        state.isAuthenticated = action.payload.isAuthenticated? true : false;
    },
    logoutUser: (state) => {
      state.accessToken = null;
      state.userId = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setAuth, logoutUser } = authSlice.actions;

// selectors
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;


export default authSlice.reducer;
