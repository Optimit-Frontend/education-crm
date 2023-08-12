import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "subjectForLevel",
  initialState: {
    subjectForLevel: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.subjectForLevel = action.payload?.data;
      } else {
        state.message = action.payload.message;
        state.subjectForLevel = null;
        toast.warning(action.payload.message || "Sinflar kesimidagi fanlarni yuklashda muammo bo'ldi");
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Sinflar kesimidagi fan muvaffaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Sinflar kesimidagi fanni qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Sinflar kesimidagi fan muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Sinflar kesimidagi fanni taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Sinflar kesimidagi fan muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Sinflar kesimidagi fanni o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getSubjectForLevel = (data) => {
  return apiCall({
    url: `/subjectLevel/getAllByBranchId/${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveSubjectForLevel = (data) => {
  return apiCall({
    url: "/subjectLevel/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editSubjectForLevel = (data) => {
  return apiCall({
    url: "/subjectLevel/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteSubjectForLevel = (data) => {
  return apiCall({
    url: `/subjectLevel/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
