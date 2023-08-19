import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "attendance",
  initialState: {
    attendance: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.attendance = action.payload?.data;
      } else {
        state.attendance = null;
        state.message = action.payload.message;
        toast.warning(action.payload.message);
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Xodim belgilandi");
      } else {
        toast.warning(action.payload.message || "Xodim belgilanmadi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Xodim taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Xodim taxrirlanmadi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Xodim o'chirildi");
      } else {
        toast.warning("Xodim o'chirildi");
      }
      state.changeData = true;
    },
  },
});

export const getAttendance = (data) => {
  return apiCall({
    url: `/staffAttendance/getAllByBranchId/${data.branchId}?page=${data.page - 1}&size=${data.size}`,
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

export const saveAttendance = (data) => {
  return apiCall({
    url: "/staffAttendance/save",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editAttendance = (data) => {
  return apiCall({
    url: "/staffAttendance/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteAttendance = (data) => {
  return apiCall({
    url: `/staffAttendance/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
