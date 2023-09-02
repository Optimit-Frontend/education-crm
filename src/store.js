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
import dailyMealReducer from "./reducer/dailyMealReducer";
import warehouseReducer from "./reducer/warehouseReducer";
import typeOfWorkReducer from "./reducer/typeOfWorkReducer";
import productReducer from "./reducer/productReducer";
import drinksReducer from "./reducer/drinksReducer";
import balanceReducer from "./reducer/balanceReducer";
import workExpirenceReducer from "./reducer/workExpirenceReducer";
import levelReducer from "./reducer/levelReducer";
import transactionReducer from "./reducer/transactionReducer";
import studentAccountReducer from "./reducer/studentAccountReducer";
import salaryReducer from "./reducer/salaryReducer";
import journalReducer from "./reducer/journalReducer";
import studentHomeworkReducer from "./reducer/studentHomeworkReducer";
import scoreReducer from "./reducer/scoreReducer";
import attendanceReducer from "./reducer/attendanceReducer";
import teachingHourReducer from "./reducer/teachingHourReducer";
import lessonScheduleReducer from "./reducer/lessonScheduleReducer";
import familiyReducer from "./reducer/familiyReducer";
import topicReducer from "./reducer/topicReducer";
import photoReducer from "./reducer/photoReducer.js";

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
    dailyMealReducer,
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
    studentAccountReducer,
    salaryReducer,
    journalReducer,
    studentHomeworkReducer,
    scoreReducer,
    attendanceReducer,
    teachingHourReducer,
    lessonScheduleReducer,
    familiyReducer,
    topicReducer,
    photoReducer,
  },
  middleware: [api],
});
