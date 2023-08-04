import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "productData",
  initialState: {
    product: null,
    productAllBarnch: null,
    productTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.product = action.payload?.data?.products;
        state.productTotalCount = action.payload?.data?.totalElement;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Mahsulotlarni yuklashda muammo bo'ldi");
        state.product = null;
      }
      state.changeData = false;
    },
    getAllFrom: (state, action) => {
      if (action.payload.success) {
        state.productAllBarnch = action.payload?.data;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Mahsulotlarni yuklashda muammo bo'ldi");
        state.productAllBarnch = null;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Mahsulot muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Mahsulotni qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Mahsulot muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Mahsulotni taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Mahsulot muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Mahsulotni o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getProductBranchPage = (data) => {
  return apiCall({
    url: `/product/getByBranchId?page=${data.page - 1}&size=${data.size}&id=${data.branchId}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const getAllProductBranch = (data) => {
  return apiCall({
    url: `/product/getAll/${data}`,
    method: "get",
    onSuccess: slice.actions.getAllFrom.type,
    onFail: slice.actions.getAllFrom.type,
  });
};

export const saveProduct = (data) => {
  return apiCall({
    url: "/product/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editProduct = (data) => {
  return apiCall({
    url: "/product/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteProduct = (data) => {
  return apiCall({
    url: `/product/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
