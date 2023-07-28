import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/Axios";
import usersDataReducer from "./reducer/usersDataReducer";
import userReducer from "./reducer/userReducer";
import businessReducer from "./reducer/businessReducer";
import businessBranchesReducer from "./reducer/businessBranchesReducer";
import roomTypeReducer from "./reducer/roomTypeReducer";
import roomReducer from "./reducer/roomReducer";
import subjectReducer from "./reducer/subjectReducer";

export default configureStore({
  reducer: {
    usersDataReducer,
    userReducer,
    businessReducer,
    businessBranchesReducer,
    roomTypeReducer,
    roomReducer,
    subjectReducer,
  },
  middleware: [api],
});
