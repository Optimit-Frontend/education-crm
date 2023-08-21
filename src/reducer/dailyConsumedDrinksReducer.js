import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "dailyConsumedDrinks",
  initialState: {
    dailyConsumedDrinks: null,
    dailyConsumedDrinksTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFromWearehouse: (state, action) => {
      if (action.payload.success) {
        state.dailyConsumedDrinks = action.payload?.data?.responseList;
        state.dailyConsumedDrinksTotalCount = action.payload?.data?.totalElement;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Kunlik ishlatilgan ichimliklarni yuklashda muammo bo'ldi");
        state.dailyConsumedDrinks = null;
        state.dailyConsumedDrinksTotalCount = 0;
      }
      state.changeData = false;
    },
    getFromBarnch: (state, action) => {
      if (action.payload.success) {
        state.dailyConsumedDrinks = action.payload?.data?.responseList;
        state.dailyConsumedDrinksTotalCount = action.payload?.data?.totalElement;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Kunlik ishlatilgan ichimliklarni yuklashda muammo bo'ldi");
        state.dailyConsumedDrinks = null;
        state.dailyConsumedDrinksTotalCount = 0;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Kunlik ishlatilgan ichimlik muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Kunlik ishlatilgan ichimlikni qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Kunlik ishlatilgan ichimlik muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Kunlik ishlatilgan ichimlikni taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Kunlik ishlatilgan ichimlik muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Kunlik ishlatilgan ichimlikni o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getDailyConsumedDrinksWearehouse = (data) => {
  return apiCall({
    url: `/dailyConsumedDrinks/getAllByWarehouseId/${data.warehouseId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFromWearehouse.type,
    onFail: slice.actions.getFromWearehouse.type,
  });
};

export const getDailyConsumedDrinksBranch = (data) => {
  return apiCall({
    url: `/dailyConsumedDrinks/getAllByBranchId/${data.branchId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFromBarnch.type,
    onFail: slice.actions.getFromBarnch.type,
  });
};

export const saveDailyConsumedDrinks = (data) => {
  return apiCall({
    url: "/dailyConsumedDrinks",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editDailyConsumedDrinks = (data) => {
  return apiCall({
    url: "/dailyConsumedDrinks",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteDailyConsumedDrinks = (data) => {
  return apiCall({
    url: `/dailyConsumedDrinks/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
