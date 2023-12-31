import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "employeeData",
  initialState: {
    employees: null,
    employeesAllBranch: null,
    employeesTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.employees = action.payload?.data?.userResponseList;
        state.employeesTotalCount = action.payload?.data?.allSize;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Hodimlarni yuklashda muammo bo'ldi");
        state.employees = null;
      }
      state.changeData = false;
    },
    getFromAll: (state, action) => {
      if (action.payload.success) {
        state.employeesAllBranch = action.payload?.data;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Hodimlarni yuklashda muammo bo'ldi");
        state.employeesAllBranch = null;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Hodim muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Hodimni qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Hodim muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Hodimni taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Hodim muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Hodimni o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getEmployeeBranch = (data) => {
  return apiCall({
    url: `/user/getUserListByBranchId?page=${data.page - 1}&size=${data.size}&branchId=${data.branchId}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const getEmployeeBranchId = (data) => {
  return apiCall({
    url: `/user/getUserListByBranchId/${data}`,
    method: "get",
    onSuccess: slice.actions.getFromAll.type,
    onFail: slice.actions.getFromAll.type,
  });
};
export const getUserLists = () => {
  return apiCall({
    url: "/user/getUserList",
    method: "get",
    onSuccess: slice.actions.getFromAll.type,
    onFail: slice.actions.getFromAll.type,
  });
};

export const saveEmployee = (data) => {
  return apiCall({
    url: "/user/register",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editEmployee = (data) => {
  return apiCall({
    url: "/user/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteEmployee = (data) => {
  return apiCall({
    url: `/user/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
