import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "achievement",
  initialState: {
    achievement: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.achievement = action.payload?.data?.achievementResponses;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Hodim yutug'larini yuklashda muammo bo'ldi");
        state.achievement = null;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Hodim yutug'i muvaffaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Hodim yutug'ini qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Hodim yutug'i muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Hodim yutug'ini taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Hodim yutug'i muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Hodim yutug'ini o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getAchievementUserId = (data) => {
  return apiCall({
    url: `/achievement/getByUserId/${data}?page=0&size=100`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveAchievement = (data) => {
  return apiCall({
    url: "/achievement/save",
    method: "post",
    // eslint-disable-next-line no-underscore-dangle
    contentType: `multipart/form-data; boundary=${data._boundary}`,
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editAchievement = (data) => {
  return apiCall({
    url: "/achievement/update",
    method: "put",
    // eslint-disable-next-line no-underscore-dangle
    contentType: `multipart/form-data; boundary=${data._boundary}`,
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteAchievement = (data) => {
  return apiCall({
    url: `/achievement/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
