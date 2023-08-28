import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "dailyMeal",
  initialState: {
    dailyMeal: null,
    dailyMealTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.dailyMeal = action.payload?.data?.dailyMealResponses;
        state.dailyMealTotalCount = action.payload?.data?.totalElement;
      } else {
        state.message = action.payload.message;
        state.dailyMeal = null;
        state.dailyMealTotalCount = 0;
        toast.warning(action.payload.message || "Kunlik ovqatlarni yuklashda muammo bo'ldi");
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Kunlik ovqat muvaffaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Kunlik ovqatni qo'shishda muammo bo'ldi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Kunlik ovqat muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Kunlik ovqatni taxrirlashda muammo bo'ldi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Kunlik ovqat muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Kunlik ovqatni o'chirishda muammo bo'ldi");
      }
      state.changeData = true;
    },
  },
});

export const getDailyMealByBranch = (data) => {
  return apiCall({
    url: `/dailyMeal/getAllByBranchId/${data.branchId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveDailyMeal = (data) => {
  return apiCall({
    url: "/dailyMeal/",
    method: "post",
    // eslint-disable-next-line no-underscore-dangle
    contentType: `multipart/form-data; boundary=${data._boundary}`,
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editDailyMeal = (data) => {
  return apiCall({
    url: "/dailyMeal/",
    method: "put",
    // eslint-disable-next-line no-underscore-dangle
    contentType: `multipart/form-data; boundary=${data._boundary}`,
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteDailyMeal = (data) => {
  return apiCall({
    url: `/dailyMeal/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
