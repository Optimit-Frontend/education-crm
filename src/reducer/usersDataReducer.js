import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "usersData",
  initialState: {
    fullName: null,
    userToken: null,
    userData: null,
    businessId: null,
    branch: null,
    logout: false,
    // USER
    viewUser: false,
    addUser: false,
    editUser: false,
    deleteUser: false,
    // Role
    viewRole: false,
    addRole: false,
    editRole: false,
    deleteRole: false,
    // Ish turlari
    viewWorkType: false,
    editWorkType: false,
    addWorkType: false,
    deleteWorkType: false,
    // Achievment
    viewAchievement: false,
    editAchievement: false,
    addAchievement: false,
    deleteAchievement: false,
    // ish tajriba
    viewWorkExperience: false,
    editWorkExperience: false,
    addWorkExperience: false,
    deleteWorkExperience: false,
    // Talaba
    addStudent: false,
    editStudent: false,
    deleteStudent: false,
    viewStudent: false,
    // Sinf
    addClass: false,
    editClass: false,
    deleteClass: false,
    viewClass: false,
    // Student_account
    viewAccountNumber: false,
    addAccountNumber: false,
    editAccountNumber: false,
    deleteAccountNumber: false,
    // Student_Homework
    addHomework: false,
    deleteHomework: false,
    editHomework: false,
    viewHomework: false,
    // Transaction
    viewTransaction: false,
    editTransaction: false,
    deleteTransaction: false,
    addTransaction: false,
    // Family
    addFamily: false,
    editFamily: false,
    deleteFamily: false,
    viewFamily: false,
    // Salary
    addSalary: false,
    editSalary: false,
    deleteSalary: false,
    viewSalary: false,
    // Journal
    addJournal: false,
    editJournal: false,
    viewJournal: false,
    deleteJournal: false,
    // Score
    addScore: false,
    deleteScore: false,
    editScore: false,
    viewScore: false,
    // addAttendance
    addAttendance: false,
    editAttendance: false,
    deleteAttendance: false,
    viewAttendance: false,
    // LessonHour
    addLessonHour: false,
    editLessonHour: false,
    deleteLessonHour: false,
    viewLessonHour: false,
    // dars jadvali
    addSchedule: false,
    editSchedule: false,
    deleteSchedule: false,
    viewSchedule: false,
    // Mavzu
    addTopic: false,
    editTopic: false,
    deleteTopic: false,
    viewTopic: false,
    // Filial
    addBranch: false,
    editBranch: false,
    deleteBranch: false,
    viewBranch: false,
    // Warehouse
    addWerHouse: false,
    editWerHouse: false,
    deleteWerHouse: false,
    viewWerHouse: false,
    // Balance
    addBalance: false,
    editBalance: false,
    deleteBalance: false,
    viewBalance: false,
    // Xona
    addRoom: false,
    editRoom: false,
    deleteRoom: false,
    viewRoom: false,
    // Fan
    addSubject: false,
    editSubject: false,
    deleteSubject: false,
    viewSubject: false,
    // business
    addBusiness: false,
    editBusiness: false,
    viewBusiness: false,
    deleteBusiness: false,
    // ichimlik
    addPurchasedDrink: false,
    editPurchasedDrink: false,
    deletePurchasedDrink: false,
    viewPurchasedDrink: false,
    // ovqatlar
    addMeal: false,
    editMeal: false,
    deleteMeal: false,
    viewMeal: false,
    // Mahsulot
    addProduct: false,
    editProduct: false,
    deleteProduct: false,
    viewProduct: false,
  },
  reducers: {
    saveUser: (state, action) => {
      if (action.payload.success) {
        localStorage.setItem("EducationCRM", action.payload?.message);
        localStorage.setItem("userDataCRM", JSON.stringify(action.payload?.object));
        state.userToken = action.payload?.message;
        state.logout = false;
        state.fullName = `${action.payload?.object?.surname} ${action.payload?.object?.name}`;
        state.businessId = action.payload?.object?.businessId;
        state.branch = action.payload?.object?.branch;
        state.userData = action.payload?.object;
        state.userData?.role?.permissions.map((item) => {
          switch (item) {
            case "ADD_ROLE":
              state.addRole = true;
              break;
            case "EDIT_ROLE":
              state.editRole = true;
              break;
            case "DELETE_ROLE":
              state.deleteRole = true;
              break;
            case "DELETE_USER":
              state.deleteUser = true;
              break;
            case "EDIT_USER":
              state.editUser = true;
              break;
            case "GET_USER":
              state.viewUser = true;
              break;
            case "ADD_USER":
              state.addUser = true;
              break;
            case "ADD_TYPE_OF_WORK":
              state.addWorkType = true;
              break;
            case "EDIT_TYPE_OF_WORK":
              state.editWorkType = true;
              break;
            case "GET_TYPE_OF_WORK":
              state.viewWorkType = true;
              break;
            case "DELETE_TYPE_OF_WORK":
              state.deleteWorkType = true;
              break;
            case "ADD_ACHIEVEMENT":
              state.addAchievement = true;
              break;
            case "EDIT_ACHIEVEMENT":
              state.editAchievement = true;
              break;
            case "GET_ACHIEVEMENT":
              state.viewAchievement = true;
              break;
            case "DELETE_ACHIEVEMENT":
              state.deleteAchievement = true;
              break;
            case "ADD_WORK_EXPERIENCE":
              state.addWorkExperience = true;
              break;
            case "EDIT_WORK_EXPERIENCE":
              state.editWorkExperience = true;
              break;
            case "GET_WORK_EXPERIENCE":
              state.viewWorkExperience = true;
              break;
            case "DELETE_WORK_EXPERIENCE":
              state.deleteWorkExperience = true;
              break;
            case "ADD_STUDENT":
              state.addStudent = true;
              break;
            case "EDIT_STUDENT":
              state.editStudent = true;
              break;
            case "GET_STUDENT":
              state.viewStudent = true;
              break;
            case "DELETE_STUDENT":
              state.deleteStudent = true;
              break;
            case "ADD_STUDENT_CLASS":
              state.addClass = true;
              break;
            case "EDIT_STUDENT_CLASS":
              state.editClass = true;
              break;
            case "GET_STUDENT_CLASS":
              state.viewClass = true;
              break;
            case "DELETE_STUDENT_CLASS":
              state.deleteClass = true;
              break;
            case "ADD_STUDENT_ACCOUNT":
              state.addAccountNumber = true;
              break;
            case "EDIT_STUDENT_ACCOUNT":
              state.editAccountNumber = true;
              break;
            case "GET_STUDENT_ACCOUNT":
              state.viewAccountNumber = true;
              break;
            case "DELETE_STUDENT_ACCOUNT":
              state.deleteAccountNumber = true;
              break;
            case "GET_STUDENT_HOMEWORK":
              state.viewHomework = true;
              break;
            case "ADD_STUDENT_HOMEWORK":
              state.addHomework = true;
              break;
            case "EDIT_STUDENT_HOMEWORK":
              state.editHomework = true;
              break;
            case "DELETE_STUDENT_HOMEWORK":
              state.deleteHomework = true;
              break;
            case "GET_TRANSACTION_HISTORY":
              state.viewTransaction = true;
              break;
            case "ADD_TRANSACTION_HISTORY":
              state.addTransaction = true;
              break;
            case "EDIT_TRANSACTION_HISTORY":
              state.editTransaction = true;
              break;
            case "DELETE_TRANSACTION_HISTORY":
              state.deleteTransaction = true;
              break;
            case "ADD_FAMILY":
              state.addFamily = true;
              break;
            case "EDIT_FAMILY":
              state.editFamily = true;
              break;
            case "GET_FAMILY":
              state.viewFamily = true;
              break;
            case "DELETE_FAMILY":
              state.deleteFamily = true;
              break;
            case "ADD_SALARY":
              state.addSalary = true;
              break;
            case "EDIT_SALARY":
              state.editSalary = true;
              break;
            case "DELETE_SALARY":
              state.deleteSalary = true;
              break;
            case "GET_SALARY":
              state.viewSalary = true;
              break;
            case "GET_JOURNAL":
              state.viewJournal = true;
              break;
            case "DELETE_JOURNAL":
              state.deleteJournal = true;
              break;
            case "ADD_JOURNAL":
              state.addJournal = true;
              break;
            case "EDIT_JOURNAL":
              state.editJournal = true;
              break;
            case "EDIT_SCORE":
              state.editScore = true;
              break;
            case "ADD_SCORE":
              state.addScore = true;
              break;
            case "GET_SCORE":
              state.viewScore = true;
              break;
            case "DELETE_SCORE":
              state.deleteScore = true;
              break;
            case "ADD_STAFF_ATTENDANCE":
              state.addAttendance = true;
              break;
            case "EDIT_STAFF_ATTENDANCE":
              state.editAttendance = true;
              break;
            case "GET_STAFF_ATTENDANCE":
              state.viewAttendance = true;
              break;
            case "DELETE_STAFF_ATTENDANCE":
              state.deleteAttendance = true;
              break;
            case "ADD_TEACHING_HOURS":
              state.addLessonHour = true;
              break;
            case "EDIT_TEACHING_HOURS":
              state.editLessonHour = true;
              break;
            case "DELETE_TEACHING_HOURS":
              state.deleteLessonHour = true;
              break;
            case "GET_TEACHING_HOURS":
              state.viewLessonHour = true;
              break;
            case "ADD_LESSON_SCHEDULE":
              state.addSchedule = true;
              break;
            case "EDIT_LESSON_SCHEDULE":
              state.editSchedule = true;
              break;
            case "DELETE_LESSON_SCHEDULE":
              state.deleteSchedule = true;
              break;
            case "GET_LESSON_SCHEDULE":
              state.viewSchedule = true;
              break;
            case "ADD_TOPIC":
              state.addTopic = true;
              break;
            case "EDIT_TOPIC":
              state.editTopic = true;
              break;
            case "DELETE_TOPIC":
              state.deleteTopic = true;
              break;
            case "GET_TOPIC":
              state.viewTopic = true;
              break;
            case "GET_BRANCH":
              state.viewBranch = true;
              break;
            case "ADD_BRANCH":
              state.addBranch = true;
              break;
            case "EDIT_BRANCH":
              state.editBranch = true;
              break;
            case "DELETE_BRANCH":
              state.deleteBranch = true;
              break;
            case "ADD_WAREHOUSE":
              state.addWerHouse = true;
              break;
            case "EDIT_WAREHOUSE":
              state.editWerHouse = true;
              break;
            case "GET_WAREHOUSE":
              state.viewWerHouse = true;
              break;
            case "DELETE_WAREHOUSE":
              state.deleteWerHouse = true;
              break;
            case "DELETE_MAIN_BALANCE":
              state.deleteBalance = true;
              break;
            case "ADD_MAIN_BALANCE":
              state.addBalance = true;
              break;
            case "EDIT_MAIN_BALANCE":
              state.editBalance = true;
              break;
            case "GET_MAIN_BALANCE":
              state.viewBalance = true;
              break;
            case "GET_ROOM":
              state.viewRoom = true;
              break;
            case "ADD_ROOM":
              state.addRoom = true;
              break;
            case "EDIT_ROOM":
              state.editRoom = true;
              break;
            case "DELETE_ROOM":
              state.deleteRoom = true;
              break;
            case "DELETE_SUBJECT":
              state.deleteSubject = true;
              break;
            case "EDIT_SUBJECT":
              state.editSubject = true;
              break;
            case "ADD_SUBJECT":
              state.addSubject = true;
              break;
            case "GET_SUBJECT":
              state.viewSubject = true;
              break;
            case "ADD_BUSINESS":
              state.addBusiness = true;
              break;
            case "EDIT_BUSINESS":
              state.editBusiness = true;
              break;
            case "DELETE_BUSINESS":
              state.deleteBusiness = true;
              break;
            case "GET_BUSINESS":
              state.viewBusiness = true;
              break;
            case "GET_PURCHASED_DRINK":
              state.viewPurchasedDrink = true;
              break;
            case "DELETE_PURCHASED_DRINK":
              state.deletePurchasedDrink = true;
              break;
            case "ADD_PURCHASED_DRINK":
              state.addPurchasedDrink = true;
              break;
            case "EDIT_PURCHASED_DRINK":
              state.editPurchasedDrink = true;
              break;
            case "EDIT_DAILY_MEAL":
              state.editMeal = true;
              break;
            case "ADD_DAILY_MEAL":
              state.addMeal = true;
              break;
            case "DELETE_DAILY_MEAL":
              state.deleteMeal = true;
              break;
            case "GET_DAILY_MEAL":
              state.viewMeal = true;
              break;
            case "DELETE_PURCHASED_PRODUCT":
              state.deleteProduct = true;
              break;
            case "ADD_PURCHASED_PRODUCT":
              state.addProduct = true;
              break;
            case "EDIT_PURCHASED_PRODUCT":
              state.editProduct = true;
              break;
            case "GET_PURCHASED_PRODUCT":
              state.viewProduct = true;
              break;
          }
        });
      } else {
        state.logout = true;
      }
    },
    logOutUser: (state) => {
      localStorage.removeItem("EducationCRM");
      localStorage.removeItem("userDataCRM");
      state.fullName = null;
      state.userToken = null;
      state.userData = null;
      state.businessId = null;
      state.branch = null;
      state.logout = false;
      // USER
      state.viewUser = false;
      state.addUser = false;
      state.editUser = false;
      state.deleteUser = false;
      // Role
      state.viewRole = false;
      state.addRole = false;
      state.editRole = false;
      state.deleteRole = false;
      // Ish turlari
      state.viewWorkType = false;
      state.editWorkType = false;
      state.addWorkType = false;
      state.deleteWorkType = false;
      // Achievment
      state.viewAchievement = false;
      state.editAchievement = false;
      state.addAchievement = false;
      state.deleteAchievement = false;
      // ish tajriba
      state.viewWorkExperience = false;
      state.editWorkExperience = false;
      state.addWorkExperience = false;
      state.deleteWorkExperience = false;
      // Talaba
      state.addStudent = false;
      state.editStudent = false;
      state.deleteStudent = false;
      state.viewStudent = false;
      // sinf
      state.addClass = false;
      state.editClass = false;
      state.deleteClass = false;
      state.viewClass = false;
      // accountNumber
      state.addAccountNumber = false;
      state.editAccountNumber = false;
      state.deleteAccountNumber = false;
      state.viewAccountNumber = false;
      // homework
      state.addHomework = false;
      state.editHomework = false;
      state.deleteHomework = false;
      state.viewHomework = false;
      // transaction
      state.addTransaction = false;
      state.editTransaction = false;
      state.deleteTransaction = false;
      state.viewTransaction = false;
      // family
      state.addFamily = false;
      state.editFamily = false;
      state.deleteFamily = false;
      state.viewFamily = false;
      // maoshlar
      state.addSalary = false;
      state.editSalary = false;
      state.deleteSalary = false;
      state.viewSalary = false;
      // jurnal
      state.addJournal = false;
      state.editJournal = false;
      state.deleteJournal = false;
      state.viewJournal = false;
      // baho
      state.addScore = false;
      state.editScore = false;
      state.deleteScore = false;
      state.viewScore = false;
      // attendance
      state.addAttendance = false;
      state.editAttendance = false;
      state.deleteAttendance = false;
      state.viewAttendance = false;
      // dars soati
      state.addLessonHour = false;
      state.editLessonHour = false;
      state.deleteLessonHour = false;
      state.viewLessonHour = false;
      // dars jadvali
      state.addSchedule = false;
      state.editSchedule = false;
      state.deleteSchedule = false;
      state.viewSchedule = false;
      // Mavzu
      state.addTopic = false;
      state.editTopic = false;
      state.deleteTopic = false;
      state.viewTopic = false;
      // branch
      state.addBranch = false;
      state.editBranch = false;
      state.deleteBranch = false;
      state.viewBranch = false;
      // warehouse
      state.addWarehouse = false;
      state.editWarehouse = false;
      state.deleteWarehouse = false;
      state.viewWarehouse = false;
      // balance
      state.addBalance = false;
      state.editBalance = false;
      state.deleteBalance = false;
      state.viewBalance = false;
      // room
      state.addRoom = false;
      state.editRoom = false;
      state.deleteRoom = false;
      state.viewRoom = false;
      // fan
      state.addSubject = false;
      state.editSubject = false;
      state.deleteSubject = false;
      state.viewSubject = false;
      // business
      state.addBusiness = false;
      state.editBusiness = false;
      state.deleteBusiness = false;
      state.viewBusiness = false;
      // drink
      state.addPurchasedDrink = false;
      state.editPurchasedDrink = false;
      state.viewPurchasedDrink = false;
      state.deletePurchasedDrink = false;
      // meal
      state.addMeal = false;
      state.editMeal = false;
      state.deleteMeal = false;
      state.viewMeal = false;
      // Product
      state.addProduct = false;
      state.editProduct = false;
      state.deleteProduct = false;
      state.viewProduct = false;
    }
  },
});

export const { saveUser, logOutUser } = slice.actions;
export default slice.reducer;
