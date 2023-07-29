import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "usersData",
  initialState: {
    fullName: null,
    userToken: null,
    userData: null,
    businessId: null,
    branch: null,
    logout: false,
  },
  reducers: {
    saveUser: (state, action) => {
      if (action.payload.success) {
        localStorage.setItem("EducationCRM", action.payload?.message);
        localStorage.setItem("userDataCRM", JSON.stringify(action.payload?.object));
        state.userToken = action.payload?.message;
        state.logout = false;
        state.businessId = action.payload?.object?.businessId;
        state.branch = action.payload?.object?.branch;
        state.userData = action.payload?.object;
      } else {
        state.logout = true;
      }
    },
  },
});

export const { saveUser } = slice.actions;
export default slice.reducer;
