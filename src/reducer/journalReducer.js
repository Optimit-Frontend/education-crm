import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "journal",
  initialState: {
    journal: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.journal = action.payload?.data;
      } else {
        state.journal = null;
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Jurnal yuklashda muammo bo'ldi");
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Jurnal muvaffaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Jurnal qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Jurnal muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Jurnal taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Jurnal muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Jurnal o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getJournal = (data) => {
  return apiCall({
    url: `/journal/getAllByBranchId/${data.branchId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};
export const getJournalActiveTrue = (data) => {
  return apiCall({
    url: `/journal/getAllByIdBranchIdAndActiveTrue/${data.branchId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveJournal = (data) => {
  return apiCall({
    url: "/journal/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editJournal = (data) => {
  return apiCall({
    url: "/journal/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteJournal = (data) => {
  return apiCall({
    url: `/journal/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
