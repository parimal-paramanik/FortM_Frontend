import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('userToken'),
    token: localStorage.getItem('userToken') || null,
    email:null,
    role:null
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.role = action.payload.role
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      state.role = null ;
    },
  },
});

export const { login, logout} = authSlice.actions;
export default authSlice.reducer;
