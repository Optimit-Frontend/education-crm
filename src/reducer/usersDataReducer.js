import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "usersData",
  initialState: {
    name: "qul",
    logout: false,
  },
  reducers: {
    logOutUser: (state) => {
      state.logout = true;
    },
  },
});

export const { logOutUser } = slice.actions;
export default slice.reducer;
