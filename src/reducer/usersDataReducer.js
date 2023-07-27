import { createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "usersData",
  initialState: {
    fullName: null,
    userToken: null,
    userData: null,
    logout: false,
  },
  reducers: {
    logOutUser: (state, action) => {
      state.logout = true;
    },
    saveUser: (state, action) => {
      if (action.payload.success) {
        console.log(action.payload);
        localStorage.setItem("EducationCRM", action.payload?.message);
        localStorage.setItem("userDataCRM", JSON.stringify(action.payload?.object));
        state.userToken = action.payload?.message;
        state.logout = false;
        state.userData = action.payload?.object;
      } else {
        state.logout = true;
      }
    },
  },
});

export const { logOutUser, saveUser } = slice.actions;
export default slice.reducer;
