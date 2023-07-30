import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "businessData",
  initialState: {
    business: null,
    businessTotalCount: 0,
    message: null,
    businesesChange: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.business = action.payload?.data?.businessesResponseDtoList;
        state.businessTotalCount = action.payload?.data?.allSize;
      } else {
        state.message = action.payload.message;
        toast.warning(action.payload.message || "Bizneslarni yuklashda muammo bo'ldi");
        state.business = null;
      }
      state.businesesChange = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Biznes muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Biznesni qo'shishda muammo bo'ldi");
      }
      state.businesesChange = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Biznes muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Biznesni taxrirlashda muammo bo'ldi");
      }
      state.businesesChange = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Biznes muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Biznesni o'chirishda muammo bo'ldi");
      }
      state.businesesChange = true;
    },
  },
});

export const getAllBusiness = (data) => {
  return apiCall({
    url: `/business/getAll?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveBusiness = (data) => {
  return apiCall({
    url: "/business/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editBusiness = (data) => {
  return apiCall({
    url: "/business/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteBusiness = (data) => {
  return apiCall({
    url: `/business/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
