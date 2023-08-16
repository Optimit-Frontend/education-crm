import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/Axios";
import usersDataReducer from "./reducer/usersDataReducer";
import businessReducer from "./reducer/businessReducer";
import businessBranchesReducer from "./reducer/businessBranchesReducer";
import roomTypeReducer from "./reducer/roomTypeReducer";
import roomReducer from "./reducer/roomReducer";
import subjectReducer from "./reducer/subjectReducer";
import subjectForLevelReducer from "./reducer/subjectForLevelReducer";
import roleReducer from "./reducer/roleReducer";
import employeeReducer from "./reducer/employeeReducer";
import studentReducer from "./reducer/studentReducer";
import classReducer from "./reducer/classReducer";
import achievementReducer from "./reducer/achievementReducer";
import purchasedProductReducer from "./reducer/purchasedProductReducer";
import purchasedDrinkReducer from "./reducer/purchasedDrinkReducer";
import dailyConsumedProductsReducer from "./reducer/dailyConsumedProductsReducer";
import dailyConsumedDrinksReducer from "./reducer/dailyConsumedDrinksReducer";
import warehouseReducer from "./reducer/warehouseReducer";
import typeOfWorkReducer from "./reducer/typeOfWorkReducer";
import productReducer from "./reducer/productReducer";
import drinksReducer from "./reducer/drinksReducer";
import balanceReducer from "./reducer/balanceReducer";
import workExpirenceReducer from "./reducer/workExpirenceReducer";
import levelReducer from "./reducer/levelReducer";
import transactionReducer from "./reducer/transactionReducer";
import studentAccountReducer from "./reducer/studentAccountReducer";

export default configureStore({
  reducer: {
    usersDataReducer,
    businessReducer,
    businessBranchesReducer,
    roomTypeReducer,
    roomReducer,
    subjectReducer,
    subjectForLevelReducer,
    roleReducer,
    balanceReducer,
    workExpirenceReducer,
    employeeReducer,
    typeOfWorkReducer,
    achievementReducer,
    warehouseReducer,
    productReducer,
    drinksReducer,
    purchasedProductReducer,
    purchasedDrinkReducer,
    dailyConsumedProductsReducer,
    dailyConsumedDrinksReducer,
    studentReducer,
    classReducer,
    levelReducer,
    transactionReducer,
    studentAccountReducer
  },
  middleware: [api],
});
