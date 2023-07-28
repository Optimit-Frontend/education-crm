import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "subjectData",
  initialState: {
    subjects: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.subjects = action.payload?.data;
      } else {
        state.message = action.payload.message;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Fan muvaffaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Fanni qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Fan muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Fanni taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Fan muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Fanni o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getSubject = (data) => {
  return apiCall({
    url: `/subject/getAllByBranchId/${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveSubject = (data) => {
  return apiCall({
    url: "/subject/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editSubject = (data) => {
  return apiCall({
    url: "/subject/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteSubject = (data) => {
  return apiCall({
    url: `/subject/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
