import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/Axios";
import usersDataReducer from "./reducer/usersDataReducer";

export default configureStore({
  reducer: { usersDataReducer },
  middleware: [api],
});
