import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "account",
  initialState: {
    account: null,
    debts: null,
    accountTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.account = action.payload?.data?.allStudentAccount;
        state.accountTotalCount = action.payload?.data?.totalItem;
      } else {
        state.message = action.payload.message;
        state.account = null;
        state.accountTotalCount = 0;
      }
      state.changeData = false;
    },
    getFromDebt: (state, action) => {
      if (action.payload.success) {
        state.debts = action.payload?.data;
      } else {
        state.message = action.payload.message;
        state.debts = null;
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

export const getStudentAccountByBranch = (data) => {
  return apiCall({
    url: `/studentAccount/getByBranchId/${data?.branchId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const getStudentAccountByBranchByClass = (data) => {
  return apiCall({
    url: `/studentAccount/getByBranchId/${data?.branchId}?classId=${data.classId}&page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};
export const getStudentDebt = () => {
  return apiCall({
    url: "/studentAccount/getAllByDebtActive",
    method: "get",
    onSuccess: slice.actions.getFromDebt.type,
    onFail: slice.actions.getFromDebt.type,
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

export const editStudentAccount = (data, id) => {
  return apiCall({
    url: `/studentAccount/update/${id}`,
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
