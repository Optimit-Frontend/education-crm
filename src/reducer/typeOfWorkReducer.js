import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "typeOfWorkData",
  initialState: {
    typeOfWork: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.typeOfWork = action.payload?.data;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Ish turlarini yuklashda muammo bo'ldi");
        state.typeOfWork = null;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Ish turi muvaffaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Ish turini qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Ish turi muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Ish turini taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Ish turi muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Ish turini o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getAllTypeOfWork = (data) => {
  return apiCall({
    url: `/typeOfWork/getAllByBranchId/${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveTypeOfWork = (data) => {
  return apiCall({
    url: "/typeOfWork/save",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editTypeOfWork = (data) => {
  return apiCall({
    url: "/typeOfWork/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteTypeOfWork = (data) => {
  return apiCall({
    url: `/typeOfWork/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
