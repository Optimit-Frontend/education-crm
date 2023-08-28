import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "lessonSchedule",
  initialState: {
    lessonSchedule: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFromByStudentClass: (state, action) => {
      if (action.payload.success) {
        state.lessonSchedule = action.payload?.data?.lessonScheduleResponseList;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Xonalarni yuklashda muammo bo'ldi");
        state.lessonSchedule = null;
      }
      state.changeData = false;
    },
    getFromByTeacher: (state, action) => {
      if (action.payload.success) {
        state.lessonSchedule = action.payload?.data?.lessonScheduleResponseList;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Xonalarni yuklashda muammo bo'ldi");
        state.lessonSchedule = null;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Xona muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Xonani qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Xona muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Xonani taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Xona muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Xonani o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getLessonScheduleByStudentClass = (data) => {
  return apiCall({
    url: `/schedule/getAllByStudentClassLevel?page=${data.page - 1}&size=${data.size}&branchId=${data.branchId}`,
    method: "get",
    onSuccess: slice.actions.getFromByStudentClass.type,
    onFail: slice.actions.getFromByStudentClass.type,
  });
};

export const getLessonScheduleByTeacher = (data) => {
  return apiCall({
    url: `/schedule/getAllByTeacherId/${data}`,
    method: "get",
    onSuccess: slice.actions.getFromByTeacher.type,
    onFail: slice.actions.getFromByTeacher.type,
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
