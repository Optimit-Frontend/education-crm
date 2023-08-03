import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "studentAccount",
  initialState: {
    account: null,
    accountTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.transaction = action.payload?.data;
      } else {
        state.message = action.payload.message;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Hisob raqam qo'shildi");
      } else {
        toast.warning(action.payload.message || "Hisob raqam qo'shilmadi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Hisob raqam taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Hisob raqam taxrirlanmadi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Hisob raqam o'chirildi");
      } else {
        toast.warning("Hisob raqam o'chirilmadi");
      }
      state.changeData = true;
    },
  },
});

export const getStudentAccountById = (data) => {
  return apiCall({
    url: `/studentAccountById/getById${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};
export const getStudentAccountByBranch = (data) => {
  return apiCall({
    url: `/studentAccount/getByBranchId/${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveStudentAccount = (data) => {
  return apiCall({
    url: "/studentAccount/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};
export const saveStudentPayment = (data) => {
  return apiCall({
    url: "/studentAccount/payment",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editStudentAccount = (data) => {
  return apiCall({
    url: "/studentAccount/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteStudentAccount = (data) => {
  return apiCall({
    url: `/studentAccount/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
