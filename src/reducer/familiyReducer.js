import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "family",
  initialState: {
    family: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.family = action.payload?.data;
      } else {
        state.family = null;
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Malumot yuklashda muammo bo'ldi");
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Malumot muvaffaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Malumot qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Malumot muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Malumot taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Malumot muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Malumot o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getFamily = (data) => {
  return apiCall({
    url: `/family/getAllActiveFamily/${data.branchId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};
export const getFamilyById = (data) => {
  return apiCall({
    url: `/family/getById/${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveFamily = (data) => {
  return apiCall({
    url: "/family/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editFamily = (data) => {
  return apiCall({
    url: "/family/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteFamily = (data) => {
  return apiCall({
    url: `/family/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
