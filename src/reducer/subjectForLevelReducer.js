import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "subjectForLevel",
  initialState: {
    subjectForLevel: null,
    subjectForLevelAllBranch: null,
    subjectForLevelTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.subjectForLevel = action.payload?.data?.subjectLevels;
        state.subjectForLevelTotalCount = action.payload?.data?.totalElement;
      } else {
        state.message = action.payload.message;
        state.subjectForLevel = null;
        state.subjectForLevelTotalCount = 0;
        toast.warning(action.payload.message || "Sinflar kesimidagi fanlarni yuklashda muammo bo'ldi");
      }
      state.changeData = false;
    },
    getFromAllByBarnch: (state, action) => {
      if (action.payload.success) {
        state.subjectForLevelAllBranch = action.payload?.data;
      } else {
        state.message = action.payload.message;
        state.subjectForLevelAllBranch = null;
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
    url: `/subjectLevels/getAllSubjectByBranchIdByPage/${data.branchId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const getSubjectForLevelAllByBranchId = (data) => {
  return apiCall({
    url: `/subjectLevels/getAllSubjectByBranchId/${data}`,
    method: "get",
    onSuccess: slice.actions.getFromAllByBarnch.type,
    onFail: slice.actions.getFromAllByBarnch.type,
  });
};

export const saveSubjectForLevel = (data) => {
  return apiCall({
    url: "/subjectLevels",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editSubjectForLevel = (data) => {
  return apiCall({
    url: "/subjectLevels",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteSubjectForLevel = (data) => {
  return apiCall({
    url: `/subjectLevels/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
