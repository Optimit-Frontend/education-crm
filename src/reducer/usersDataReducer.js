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
  },
  reducers: {
    saveUser: (state, action) => {
      if (action.payload.success) {
        localStorage.setItem("EducationCRM", action.payload?.message);
        localStorage.setItem("userDataCRM", JSON.stringify(action.payload?.object));
        state.userToken = action.payload?.message;
        state.logout = false;
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
          }
        });
      } else {
        state.logout = true;
      }
    },
  },
});

export const { saveUser } = slice.actions;
export default slice.reducer;
