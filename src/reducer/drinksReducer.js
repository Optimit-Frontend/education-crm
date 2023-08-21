import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "drinks",
  initialState: {
    drinks: null,
    drinksTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFromWearehouse: (state, action) => {
      if (action.payload.success) {
        state.drinks = action.payload?.data?.drinksInWareHouseResponses;
        state.drinksTotalCount = action.payload?.data?.totalElement;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Kunlik ishlatilgan mahsulotlarni yuklashda muammo bo'ldi");
        state.drinks = null;
        state.drinksTotalCount = 0;
      }
      state.changeData = false;
    },
    getFromBarnch: (state, action) => {
      if (action.payload.success) {
        state.drinks = action.payload?.data?.drinksInWareHouseResponses;
        state.drinksTotalCount = action.payload?.data?.totalElement;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Kunlik ishlatilgan mahsulotlarni yuklashda muammo bo'ldi");
        state.drinks = null;
        state.drinksTotalCount = 0;
      }
      state.changeData = false;
    },
  },
});

export const getDrinksWearehouse = (data) => {
  return apiCall({
    url: `/drinksInWarehouse/getAllByWarehouseId?page=${data.page - 1}&size=${data.size}&wareHouseId=${data.warehouseId}`,
    method: "get",
    onSuccess: slice.actions.getFromWearehouse.type,
    onFail: slice.actions.getFromWearehouse.type,
  });
};

export const getDrinksBranch = (data) => {
  return apiCall({
    url: `/drinksInWarehouse/getAllByBranchIdId?page=${data.page - 1}&size=${data.size}&branchId=${data.branchId}`,
    method: "get",
    onSuccess: slice.actions.getFromBarnch.type,
    onFail: slice.actions.getFromBarnch.type,
  });
};

export default slice.reducer;
