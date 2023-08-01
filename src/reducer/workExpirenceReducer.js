import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "workExpirence",
  initialState: {
    workExpirence: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.workExpirence = action.payload?.data;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Hodim ish tajribasini yuklashda muammo bo'ldi");
        state.workExpirence = null;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Hodim ish tajribasi muvaffaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Hodim ish tajribasini qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Hodim ish tajribasi muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Hodim ish tajribasini taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Hodim ish tajribasi muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Hodim ish tajribasini o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getWorkExperienceByUserId = (data) => {
  return apiCall({
    url: `/workExperience/getAllByUserId/${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveWorkExperience = (data) => {
  return apiCall({
    url: "/workExperience/save",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editWorkExperience = (data) => {
  return apiCall({
    url: "/workExperience/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteWorkExperience = (data) => {
  return apiCall({
    url: `/workExperience/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
