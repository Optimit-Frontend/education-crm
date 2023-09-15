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
    }
  },
});

export const { saveUser, logOutUser } = slice.actions;
export default slice.reducer;
