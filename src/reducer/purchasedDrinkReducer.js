import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "purchasedDrink",
  initialState: {
    purchasedDrink: null,
    purchasedDrinkTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFromWearehouse: (state, action) => {
      if (action.payload.success) {
        state.purchasedDrink = action.payload?.data?.purchasedDrinksResponses;
        state.purchasedDrinkTotalCount = action.payload?.data?.allSize;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Sotib olingan ichimliklarni yuklashda muammo bo'ldi");
        state.purchasedDrink = null;
        state.purchasedDrinkTotalCount = 0;
      }
      state.changeData = false;
    },
    getFromBarnch: (state, action) => {
      if (action.payload.success) {
        state.purchasedDrink = action.payload?.data?.purchasedDrinksResponses;
        state.purchasedDrinkTotalCount = action.payload?.data?.totalElements;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Sotib olingan ichimliklarni yuklashda muammo bo'ldi");
        state.purchasedDrink = null;
        state.purchasedDrinkTotalCount = 0;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Sotib olingan ichimlik muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Sotib olingan ichimlikni qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Sotib olingan ichimlik muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Sotib olingan ichimlikni taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Sotib olingan ichimlik muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Sotib olingan ichimlikni o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getPurchasedDrinkWearehouse = (data) => {
  return apiCall({
    url: `/purchasedDrinks/getAllByWareHouseId${data.warehouseId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFromWearehouse.type,
    onFail: slice.actions.getFromWearehouse.type,
  });
};

export const getPurchasedDrinkBranch = (data) => {
  return apiCall({
    url: `/purchasedDrinks/getAllByBranchId/${data.branchId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFromBarnch.type,
    onFail: slice.actions.getFromBarnch.type,
  });
};

export const savePurchasedDrink = (data) => {
  return apiCall({
    url: "/purchasedDrinks",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editPurchasedDrink = (data) => {
  return apiCall({
    url: "/purchasedDrinks",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deletePurchasedDrink = (data) => {
  return apiCall({
    url: `/purchasedDrinks/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
