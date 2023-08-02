import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "transaction",
  initialState: {
    transaction: null,
    trasactionTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.trasaction = action.payload?.data;
      } else {
        state.message = action.payload.message;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Otkazma muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Otkazma qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Otkazma muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Otkazma taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Otkazma muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Otkazma o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getTrasactionHistoryById = (data) => {
  return apiCall({
    url: `/transactionHistory/getById${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};
export const getTransactionHistoryFindAllBranch = (data) => {
  return apiCall({
    url: `/transactionHistory/findAllByBranch_IdAndActiveTrue/${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const getTransactionHistoryActiveTrue = (data) => {
  return apiCall({
    url: `/transactionHistory/findAllByActiveTrue?branchId=${data.branchId}&page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveTransaction = (data) => {
  return apiCall({
    url: "/transactionHistory/save",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editTransaction = (data) => {
  return apiCall({
    url: "/transactionHistory/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteTransaction = (data) => {
  return apiCall({
    url: `/transactionHistory/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
