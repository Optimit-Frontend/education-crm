import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "balanceData",
  initialState: {
    balance: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.balance = action.payload?.data;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Balanslarini yuklashda muammo bo'ldi");
        state.balance = null;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Balans muvaffaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Balansni qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Balans muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Balansni taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Balans muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Balansni o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getAllBalanceBranch = (data) => {
  return apiCall({
    url: `/mainBalance/getByBranchId/${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveBalance = (data) => {
  return apiCall({
    url: "/mainBalance/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editBalance = (data) => {
  return apiCall({
    url: "/mainBalance/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteBalance = (data) => {
  return apiCall({
    url: `/mainBalance/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
