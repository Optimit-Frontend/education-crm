import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/Axios";
import usersDataReducer from "./reducer/usersDataReducer";
import businessReducer from "./reducer/businessReducer";
import businessBranchesReducer from "./reducer/businessBranchesReducer";
import roomTypeReducer from "./reducer/roomTypeReducer";
import roomReducer from "./reducer/roomReducer";
import subjectReducer from "./reducer/subjectReducer";
import roleReducer from "./reducer/roleReducer";
import employeeReducer from "./reducer/employeeReducer";
import studentReducer from "./reducer/studentReducer";
import classReducer from "./reducer/classReducer";
import achievementReducer from "./reducer/achievementReducer";
import balanceReducer from "./reducer/balanceReducer";
import workExpirenceReducer from "./reducer/workExpirenceReducer";
import levelReducer from "./reducer/levelReducer";
import transactionReducer from "./reducer/transactionReducer.js";

export default configureStore({
  reducer: {
    usersDataReducer,
    businessReducer,
    businessBranchesReducer,
    roomTypeReducer,
    roomReducer,
    subjectReducer,
    roleReducer,
    balanceReducer,
    workExpirenceReducer,
    employeeReducer,
    achievementReducer,
    studentReducer,
    classReducer,
    levelReducer,
    transactionReducer,
  },
  middleware: [api],
});
