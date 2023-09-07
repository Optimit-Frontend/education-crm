import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "salaries",
  initialState: {
    salaries: null,
    salaryTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.salaries = action.payload?.data;
        state.salaryTotalCount = action.payload?.data?.allSize;
      } else {
        state.message = action.payload.message;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Maosh muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Maosh qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Maosh muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Maosh taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Maosh muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Maosh o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getGiveSalary = (data) => {
  return apiCall({
    url: `/salary/getAllByBranchId/${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};
export const savePartlySalary = (data) => {
  return apiCall({
    url: `/salary/givePartlySalary?phoneNumber=${data.phoneNumber}&partlySalary=${data?.partlySalary}&paymentType=${data?.paymentType}`,
    method: "post",
    // data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};
export const giveSalary = (data) => {
  return apiCall({
    url: `/salary/giveSalary?id=${data.id}&withholdingOfDebtIfAny=${data?.withholdingOfDebtIfAny}&paymentType=${data?.paymentType}`,
    method: "post",
    // data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const saveGiveDebtToEmployee = (data) => {
  return apiCall({
    url: `/salary/giveDebtToEmployee?phoneNumber=${data.phoneNumber}&debitAmount=${data?.debitAmount}&paymentType=${data?.paymentType}`,
    method: "get",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};
export const saveGiveCashAdvance = (data) => {
  return apiCall({
    url: `/salary/giveCashAdvance?phoneNumber=${data.phoneNumber}&cashSalary=${data?.cashSalary}&paymentType=${data?.paymentType}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveSalary = (data) => {
  return apiCall({
    url: "/salary/save",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editSalary = (data) => {
  return apiCall({
    url: "/salary/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteSalary = (data) => {
  return apiCall({
    url: `/salary/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
