import { createSlice } from "@reduxjs/toolkit";
import {apiCall} from "../api.js";

export const slice = createSlice({
  name: "usersData",
  initialState: {
    fullName: null,
    userToken: null,
    userData: null,
    logout: false,
  },
  reducers: {
    logOutUser: (state,action) => {
      state.logout = true;
    },
    getUser: (state,action) => {
      if (action.payload.data.success){
        state.userToken = action.payload?.data?.accessToken;
        state.logout = false;
        state.userData = action.payload?.data?.userResponseDto;

      }
    },
  },
});

export const userLogin = (data) => apiCall({
  url: '/user/login',
  method: 'post',
  data,
  onSuccess: slice.actions.getUser.type,
  onFail: slice.actions.getUser.type
})

export const { logOutUser } = slice.actions;
export default slice.reducer;
