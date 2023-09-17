import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "lessonSchedule",
  initialState: {
    lessonSchedule: null,
    lessonScheduleAllBarnch: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.lessonSchedule = action.payload?.data;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Dars jadvalini yuklashda muammo bo'ldi");
        state.lessonSchedule = null;
      }
      state.changeData = false;
    },
    getAllFrom: (state, action) => {
      if (action.payload.success) {
        state.lessonScheduleAllBarnch = action.payload?.data;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Dars jadvalini yuklashda muammo bo'ldi");
        state.lessonScheduleAllBarnch = null;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Dars jadvali muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Dars jadvali qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Dars jadvali muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Dars jadvali taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Dars jadvali muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Dars jadvali o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getLessonSchedule = (data) => {
  return apiCall({
    url: `/schedule/getAllByBranchId/${data.branchId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const getAllByStudentClass = (data) => {
  return apiCall({
    url: `/schedule/getAllByStudentClassLevel/${data.branchId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getAllFrom.type,
    onFail: slice.actions.getAllFrom.type,
  });
};
export const getAllByTeacherId = (data) => {
  return apiCall({
    url: `/schedule/getAllByTeacherId/${data}`,
    method: "get",
    onSuccess: slice.actions.getAllFrom.type,
    onFail: slice.actions.getAllFrom.type,
  });
};

export const saveLessonSchedule = (data) => {
  return apiCall({
    url: "/schedule/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editLessonSchedule = (data) => {
  return apiCall({
    url: "/schedule/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteLessonSchedule = (data) => {
  return apiCall({
    url: `/schedule/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
