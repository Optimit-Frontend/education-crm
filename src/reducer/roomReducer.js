import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "roomData",
  initialState: {
    room: null,
    roomAllBarnch: null,
    roomTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.room = action.payload?.data?.roomResponseDtoList;
        state.roomTotalCount = action.payload?.data?.allSize;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Xonalarni yuklashda muammo bo'ldi");
        state.room = null;
        state.roomTotalCount = 0;
      }
      state.changeData = false;
    },
    getAllFrom: (state, action) => {
      if (action.payload.success) {
        state.roomAllBarnch = action.payload?.data;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Xonalarni yuklashda muammo bo'ldi");
        state.roomAllBarnch = null;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Xona muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Xonani qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Xona muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Xonani taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Xona muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Xonani o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getRoomBranch = (data) => {
  return apiCall({
    url: `/room/getAll?page=${data.page - 1}&size=${data.size}&branchId=${data.branchId}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const getAllRoomBranch = (data) => {
  return apiCall({
    url: `/room/getAll/${data}`,
    method: "get",
    onSuccess: slice.actions.getAllFrom.type,
    onFail: slice.actions.getAllFrom.type,
  });
};

export const saveRoom = (data) => {
  return apiCall({
    url: "/room/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editRoom = (data) => {
  return apiCall({
    url: "/room/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteRoom = (data) => {
  return apiCall({
    url: `/room/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
