import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../api";

export const slice = createSlice({
  name: "scores",
  initialState: {
    scores: null,
    scoreTotalCount: 0,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        state.scores = action.payload?.data?.scoreResponses;
        state.scoreTotalCount = action.payload?.data?.totalElement;
      } else {
        state.message = action.payload.message;
        state.scores = null;
        state.scoreTotalCount = 0;
      }
      state.changeData = false;
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Ball qo'shildi");
      } else {
        toast.warning(action.payload.message || "Ball qo'shilmadi");
      }
      state.changeData = true;
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Ball taxrirlandi");
      } else {
        toast.warning(action.payload.message || "Ball taxrirlanmadi");
      }
      state.changeData = true;
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success("Ball o'chirildi");
      } else {
        toast.warning("Vazifa o'chirilmadi");
      }
      state.changeData = true;
    },
  },
});

export const getScores = (data) => {
  return apiCall({
    url: `/score/getAllByJournalId/${data?.journalId}?page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};
export const getScoreStudentSubjectId = (data) => {
  return apiCall({
    url: `/score/getgetAllByStudentIdAndSubjectId?studentId=${data.studentId}&subjectId=${data.subjectId}&page=${data.page - 1}&size=${data.size}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export const saveScore = (data) => {
  return apiCall({
    url: "/score/create",
    method: "post",
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  });
};

export const editScore = (data) => {
  return apiCall({
    url: "/score/update",
    method: "put",
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  });
};

export const deleteScore = (data) => {
  return apiCall({
    url: `/score/delete/${data}`,
    method: "delete",
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  });
};

export default slice.reducer;
