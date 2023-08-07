import { createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "level",
  initialState: {
    level: null,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.level = action.payload?.data;
      } else {
        state.level = null;
      }
    },
  },
});

export const getLevels = () => {
  return apiCall({
    url: "/level/getAll",
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};
export default slice.reducer;
