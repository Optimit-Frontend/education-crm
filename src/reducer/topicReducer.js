import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "topic",
  initialState: {
    topic: null,
    topicTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.topic = action.payload?.data;
      } else {
        state.message = action.payload.message;
        state.topic = null;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Mavzu qo'shildi");
      } else {
        toast.warning(action.payload.message || "Mavzu qo'shilmadi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Mavzu taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Mavzu taxrirlanmadi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Mavzu o'chirildi");
      } else {
        toast.warning("Mavzu o'chirilmadi");
      }
      state.changeData = true;
    },
  },
});

export const getTopic = (data) => {
  return apiCall({
    url: `/topic/getById${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveTopic = (data) => {
  return apiCall({
    url: "/topic/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editTopic = (data) => {
  return apiCall({
    url: "/topic/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteTopic = (data) => {
  return apiCall({
    url: `/topic/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;