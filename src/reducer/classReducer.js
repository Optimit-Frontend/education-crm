import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "classes",
  initialState: {
    class: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.class = action.payload?.data;
      } else {
        state.message = action.payload.message;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Sinf muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Sinf qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Sinf muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Sinf taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Sinf muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Sinf o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getClassById = (data) => {
  return apiCall({
    url: `/class/getById${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};
export const getClassesAll = (data) => {
  return apiCall({
    url: `/class/getAllActiveClasses/${data.id}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const getClassesAllNeActive = (data) => {
  return apiCall({
    url: `/class/getAllNeActiveClassesByYear?branchId=${data.branchId}&page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveClass = (data) => {
  return apiCall({
    url: "/class/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editClass = (data) => {
  return apiCall({
    url: "/class/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteClass = (data) => {
  return apiCall({
    url: `/class/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
