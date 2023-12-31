import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "products",
  initialState: {
    products: null,
    productsTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFromWearehouse: (state, action) => {
      if (action.payload.success) {
        state.products = action.payload?.data?.productsInWareHouseResponses;
        state.productsTotalCount = action.payload?.data?.totalElement;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Kunlik ishlatilgan mahsulotlarni yuklashda muammo bo'ldi");
        state.products = null;
        state.productsTotalCount = 0;
      }
      state.changeData = false;
    },
    getFromBarnch: (state, action) => {
      if (action.payload.success) {
        state.products = action.payload?.data?.productsInWareHouseResponses;
        state.productsTotalCount = action.payload?.data?.totalElement;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Kunlik ishlatilgan mahsulotlarni yuklashda muammo bo'ldi");
        state.products = null;
        state.productsTotalCount = 0;
      }
      state.changeData = false;
    },
  },
});

export const getProductsWearehouse = (data) => {
  return apiCall({
    url: `/productsInWarehouse/getAllByWarehouseId/${data.warehouseId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFromWearehouse.type,
    onFail: slice.actions.getFromWearehouse.type,
  });
};

export const getProductsBranch = (data) => {
  return apiCall({
    url: `/productsInWarehouse/getAllByBranchId/${data.branchId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFromBarnch.type,
    onFail: slice.actions.getFromBarnch.type,
  });
};

export default slice.reducer;
