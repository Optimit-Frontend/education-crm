import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "students",
  initialState: {
    students: [],
    studentsTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.students = action.payload?.data?.studentResponseDtoList;
        state.studentsTotalCount = action.payload?.data?.allSize;
      } else {
        state.message = action.payload.message;
        state.students = [];
        state.studentsTotalCount = 0;
      }
      state.changeData = false;
    },
    getFromByClass: (state, action) => {
      if (action.payload.success) {
        state.students = action.payload?.data;
      } else {
        state.message = action.payload.message;
        state.students = [];
        state.studentsTotalCount = 0;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Talaba muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Talaba qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Talaba muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Talaba taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Talaba muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Talaba o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getStudentById = (data) => {
  return apiCall({
    url: `/student/getById${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};
export const getStudentsAll = (data) => {
  return apiCall({
    url: `/student/getAll?branchId=${data.branchId}&page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};
export const getSearchStudents = (data) => {
  return apiCall({
    url: `/student/search?name=${data.name}&page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const getStudentsAllNeActive = (data) => {
  return apiCall({
    url: `/student/getAllNeActiveStudents?branchId=${data.branchId}&page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};
export const getStudentsAllByClass = (data) => {
  return apiCall({
    url: `/student/getAllByClassId/${data.classId}/${data.branchId}`,
    method: "get",
    onSuccess: slice.actions.getFromByClass.type,
    onFail: slice.actions.getFromByClass.type,
  });
};

export const saveStudent = (data) => {
  return apiCall({
    url: "/student/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editStudent = (data) => {
  return apiCall({
    url: "/student/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteStudent = (data) => {
  return apiCall({
    url: `/student/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
