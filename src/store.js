import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/Axios";
import usersDataReducer from "./reducer/usersDataReducer";
import userReducer from "./reducer/userReducer.js";

export default configureStore({
  reducer: { usersDataReducer, userReducer },
  middleware: [api],
});
