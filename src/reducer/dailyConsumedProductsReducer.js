import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "dailyConsumedProducts",
  initialState: {
    dailyConsumedProducts: null,
    dailyConsumedProductsTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFromWearehouse: (state, action) => {
      if (action.payload.success) {
        state.dailyConsumedProducts = action.payload?.data?.dailyConsumedProductsResponses;
        state.dailyConsumedProductsTotalCount = action.payload?.data?.totalElements;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Kunlik ishlatilgan mahsulotlarni yuklashda muammo bo'ldi");
        state.dailyConsumedProducts = null;
        state.dailyConsumedProductsTotalCount = 0;
      }
      state.changeData = false;
    },
    getFromBarnch: (state, action) => {
      if (action.payload.success) {
        state.dailyConsumedProducts = action.payload?.data?.dailyConsumedProductsResponses;
        state.dailyConsumedProductsTotalCount = action.payload?.data?.totalElements;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Kunlik ishlatilgan mahsulotlarni yuklashda muammo bo'ldi");
        state.dailyConsumedProducts = null;
        state.dailyConsumedProductsTotalCount = 0;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Kunlik ishlatilgan mahsulot muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Kunlik ishlatilgan mahsulotni qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Kunlik ishlatilgan mahsulot muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Kunlik ishlatilgan mahsulotni taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Kunlik ishlatilgan mahsulot muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Kunlik ishlatilgan mahsulotni o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getdailyConsumedProductsWearehouse = (data) => {
  return apiCall({
    url: `/dailyConsumedProducts/getAllByWarehouseId/${data.warehouseId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFromWearehouse.type,
    onFail: slice.actions.getFromWearehouse.type,
  });
};

export const getdailyConsumedProductsBranch = (data) => {
  return apiCall({
    url: `/dailyConsumedProducts/getAllByBranchId/${data.branchId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFromBarnch.type,
    onFail: slice.actions.getFromBarnch.type,
  });
};

export const savedailyConsumedProducts = (data) => {
  return apiCall({
    url: "/dailyConsumedProducts",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editdailyConsumedProducts = (data) => {
  return apiCall({
    url: "/dailyConsumedProducts",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deletedailyConsumedProducts = (data) => {
  return apiCall({
    url: `/dailyConsumedProducts/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
