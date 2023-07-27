import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "roomTypeData",
  initialState: {
    roomType: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.roomType = action.payload?.data;
      } else {
        state.message = action.payload.message;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Xona turi muvaffaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Xona turini qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Xona turi muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Xona turini taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Xona turi muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Xona turini o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getAllRoomType = (data) => {
  return apiCall({
    url: `/roomType/getAll/${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveRoomType = (data) => {
  return apiCall({
    url: "/roomType/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editRoomType = (data) => {
  return apiCall({
    url: "/roomType/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteRoomType = (data) => {
  return apiCall({
    url: `/roomType/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
