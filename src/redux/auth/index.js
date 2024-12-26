import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state) {
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
