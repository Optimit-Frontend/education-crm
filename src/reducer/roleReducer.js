import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "roleData",
  initialState: {
    role: [],
    roleTotalCount: 0,
    allRole: [],
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.role = action.payload?.data?.content;
        state.roleTotalCount = action.payload?.data?.allSize;
      } else {
        state.message = action.payload.message;
      }
      state.changeData = false;
    },
    getAllFrom: (state, action) => {
      if (action.payload.success) {
        state.allRole = action.payload?.data;
      } else {
        state.message = action.payload.message;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Lavozim muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Lavozimni qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Lavozim muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Lavozimni taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Lavozim muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Lavozimni o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getRoleBranch = (data) => {
  return apiCall({
    url: `/role/getList?page=${data.page - 1}&size=${data.size}&branchId=${data.branchId}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const getAllRoleByBranch = (data) => {
  return apiCall({
    url: `/role/getListByBranchId?branchId=${data}`,
    method: "get",
    onSuccess: slice.actions.getAllFrom.type,
    onFail: slice.actions.getAllFrom.type,
  });
};

export const saveRole = (data) => {
  return apiCall({
    url: "/role/save",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editRole = (data) => {
  return apiCall({
    url: "/role/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteRole = (data) => {
  return apiCall({
    url: `/role/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
