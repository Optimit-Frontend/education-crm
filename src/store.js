import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/Axios";
import usersDataReducer from "./reducer/usersDataReducer";
import userReducer from "./reducer/userReducer";
import businessReducer from "./reducer/businessReducer";
import businessBranchesReducer from "./reducer/businessBranchesReducer";
import roomTypeReducer from "./reducer/roomTypeReducer";
import roomReducer from "./reducer/roomReducer";
import subjectReducer from "./reducer/subjectReducer";
import roleReducer from "./reducer/roleReducer";
import employeeReducer from "./reducer/employeeReducer";
import studentReducer from "./reducer/studentReducer.js";

export default configureStore({
  reducer: {
    usersDataReducer,
    userReducer,
    businessReducer,
    businessBranchesReducer,
    roomTypeReducer,
    roomReducer,
    subjectReducer,
    roleReducer,
    employeeReducer,
    studentReducer
  },
  middleware: [api],
});
