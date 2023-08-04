import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "measurmentData",
  initialState: {
    measurment: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.measurment = action.payload?.data;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "O'lchov birliglarini yuklashda muammo bo'ldi");
        state.measurment = null;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("O'lchov birligi muvaffaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "O'lchov birligini qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("O'lchov birligi muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "O'lchov birligini taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("O'lchov birligi muvafaqiyatli o'chirildi");
      } else {
        toast.warning("O'lchov birligini o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getAllMeasurement = (data) => {
  return apiCall({
    url: `/measurement/getByBranchId/${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveMeasurement = (data) => {
  return apiCall({
    url: "/measurement/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editMeasurement = (data) => {
  return apiCall({
    url: "/measurement/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteMeasurement = (data) => {
  return apiCall({
    url: `/measurement/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
