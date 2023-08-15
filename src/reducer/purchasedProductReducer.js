import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "purchasedProduct",
  initialState: {
    purchasedProduct: null,
    purchasedProductTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFromWearehouse: (state, action) => {
      if (action.payload.success) {
        state.purchasedProduct = action.payload?.data?.purchasedProductsResponses;
        state.purchasedProductTotalCount = action.payload?.data?.allSize;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Sotib olingan mahsulotlarni yuklashda muammo bo'ldi");
        state.purchasedProduct = null;
        state.purchasedProductTotalCount = 0;
      }
      state.changeData = false;
    },
    getFromBarnch: (state, action) => {
      if (action.payload.success) {
        state.purchasedProduct = action.payload?.data?.purchasedProductsResponses;
        state.purchasedProductTotalCount = action.payload?.data?.totalElements;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Sotib olingan mahsulotlarni yuklashda muammo bo'ldi");
        state.purchasedProduct = null;
        state.purchasedProductTotalCount = 0;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Sotib olingan mahsulot muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Sotib olingan mahsulotni qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Sotib olingan mahsulot muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Sotib olingan mahsulotni taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Sotib olingan mahsulot muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Sotib olingan mahsulotni o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getPurchasedProductWearehouse = (data) => {
  return apiCall({
    url: `/purchasedProducts/getAllByWarehouseId/${data.warehouseId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFromWearehouse.type,
    onFail: slice.actions.getFromWearehouse.type,
  });
};

export const getPurchasedProductBranch = (data) => {
  return apiCall({
    url: `/purchasedProducts/getAllByBranchId/${data.branchId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFromBarnch.type,
    onFail: slice.actions.getFromBarnch.type,
  });
};

export const savePurchasedProduct = (data) => {
  return apiCall({
    url: "/purchasedProducts",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editPurchasedProduct = (data) => {
  return apiCall({
    url: "/purchasedProducts",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deletePurchasedProduct = (data) => {
  return apiCall({
    url: `/purchasedProducts/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
