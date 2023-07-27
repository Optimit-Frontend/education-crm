import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/Axios";
import usersDataReducer from "./reducer/usersDataReducer";
import userReducer from "./reducer/userReducer";
import businessReducer from "./reducer/businessReducer";

export default configureStore({
  reducer: { usersDataReducer, userReducer, businessReducer },
  middleware: [api],
});
