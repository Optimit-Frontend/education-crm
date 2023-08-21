import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "teachingHour",
  initialState: {
    teachingHour: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.teachingHour = action.payload?.data;
      } else {
        state.teachingHour = null;
        state.message = action.payload.message;
        toast.warning(action.payload.message);
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Dars soati qo`shildi");
      } else {
        toast.warning(action.payload.message || "Dars soati qoshilmadi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Dars soati taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Dars soati taxrirlanmadi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Dars soati o'chirildi");
      } else {
        toast.warning("Dars soati o'chirildi");
      }
      state.changeData = true;
    },
  },
});

export const getTeachingHour = (data) => {
  return apiCall({
    url: `/teachingHours/getAll?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};
export const getAttendanceUserId = (data) => {
  return apiCall({
    url: `/staffAttendance/getAllByUserId/${data.id}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveTeachingHours = (data) => {
  return apiCall({
    url: "/teachingHours/save",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editTeachingHours = (data) => {
  return apiCall({
    url: "/teachingHours/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteTeachingHours = (data) => {
  return apiCall({
    url: `/teachingHours/remove/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
