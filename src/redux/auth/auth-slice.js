import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, fetchCurrentUser } from './auth-operations';

const initialState = {
   user: { name: null, email: null },
   token: null,
   isLoggedIn: false,
   isRefreshing: false,
   isLoading: false,
   error: true,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   extraReducers: {
      [register.pending](state) {
         state.error = true;
         state.isLoading = true;
      },
      [register.fulfilled](state, action) {
         if (action.payload === 400) {
            return;
         }
         state.user = action.payload.user;
         state.token = action.payload.token;
         state.isLoggedIn = true;
         state.error = false;
         state.isLoading = false;
      },
      [register.rejected](state) {
         state.error = true;
         state.isLoading = false;
      },

      [logIn.pending](state) {
         state.error = true;
         state.isLoading = true;
      },
      [logIn.fulfilled](state, action) {
         state.isLoading = false;
         if (action.payload === 400) {
            return;
         }
         state.user = action.payload.user;
         state.token = action.payload.token;
         state.isLoggedIn = true;
         state.error = false;
      },
      [logIn.rejected](state) {
         state.error = true;
         state.isLoading = false;
      },

      [logOut.fulfilled](state) {
         state.user = { name: null, email: null };
         state.token = null;
         state.isLoggedIn = false;
         state.error = true;
      },

      [fetchCurrentUser.pending](state) {
         state.isRefreshing = true;
      },
      [fetchCurrentUser.fulfilled](state, action) {
         state.user = action.payload;
         state.isLoggedIn = true;
         state.isRefreshing = false;
      },
      [fetchCurrentUser.rejected](state) {
         state.isRefreshing = false;
      },
   },
});

export default authSlice.reducer;
