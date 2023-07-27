import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "businessBranchesData",
  initialState: {
    businessBranch: null,
    allBranch: null,
    message: null,
    businesesBranchesChange: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.businessBranch = action.payload?.data;
      } else {
        state.message = action.payload.message;
      }
      state.businesesBranchesChange = false;
    },
    getAllFrom: (state, action) => {
      if (action.payload.success) {
        state.businessBranch = action.payload?.data?.businessesResponseDtoList;
      } else {
        state.message = action.payload.message;
      }
      state.businesesBranchesChange = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Filial muvafaqiyatli qo'shildi");
      } else {
        toast.warning(action.payload.message || "Filialni qo'shishda muammo bo'ldi");
      }
      state.businesesBranchesChange = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Filial muvafaqiyatli taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Filialni taxrirlashda muammo bo'ldi");
      }
      state.businesesBranchesChange = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Filial muvafaqiyatli o'chirildi");
      } else {
        toast.warning("Filialni o'chirishda muammo bo'ldi");
      }
      state.businesesBranchesChange = true;
    },
  },
});

export const getAllBranch = () => {
  return apiCall({
    url: "branch/getAll",
    method: "get",
    onSuccess: slice.actions.getAllFrom.type,
    onFail: slice.actions.getAllFrom.type,
  });
};

export const getBusinessBranch = (data) => {
  return apiCall({
    url: `branch/getByBusinessId/${data}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveBranch = (data) => {
  return apiCall({
    url: "/branch/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editBranch = (data) => {
  return apiCall({
    url: "branch/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteBranch = (data) => {
  return apiCall({
    url: `/branch/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
