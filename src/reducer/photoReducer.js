import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "photo",
  initialState: {
    photo: null,
    message: null,
    changeData: false,
  },
  reducers: {
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Rasm qo'shildi");
        state.photo = action.payload?.data;
      } else {
        toast.warning(action.payload.message || "Rasm qo'shishda muammo bo'ldi");
        state.photo = null;
        state.message = action.payload.message;
      }
      state.changeData = true;
    },
    clearPhotoReducer: (state) => {
      state.photo = null;
      state.message = null;
    }
  },
});

export const savePhoto = (data) => {
  return apiCall({
    url: "/attachment/upload",
    method: "post",
    // eslint-disable-next-line no-underscore-dangle
    contentType: `multipart/form-data; boundary=${data._boundary}`,
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const { clearPhotoReducer } = slice.actions;

export default slice.reducer;
