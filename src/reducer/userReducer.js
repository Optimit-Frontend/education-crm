import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "users",
  initialState: { users: null },
  reducers: {
    getFromUser: (state, action) => {
      if (action.payload.success) {
        state.users = action.payload.object;
      } else {
        state.users = null;
      }
    },
    addFromUser: (state, action) => {
      if (action.payload.success) {
        toast.success("User added successfully");
      } else {
        toast.error("User not added");
      }
    },
    editFromUser: (state, action) => {
      if (action.payload.success) {
        toast.success("User edited successfully");
      } else {
        toast.error("User not edited");
      }
    },
    deleteFromUser: (state, action) => {
      if (action.payload.success) {
        toast.success("User deleted successfully");
      } else {
        toast.error("User not deleted");
      }
    }
  },
});

export const getUsers = (data) => {
  return apiCall({
    url: "/user/login",
    method: "get",
    data,
    onSuccess: slice.actions.getFromUser.type,
    onFail: slice.actions.getFromUser.type,
  });
};
export const addUser = (data) => {
  return apiCall({
    url: "/user/login",
    method: "post",
    data,
    onSuccess: slice.actions.addFromUser.type,
    onFail: slice.actions.addFromUser.type,
  });
};
export const editUser = (data) => {
  return apiCall({
    url: "/user/login",
    method: "put",
    data,
    onSuccess: slice.actions.editFromUser.type,
    onFail: slice.actions.editFromUser.type,
  });
};
export const deleteUser = (data) => {
  return apiCall({
    url: "/user/login",
    method: "delete",
    data,
    onSuccess: slice.actions.deleteFromUser.type,
    onFail: slice.actions.deleteFromUser.type,
  });
};

export const { logOutUser } = slice.actions;
export default slice.reducer;
