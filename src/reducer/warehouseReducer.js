import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "warehouseData",
  initialState: {
    warehouse: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.warehouse = action.payload?.data?.warehouseList;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Omborlarni yuklashda muammo bo'ldi");
        state.warehouse = null;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Ombor muvaffaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Omborni qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Ombor muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Omborni taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Ombor muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Omborni o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getAllWarehouse = (data) => {
  return apiCall({
    url: `/wareHouses/getAllByBranchId/${data}?page=0&size=100`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveWarehouse = (data) => {
  return apiCall({
    url: "/wareHouses",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editWarehouse = (data) => {
  return apiCall({
    url: "/wareHouses",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteWarehouse = (data) => {
  return apiCall({
    url: `/wareHouses/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
