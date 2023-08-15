import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "homework",
  initialState: {
    homework: null,
    accountTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.homework = action.payload?.data;
      } else {
        state.message = action.payload.message;
        state.homework = null;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Vazifa qo'shildi");
      } else {
        toast.warning(action.payload.message || "Vazifa qo'shilmadi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Vazifa taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Vazifa taxrirlanmadi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Vazifa o'chirildi");
      } else {
        toast.warning("Vazifa o'chirilmadi");
      }
      state.changeData = true;
    },
  },
});

export const getHomeWorkList = (data) => {
  return apiCall({
    url: "/studentHomework/getList",
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};
export const getHomeWorkListActive = (data) => {
  return apiCall({
    url: "/studentHomework/getListByActive",
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};
export const getSHomeworkId = (data) => {
  return apiCall({
    url: "/studentHomework/getById",
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveHomework = (data) => {
  return apiCall({
    url: "/studentHomework/save",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editHomework = (data) => {
  return apiCall({
    url: "/studentHomework/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteHomework = (data) => {
  return apiCall({
    url: `/studentHomework/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
