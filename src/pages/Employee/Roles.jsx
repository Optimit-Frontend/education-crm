import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../role.css";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import roleReducer, {
  deleteRole,
  editRole,
  getRoleBranch,
  saveRole
} from "../../reducer/roleReducer";
import usersDataReducer from "../../reducer/usersDataReducer";

function Roles({
  roleReducer,
  usersDataReducer,
  saveRole,
  editRole
}) {
  const navigate = useNavigate();
  const { roleId } = useParams();

  useEffect(() => {
    roleId && editl();
  }, []);

  useEffect(() => {
    roleReducer?.changeData && navigate("/employee/role");
  }, [roleReducer?.changeData]);

  const [input, setInput] = useState(
    {
    //   USER
      viewUser: null,
      viewUserChecked: false,
      addUser: null,
      addUserChecked: false,
      editUser: null,
      editUserChecked: false,
      deleteUser: null,
      deleteUserChecked: false,
      // Roles
      AllRoleRoles: false,
      viewRole: null,
      viewRoleChecked: false,
      addRole: null,
      addRoleChecked: false,
      editRole: null,
      editRoleChecked: false,
      deleteRole: null,
      deleteRoleChecked: false,
      // WorkType
      AllWorkTypeRoles: false,
      viewWorkType: null,
      viewWorkTypeChecked: false,
      addWorkType: null,
      addWorkTypeChecked: false,
      editWorkType: null,
      editWorkTypeChecked: false,
      deleteWorkType: null,
      deleteWorkTypeChecked: false,
      //   Hodim yutuqlari
      AllAchievementRoles: false,
      viewAchievement: null,
      viewAchievementChecked: false,
      addAchievement: null,
      addAchievementChecked: false,
      editAchievement: null,
      editAchievementChecked: false,
      deleteAchievement: null,
      deleteAchievementChecked: false,
      // ish tajribasi
      AllWorkExperienceRoles: false,
      viewWorkExperience: null,
      viewWorkExperienceChecked: false,
      addWorkExperience: null,
      addWorkExperienceChecked: false,
      editWorkExperience: null,
      editWorkExperienceChecked: false,
      deleteWorkExperience: null,
      deleteWorkExperienceChecked: false,
      // students
      AllStudentRoles: false,
      viewStudent: null,
      viewStudentChecked: false,
      addStudent: null,
      addStudentChecked: false,
      editStudent: null,
      editStudentChecked: false,
      deleteStudent: null,
      deleteStudentChecked: false,
      // Sinf
      AllClassRoles: false,
      viewClass: null,
      viewClassChecked: false,
      addClass: null,
      addClassChecked: false,
      editClass: null,
      editClassChecked: false,
      deleteClass: null,
      deleteClassChecked: false,
      // accountNumber
      AllAccountNumberRoles: false,
      viewAccountNumber: null,
      viewAccountNumberChecked: false,
      addAccountNumber: null,
      addAccountNumberChecked: false,
      editAccountNumber: null,
      editAccountNumberChecked: false,
      deleteAccountNumber: null,
      deleteAccountNumberChecked: false,
      // Homework
      AllHomeworkRoles: false,
      addHomework: null,
      addHomeworkChecked: false,
      editHomework: null,
      editHomeworkChecked: false,
      viewHomework: null,
      viewHomeworkChecked: false,
      deleteHomework: null,
      deleteHomeworkChecked: false,
      // Transaction
      AllTransactionRoles: false,
      viewTransaction: null,
      viewTransactionChecked: false,
      addTransaction: null,
      addTransactionChecked: false,
      editTransaction: null,
      editTransactionChecked: false,
      deleteTransaction: null,
      deleteTransactionChecked: false,
      // Family
      AllFamilyRoles: false,
      viewFamily: null,
      viewFamilyChecked: false,
      addFamily: null,
      addFamilyChecked: false,
      editFamily: null,
      editFamilyChecked: false,
      deleteFamily: null,
      deleteFamilyChecked: false,
      // Salary
      AllSalaryRoles: false,
      viewSalary: null,
      viewSalaryChecked: false,
      addSalary: null,
      addSalaryChecked: false,
      editSalary: null,
      editSalaryChecked: false,
      deleteSalary: null,
      deleteSalaryChecked: false,
      // Journal
      AllJournalRoles: false,
      viewJournal: null,
      viewJournalChecked: false,
      addJournal: null,
      addJournalChecked: false,
      editJournal: null,
      editJournalChecked: false,
      deleteJournal: null,
      deleteJournalChecked: false,
      // Score
      AllScoreRoles: false,
      viewScore: null,
      viewScoreChecked: false,
      addScore: null,
      addScoreChecked: false,
      editScore: null,
      editScoreChecked: false,
      deleteScore: null,
      deleteScoreChecked: false,
      // Attendance
      AllAttendanceRoles: false,
      viewAttendance: null,
      viewAttendanceChecked: false,
      addAttendance: null,
      addAttendanceChecked: false,
      editAttendance: null,
      editAttendanceChecked: false,
      deleteAttendance: null,
      deleteAttendanceChecked: false,
      // leesonHour
      AllLessonHourRoles: false,
      addLessonHour: null,
      addLessonHourChecked: false,
      editLessonHour: null,
      editLessonHourChecked: false,
      viewLessonHour: null,
      viewLessonHourChecked: false,
      deleteLessonHour: null,
      deleteLessonHourChecked: false,
      // leesonSchedule
      AllScheduleRoles: false,
      addSchedule: null,
      addScheduleChecked: false,
      editSchedule: null,
      editScheduleChecked: false,
      viewSchedule: null,
      viewScheduleChecked: false,
      deleteSchedule: null,
      deleteScheduleChecked: null,
      // Mavzu
      AllThemeRoles: false,
      addTheme: null,
      addThemeChecked: false,
      editTheme: null,
      editThemeChecked: false,
      viewTheme: null,
      viewThemeChecked: false,
      deleteTheme: null,
      deleteThemeChecked: null,
      // Branch
      AllBranchRoles: false,
      addBranch: null,
      addBranchChecked: false,
      editBranch: null,
      editBranchChecked: false,
      viewBranch: null,
      viewBranchChecked: false,
      deleteBranch: null,
      deleteBranchChecked: null,
      // Room
      AllRoomRoles: false,
      addRoom: null,
      addRoomChecked: false,
      editRoom: null,
      editRoomChecked: false,
      viewRoom: null,
      viewRoomChecked: false,
      deleteRoom: null,
      deleteRoomChecked: null,
      // Subject
      AllSubjectRoles: false,
      addSubject: null,
      addSubjectChecked: false,
      viewSubject: null,
      viewSubjectChecked: false,
      editSubject: null,
      editSubjectChecked: false,
      deleteSubject: null,
      deleteSubjectChecked: null,
      // Balance
      AllBalanceRoles: false,
      addBalance: null,
      addBalanceChecked: false,
      editBalance: null,
      editBalanceChecked: false,
      viewBalance: null,
      viewBalanceChecked: false,
      deleteBalance: null,
      deleteBalanceChecked: null,
      // Werhouse
      AllWerHouseRoles: false,
      addWerHouse: null,
      addWerHouseChecked: false,
      editWerHouse: null,
      editWerHouseChecked: false,
      viewWerHouse: null,
      viewWerHouseChecked: false,
      deleteWerHouse: null,
      deleteWerHouseChecked: false,
      // Bizneslar
      AllBusinessRoles: false,
      addBusiness: null,
      addBusinessChecked: false,
      editBusiness: null,
      editBusinessChecked: false,
      deleteBusiness: null,
      deleteBusinessChecked: false,
      viewBusiness: null,
      viewBusinessChecked: false
    }
  );

  const [roles, setRoles] = useState({
    AllUserRoles: ["addUser", "deleteUser", "editUser", "viewUser"],
    AllUserRolesValue: ["ADD_USER", "DELETE_USER", "EDIT_USER", "GET_USER"],
    AllRoleRoles: ["addRole", "deleteRole", "editRole", "viewRole"],
    AllRoleRolesValue: ["ADD_ROLE", "DELETE_ROLE", "EDIT_ROLE", "GET_ROLE"],
    AllWorkTypeRoles: ["addWorkType", "deleteWorkType", "editWorkType", "viewWorkType"],
    AllWorkTypeRolesValue: ["ADD_WORK_OF_TYPE", "DELETE_WORK_OF_TYPE", "EDIT_WORK_OF_TYPE", "GET_WORK_OF_TYPE"],
    AllAchievementRoles: ["addAchievement", "deleteAchievement", "editAchievement", "viewAchievement"],
    AllAchievementRolesValue: ["ADD_ACHIEVEMENT", "DELETE_ACHIEVEMENT", "EDIT_ACHIEVEMENT", "GET_ACHIEVEMENT"],
    AllWorkExperienceRoles: ["addWorkExperience", "deleteWorkExperience", "viewWorkExperience", "editWorkExperience"],
    AllWorkExperienceRolesValue: ["ADD_WORK_EXPERIENCE", "DELETE_WORK_EXPERIENCE", "GET_WORK_EXPERIENCE", "EDIT_WORK_EXPERIENCE"],
    AllStudentRoles: ["addStudent", "deleteStudent", "viewStudent", "editStudent"],
    AllStudentRolesValue: ["ADD_STUDENT", "DELETE_STUDENT", "GET_STUDENT", "EDIT_STUDENT"],
    AllClassRoles: ["addClass", "deleteClass", "viewClass", "editClass"],
    AllClassRolesValue: ["ADD_STUDENT_CLASS", "DELETE_STUDENT_CLASS", "GET_STUDENT_CLASS", "EDIT_STUDENT_CLASS"],
    AllAccountNumberRoles: ["addAccountNumber", "deleteAccountNumber", "viewAccountNumber", "editAccountNumber"],
    AllAccountNumberRolesValue: ["ADD_STUDENT_ACCOUNT", "DELETE_STUDENT_ACCOUNT", "GET_STUDENT_ACCOUNT", "EDIT_STUDENT_ACCOUNT"],
    AllHomeworkRoles: ["addHomework", "deleteHomework", "viewHomework", "editHomework"],
    AllHomeworkRolesValue: ["ADD_STUDENT_HOMEWORK", "DELETE_STUDENT_HOMEWORK", "GET_STUDENT_HOMEWORK", "EDIT_STUDENT_HOMEWORK"],
    AllTransactionRoles: ["addTransaction", "deleteTransaction", "viewTransaction", "editTransaction"],
    AllTransactionRolesValue: ["ADD_TRANSACTION", "DELETE_TRANSACTION", "GET_TRANSACTION", "EDIT_TRANSACTION"],
    AllFamilyRoles: ["addFamily", "deleteFamily", "editFamily", "viewFamily"],
    AllFamilyRolesValue: ["ADD_FAMILY", "DELETE_FAMILY", "GET_FAMILY", "EDIT_FAMILY"],
    AllSalaryRoles: ["addSalary", "deleteSalary", "editSalary", "viewSalary"],
    AllSalaryRolesValue: ["ADD_SALARY", "DELETE_SALARY", "GET_SALARY", "EDIT_SALARY"],
    AllJournalRoles: ["addJournal", "deleteJournal", "editJournal", "viewJournal"],
    AllJournalRolesValue: ["ADD_JOURNAL", "DELETE_JOURNAL", "GET_JOURNAL", "EDIT_JOURNAL"],
    AllScoreRoles: ["addScore", "deleteScore", "viewScore", "editScore"],
    AllScoreRolesValue: ["ADD_SCORE", "DELETE_SCORE", "GET_SCORE", "EDIT_SCORE"],
    AllAttendanceRoles: ["addAttendance", "deleteAttendance", "viewAttendance", "editAttendance"],
    AllAttendanceRolesValue: ["ADD_STAFF_ATTENDANCE", "DELETE_STAFF_ATTENDANCE", "GET_STAFF_ATTENDANCE", "EDIT_STAFF_ATTENDANCE"],
    AllLessonHourRoles: ["addLessonHour", "deleteLessonHour", "viewLessonHour", "editLessonHour"],
    AllLessonHourRolesValue: ["ADD_TEACHING_HOURS", "DELETE_TEACHING_HOURS", "GET_TEACHING_HOURS", "EDIT_TEACHING_HOURS"],
    AllScheduleRoles: ["addSchedule", "deleteSchedule", "viewSchedule", "editSchedule"],
    AllScheduleRolesValue: ["ADD_LESSON_SCHEDULE", "DELETE_LESSON_SCHEDULE", "GET_LESSON_SCHEDULE", "EDIT_LESSON_SCHEDULE"],
    AllThemeRoles: ["addTheme", "deleteTheme", "viewTheme", "editTheme"],
    AllThemeRolesValue: ["ADD_TOPIC", "DELETE_TOPIC", "GET_TOPIC", "EDIT_TOPIC"],
    AllBranchRoles: ["addBranch", "deleteBranch", "viewBranch", "editBranch"],
    AllBranchRolesValue: ["ADD_BRANCH", "DELETE_BRANCH", "GET_BRANCH", "EDIT_BRANCH"],
    AllRoomRoles: ["addRoom", "deleteRoom", "viewRoom", "editRoom"],
    AllRoomRolesValue: ["ADD_ROOM", "DELETE_ROOM", "GET_ROOM", "EDIT_ROOM"],
    AllSubjectRoles: ["addSubject", "deleteSubject", "viewSubject", "editSubject"],
    AllSubjectRolesValue: ["ADD_SUBJECT", "DELETE_SUBJECT", "GET_SUBJECT", "EDIT_SUBJECT"],
    AllBalanceRoles: ["addBalance", "deleteBalance", "viewBalance", "editBalance"],
    AllBalanceRolesValue: ["ADD_MAIN_BALANCE", "DELETE_MAIN_BALANCE", "GET_MAIN_BALANCE", "EDIT_MAIN_BALANCE"],
    AllWerHouseRoles: ["addWerHouse", "deleteWerHouse", "viewWerHouse", "editWerHouse"],
    AllWerHouseRolesValue: ["ADD_WAREHOUSE", "DELETE_WAREHOUSE", "GET_WAREHOUSE", "EDIT_WAREHOUSE"],
    AllBusinessRoles: ["addBusiness", "deleteBusiness", "viewBusiness", "editBusiness"],
    AllBusinessRolesValue: ["ADD_BUSINESS", "DELETE_BUSINESS", "GET_BUSINESS", "EDIT_BUSINESS"]
  });

  const [permission, setpermission] = useState([]);
  const [name, setName] = useState("");

  function changeAllUserRoles(e) {
    if (e.target.checked) {
      input[e.target.name] = e.target.checked;
      roles[e.target.name].map((item, index) => {
        roles[`${e.target.name}Value`].map((value, label) => {
          if (index === label) {
            input[item] = value;
            input[`${item}Checked`] = e.target.checked;
          }
        });
      });
    } else {
      input[e.target.name] = e.target.checked;
      roles[e.target.name].map((item) => {
        input[item] = null;
        input[`${item}Checked`] = e.target.checked;
      });
    }
    const a = { ...input };
    setInput(a);
  }

  function changeRoles(e) {
    if (e.target.checked) {
      input[e.target.name] = e.target.value;
      input[`${e.target.name}Checked`] = e.target.checked;
    } else {
      input[e.target.name] = null;
      input[`${e.target.name}Checked`] = e.target.checked;
    }
    checkPermission();
  }

  function checkPermission() {
    input.AllUserRoles = input.addUserChecked && input.editUserChecked
      && input.deleteUserChecked && input.viewUserChecked;
    input.AllRoleRoles = input.addRoleChecked && input.editRoleChecked
      && input.deleteRoleChecked && input.viewRoleChecked;
    input.AllWorkTypeRoles = input.addWorkTypeChecked && input.editWorkTypeChecked
      && input.deleteWorkTypeChecked && input.viewWorkTypeChecked;
    input.AllAchievementRoles = input.addAchievementChecked && input.editAchievementChecked
      && input.deleteAchievementChecked && input.viewAchievementChecked;
    input.AllWorkExperienceRoles = input.addWorkExperienceChecked && input.editWorkExperienceChecked
      && input.deleteWorkExperienceChecked && input.viewWorkExperienceChecked;
    input.AllStudentRoles = input.addStudentChecked && input.editStudentChecked
      && input.viewStudentChecked && input.deleteStudentChecked;
    input.AllAccountNumberRoles = input.addAccountNumberChecked
      && input.editAccountNumberChecked && input.deleteAccountNumberChecked && input.viewAccountNumber;
    input.AllHomeworkRoles = input.addHomeworkChecked && input.editHomeworkChecked
      && input.deleteHomeworkChecked && input.viewHomeworkChecked;
    input.AllTransactionRoles = input.addTransactionChecked && input.editTransactionChecked
      && input.viewTransactionChecked && input.deleteTransactionChecked;
    input.AllFamilyRoles = input.addFamilyChecked && input.editFamilyChecked
      && input.viewFamilyChecked && input.deleteFamilyChecked;
    input.AllSalaryRoles = input.addSalaryChecked && input.editSalaryChecked
      && input.deleteSalaryChecked && input.viewSalaryChecked;
    input.AllJournalRoles = input.addJournalChecked && input.editJournalChecked
      && input.viewJournalChecked && input.deleteJournalChecked;
    input.AllScoreRoles = input.addScoreChecked && input.editScoreChecked
      && input.viewScoreChecked && input.deleteScoreChecked;
    input.AllAttendanceRoles = input.addAttendanceChecked && input.editAttendanceChecked
      && input.viewAttendanceChecked && input.deleteAttendanceChecked;
    input.AllLessonHourRoles = input.addLessonHourChecked && input.editLessonHourChecked
      && input.viewLessonHourChecked && input.deleteLessonHourChecked;
    input.AllScheduleRoles = input.addScheduleChecked && input.editScheduleChecked
      && input.viewScheduleChecked && input.deleteScheduleChecked;
    input.AllThemeRoles = input.addThemeChecked && input.editThemeChecked
      && input.viewThemeChecked && input.deleteThemeChecked;
    input.AllBranchRoles = input.addBranchChecked && input.editBranchChecked
      && input.viewBranchChecked && input.deleteBranchChecked;
    input.AllRoomRoles = input.addRoomChecked && input.editRoomChecked
      && input.viewRoomChecked && input.deleteRoomChecked;
    input.AllSubjectRoles = input.addSubjectChecked && input.editSubjectChecked
      && input.viewSubjectChecked && input.deleteSubjectChecked;
    input.AllBalanceRoles = input.addBalanceChecked && input.editBalanceChecked
      && input.viewBalanceChecked && input.deleteBalanceChecked;
    input.AllWerkRoles = input.addWerHouseChecked && input.editWerHouseChecked
      && input.viewWerHouseChecked && input.deleteWerHouseChecked;
    input.AllBusinessRoles = input.addBusinessChecked && input.editBusinessChecked
      && input.viewBusinessChecked && input.deleteBusinessChecked;

    const a = { ...input };
    setInput(a);
  }

  function editl() {
    if (roleReducer.role) {
      roleReducer.role?.map((item) => {
        if (parseInt(roleId, 10) === item.id) {
          editl2(item);
        }
      });
    }
  }

  function editl2(item) {
    const a = item.permissions;
    setName(item.name);
    a.map((item) => {
      switch (item) {
        case "ADD_USER":
          input.addUserChecked = true;
          input.addUser = "ADD_USER";
          break;
        case "GET_USER":
          input.viewUserChecked = true;
          input.viewUser = "GET_USER";
          break;
        case "EDIT_USER":
          input.editUserChecked = true;
          input.editUser = "EDIT_USER";
          break;
        case "DELETE_USER":
          input.deleteUserChecked = true;
          input.deleteUser = "DELETE_USER";
          break;
        case "ADD_ROLE":
          input.addRoleChecked = true;
          input.addRole = "ADD_ROLE";
          break;
        case "EDIT_ROLE":
          input.editRoleChecked = true;
          input.editRole = "EDIT_ROLE";
          break;
        case "DELETE_ROLE":
          input.deleteRoleChecked = true;
          input.deleteRole = "DELETE_ROLE";
          break;
        case "ADD_TYPE_OF_WORK":
          input.addWorkTypeChecked = true;
          input.addWorkType = "ADD_TYPE_OF_WORK";
          break;
        case "EDIT_TYPE_OF_WORK":
          input.editWorkTypeChecked = true;
          input.editWorkType = "EDIT_TYPE_OF_WORK";
          break;
        case "GET_TYPE_OF_WORK":
          input.viewWorkTypeChecked = true;
          input.viewWorkType = "GET_TYPE_OF_WORK";
          break;
        case "DELETE_TYPE_OF_WORK":
          input.deleteWorkTypeChecked = true;
          input.deleteWorkType = "DELETE_TYPE_OF_WORK";
          break;
        case "ADD_ACHIEVEMENT":
          input.addAchievementChecked = true;
          input.addAchievement = "ADD_ACHIEVEMENT";
          break;
        case "EDIT_ACHIEVEMENT":
          input.editAchievementChecked = true;
          input.editAchievement = "EDIT_ACHIEVEMENT";
          break;
        case "GET_ACHIEVEMENT":
          input.viewAchievementChecked = true;
          input.viewAchievement = "GET_ACHIEVEMENT";
          break;
        case "DELETE_ACHIEVEMENT":
          input.deleteAchievementChecked = true;
          input.deleteAchievement = "DELETE_ACHIEVEMENT";
          break;
        case "ADD_WORK_EXPERIENCE":
          input.addWorkExperienceChecked = true;
          input.addWorkExperience = "ADD_WORK_EXPERIENCE";
          break;
        case "EDIT_WORK_EXPERIENCE":
          input.editWorkExperienceChecked = true;
          input.editWorkExperience = "EDIT_WORK_EXPERIENCE";
          break;
        case "GET_WORK_EXPERIENCE":
          input.viewWorkExperienceChecked = true;
          input.viewWorkExperience = "GET_WORK_EXPERIENCE";
          break;
        case "DELETE_WORK_EXPERIENCE":
          input.deleteWorkExperienceChecked = true;
          input.deleteWorkExperience = "DELETE_WORK_EXPERIENCE";
          break;
        case "ADD_STUDENT":
          input.addStudentChecked = true;
          input.addStudent = "ADD_STUDENT";
          break;
        case "EDIT_STUDENT":
          input.editStudentChecked = true;
          input.editStudent = "EDIT_STUDENT";
          break;
        case "GET_STUDENT":
          input.viewStudentChecked = true;
          input.viewStudent = "GET_STUDENT";
          break;
        case "DELETE_STUDENT":
          input.deleteStudentChecked = true;
          input.deleteStudent = "DELETE_STUDENT";
          break;
        case "ADD_STUDENT_CLASS":
          input.addClassChecked = true;
          input.addClass = "ADD_STUDENT_CLASS";
          break;
        case "EDIT_STUDENT_CLASS":
          input.editClassChecked = true;
          input.editClass = "EDIT_STUDENT_CLASS";
          break;
        case "GET_STUDENT_CLASS":
          input.viewClassChecked = true;
          input.viewClass = "GET_STUDENT_CLASS";
          break;
        case "DELETE_STUDENT_CLASS":
          input.deleteClassChecked = true;
          input.deleteClass = "DELETE_STUDENT_CLASS";
          break;
        case "ADD_STUDENT_ACCOUNT":
          input.addAccountNumberChecked = true;
          input.addAccountNumber = "ADD_STUDENT_ACCOUNT";
          break;
        case "EDIT_STUDENT_ACCOUNT":
          input.editAccountNumberChecked = true;
          input.editAccountNumber = "EDIT_STUDENT_ACCOUNT";
          break;
        case "GET_STUDENT_ACCOUNT":
          input.viewAccountNumberChecked = true;
          input.viewAccountNumber = "GET_STUDENT_ACCOUNT";
          break;
        case "DELETE_STUDENT_ACCOUNT":
          input.deleteAccountNumberChecked = true;
          input.deleteAccountNumber = "DELETE_STUDENT_ACCOUNT";
          break;
        case "GET_STUDENT_HOMEWORK":
          input.viewHomeworkChecked = true;
          input.viewHomework = "GET_STUDENT_HOMEWORK";
          break;
        case "ADD_STUDENT_HOMEWORK":
          input.addHomeworkChecked = true;
          input.addHomework = "ADD_STUDENT_HOMEWORK";
          break;
        case "EDIT_STUDENT_HOMEWORK":
          input.editHomeworkChecked = true;
          input.editHomework = "EDIT_STUDENT_HOMEWORK";
          break;
        case "DELETE_STUDENT_HOMEWORK":
          input.deleteHomeworkChecked = true;
          input.deleteHomework = "DELETE_STUDENT_HOMEWORK";
          break;
        case "GET_TRANSACTION_HISTORY":
          input.viewTransactionChecked = true;
          input.viewTransaction = "GET_TRANSACTION_HISTORY";
          break;
        case "ADD_TRANSACTION_HISTORY":
          input.addTransactionChecked = true;
          input.addTransaction = "ADD_TRANSACTION_HISTORY";
          break;
        case "EDIT_TRANSACTION_HISTORY":
          input.editTransactionChecked = true;
          input.editTransaction = "EDIT_TRANSACTION_HISTORY";
          break;
        case "DELETE_TRANSACTION_HISTORY":
          input.deleteTransactionChecked = true;
          input.deleteTransaction = "DELETE_TRANSACTION_HISTORY";
          break;
        case "ADD_FAMILY":
          input.addFamilyChecked = true;
          input.addFamily = "ADD_FAMILY";
          break;
        case "EDIT_FAMILY":
          input.editFamilyChecked = true;
          input.editFamily = "EDIT_FAMILY";
          break;
        case "GET_FAMILY":
          input.viewFamilyChecked = true;
          input.viewFamily = "GET_FAMILY";
          break;
        case "DELETE_FAMILY":
          input.deleteFamilyChecked = true;
          input.deleteFamily = "DELETE_FAMILY";
          break;
        case "ADD_SALARY":
          input.addSalaryChecked = true;
          input.addSalary = "ADD_SALARY";
          break;
        case "EDIT_SALARY":
          input.editSalaryChecked = true;
          input.editSalary = "ADD_SALARY";
          break;
        case "DELETE_SALARY":
          input.deleteSalaryChecked = true;
          input.deleteSalary = "DELETE_SALARY";
          break;
        case "GET_SALARY":
          input.viewSalaryChecked = true;
          input.viewSalary = "GET_SALARY";
          break;
        case "GET_JOURNAL":
          input.viewJournalChecked = true;
          input.viewJournal = "GET_JOURNAL";
          break;
        case "DELETE_JOURNAL":
          input.deleteJournalChecked = true;
          input.deleteJournal = "DELETE_JOURNAL";
          break;
        case "ADD_JOURNAL":
          input.addJournalChecked = true;
          input.addJournal = "ADD_JOURNAL";
          break;
        case "EDIT_JOURNAL":
          input.editJournalChecked = true;
          input.editJournal = "EDIT_JOURNAL";
          break;
        case "EDIT_SCORE":
          input.editScoreChecked = true;
          input.editScore = "EDIT_SCORE";
          break;
        case "ADD_SCORE":
          input.addScoreChecked = true;
          input.addScore = "ADD_SCORE";
          break;
        case "GET_SCORE":
          input.viewScoreChecked = true;
          input.viewScore = "GET_SCORE";
          break;
        case "DELETE_SCORE":
          input.deleteScoreChecked = true;
          input.deleteScore = "DELETE_SCORE";
          break;
        case "ADD_STAFF_ATTENDANCE":
          input.addAttendanceChecked = true;
          input.addAttendance = "ADD_STAFF_ATTENDANCE";
          break;
        case "EDIT_STAFF_ATTENDANCE":
          input.editAttendanceChecked = true;
          input.editAttendance = "EDIT_STAFF_ATTENDANCE";
          break;
        case "GET_STAFF_ATTENDANCE":
          input.viewAttendanceChecked = true;
          input.viewAttendance = "GET_STAFF_ATTENDANCE";
          break;
        case "DELETE_STAFF_ATTENDANCE":
          input.deleteAttendanceChecked = true;
          input.deleteAttendance = "DELETE_STAFF_ATTENDANCE";
          break;
        case "ADD_TEACHING_HOURS":
          input.addLessonHourChecked = true;
          input.addLessonHour = "ADD_TEACHING_HOURS";
          break;
        case "EDIT_TEACHING_HOURS":
          input.editLessonHourChecked = true;
          input.editLessonHour = "EDIT_TEACHING_HOURS";
          break;
        case "DELETE_TEACHING_HOURS":
          input.deleteLessonHourChecked = true;
          input.deleteLessonHour = "DELETE_TEACHING_HOURS";
          break;
        case "GET_TEACHING_HOURS":
          input.viewLessonHourChecked = true;
          input.viewLessonHour = "GET_TEACHING_HOURS";
          break;
        case "ADD_LESSON_SCHEDULE":
          input.addScheduleChecked = true;
          input.addSchedule = "ADD_LESSON_SCHEDULE";
          break;
        case "EDIT_LESSON_SCHEDULE":
          input.editScheduleChecked = true;
          input.editSchedule = "EDIT_LESSON_SCHEDULE";
          break;
        case "DELETE_LESSON_SCHEDULE":
          input.deleteScheduleChecked = true;
          input.deleteSchedule = "DELETE_LESSON_SCHEDULE";
          break;
        case "GET_LESSON_SCHEDULE":
          input.viewScheduleChecked = true;
          input.viewSchedule = "GET_LESSON_SCHEDULE";
          break;
        case "ADD_TOPIC":
          input.addThemeChecked = true;
          input.addTheme = "ADD_TOPIC";
          break;
        case "EDIT_TOPIC":
          input.editThemeChecked = true;
          input.editTheme = "EDIT_TOPIC";
          break;
        case "DELETE_TOPIC":
          input.deleteThemeChecked = true;
          input.deleteTheme = "DELETE_TOPIC";
          break;
        case "GET_TOPIC":
          input.viewThemeChecked = true;
          input.viewTheme = true;
          break;
        case "GET_BRANCH":
          input.viewBranchChecked = true;
          input.viewBranch = "GET_BRANCH";
          break;
        case "ADD_BRANCH":
          input.addBranchChecked = true;
          input.addBranch = "ADD_BRANCH";
          break;
        case "EDIT_BRANCH":
          input.editBranchChecked = true;
          input.editBranch = "EDIT_BRANCH";
          break;
        case "DELETE_BRANCH":
          input.deleteBranchChecked = true;
          input.deleteBranch = "DELETE_BRANCH";
          break;
        case "ADD_WAREHOUSE":
          input.addWerHouseChecked = true;
          input.addWerHouse = "ADD_WAREHOUSE";
          break;
        case "EDIT_WAREHOUSE":
          input.editWerHouseChecked = true;
          input.editWerHouse = "EDIT_WAREHOUSE";
          break;
        case "GET_WAREHOUSE":
          input.viewWerHouseChecked = true;
          input.viewWerHouse = "GET_WAREHOUSE";
          break;
        case "DELETE_WAREHOUSE":
          input.deleteWerHouseChecked = true;
          input.deleteWerHouse = "DELETE_WAREHOUSE";
          break;
        case "DELETE_MAIN_BALANCE":
          input.deleteBalanceChecked = true;
          input.deleteBalance = "DELETE_MAIN_BALANCE";
          break;
        case "ADD_MAIN_BALANCE":
          input.addBalanceChecked = true;
          input.addBalance = "ADD_MAIN_BALANCE";
          break;
        case "EDIT_MAIN_BALANCE":
          input.editBalanceChecked = true;
          input.editBalance = "EDIT_MAIN_BALANCE";
          break;
        case "GET_MAIN_BALANCE":
          input.viewBalanceChecked = true;
          input.viewBalance = "GET_MAIN_BALANCE";
          break;
        case "GET_ROOM":
          input.viewRoomChecked = true;
          input.viewRoom = "GET_ROOM";
          break;
        case "ADD_ROOM":
          input.addRoomChecked = true;
          input.addRoom = "ADD_ROOM";
          break;
        case "EDIT_ROOM":
          input.editRoomChecked = true;
          input.editRoom = "EDIT_ROOM";
          break;
        case "DELETE_ROOM":
          input.deleteRoomChecked = true;
          input.deleteRoom = "DELETE_ROOM";
          break;
        case "DELETE_SUBJECT":
          input.deleteSubjectChecked = true;
          input.deleteSubject = "DELETE_SUBJECT";
          break;
        case "EDIT_SUBJECT":
          input.editSubjectChecked = true;
          input.editSubject = "EDIT_SUBJECT";
          break;
        case "ADD_SUBJECT":
          input.addSubjectChecked = true;
          input.addSubject = "ADD_SUBJECT";
          break;
        case "GET_SUBJECT":
          input.viewSubjectChecked = true;
          input.viewSubject = "GET_SUBJECT";
          break;
        case "ADD_BUSINESS":
          input.addBusinessChecked = true;
          input.addBusiness = "ADD_BUSINESS";
          break;
        case "EDIT_BUSINESS":
          input.editBusinessChecked = true;
          input.editBusiness = "EDIT_BUSINESS";
          break;
        case "DELETE_BUSINESS":
          input.deleteBusinessChecked = true;
          input.deleteBusiness = "DELETE_BUSINESS";
          break;
        case "GET_BUSINESS":
          input.viewBusinessChecked = true;
          input.viewBusiness = "GET_BUSINESS";
          break;
      }
    });
    checkPermission();
  }

  function saqla() {
    if (name === "") {
      toast.error("Lavozim nomini kiriting");
      const b = document.getElementById("inputValudesion");
      const a = { ...input };
      setInput(a);
      b.classList.add("inputValudetion");
    } else {
      permission.push(
        input.viewUser,
        input.addUser,
        input.editUser,
        input.deleteUser,
        input.viewRole,
        input.addRole,
        input.editRole,
        input.deleteRole,
        input.viewWorkType,
        input.addWorkType,
        input.editWorkType,
        input.deleteWorkType,
        input.viewAchievement,
        input.editAchievement,
        input.deleteAchievement,
        input.addAchievement,
        input.addWorkExperience,
        input.editWorkExperience,
        input.viewWorkExperience,
        input.deleteWorkExperience,
        input.viewStudent,
        input.addStudent,
        input.deleteStudent,
        input.editStudent,
        input.viewClass,
        input.deleteClass,
        input.addClass,
        input.editClass,
        input.addAccountNumber,
        input.editAccountNumber,
        input.deleteAccountNumber,
        input.viewAccountNumber,
        input.addHomework,
        input.editHomework,
        input.viewHomework,
        input.deleteHomework,
        input.viewTransaction,
        input.addTransaction,
        input.editTransaction,
        input.deleteTransaction,
        input.viewFamily,
        input.editFamily,
        input.addFamily,
        input.deleteFamily,
        input.addSalary,
        input.editSalary,
        input.deleteSalary,
        input.viewSalary,
        input.addJournal,
        input.editJournal,
        input.viewJournal,
        input.deleteJournal,
        input.viewScore,
        input.addScore,
        input.editScore,
        input.deleteScore,
        input.viewAttendance,
        input.editAttendance,
        input.addAttendance,
        input.deleteAttendance,
        input.viewLessonHour,
        input.editLessonHour,
        input.addLessonHour,
        input.deleteLessonHour,
        input.addSchedule,
        input.viewSchedule,
        input.editSchedule,
        input.deleteSchedule,
        input.addTheme,
        input.editTheme,
        input.deleteTheme,
        input.viewTheme,
        input.viewBranch,
        input.editBranch,
        input.deleteBranch,
        input.addBranch,
        input.viewRoom,
        input.editRoom,
        input.deleteRoom,
        input.addRoom,
        input.addSubject,
        input.editSubject,
        input.deleteSubject,
        input.viewSubject,
        input.addBalance,
        input.editBalance,
        input.viewBalance,
        input.deleteBalance,
        input.viewWerHouse,
        input.editWerHouse,
        input.deleteWerHouse,
        input.addWerHouse,
        input.addBusiness,
        input.editBusiness,
        input.deleteBusiness,
        input.viewBusiness,
      );
      const a = [...permission];
      setpermission(a);
      if (!roleId) {
        saveRole(
          {
            name,
            branchId: usersDataReducer?.branch?.id,
            permissions: permission,
            parentId: null
          }
        );
      } else {
        editRole(
          {
            name,
            id: roleId,
            branchId: usersDataReducer?.branch?.id,
            permissions: permission,
            parentId: null
          }
        );
      }
    }
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-5 text-center">Lavozim qo`shish</h3>
      <input
        value={name}
        onChange={(e) => { return setName(e.target.value); }}
        className="roleName"
        placeholder="Lavozim nomini kiriting..."
        name="namePlacholder"
        type="text"
      />
      <div className="div_container">
        <div className="block">
          <div className="border-2 p-3">
            <h2 className="text-center text-2xl">Hodimlar</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllUserRoles} name="AllUserRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_USER" name="addUser" checked={input.addUserChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hodim qo`shish</p>
            </div>
            <div className="div_check">
              <input value="GET_USER" name="viewUser" checked={input.viewUserChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hodim ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_USER" name="editUser" checked={input.editUserChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hodim tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_USER" name="deleteUser" checked={input.deleteUserChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hodim o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Ish turlari</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllWorkTypeRoles} name="AllWorkTypeRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_WORK_OF_TYPE" name="addWorkType" checked={input.addWorkTypeChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish turi qo`shish</p>
            </div>
            <div className="div_check">
              <input value="GET_WORK_OF_TYPE" name="viewWorkType" checked={input.viewWorkTypeChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish turi ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_WORK_OF_TYPE" name="editWorkType" checked={input.editWorkTypeChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish turi tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_WORK_OF_TYPE" name="deleteWorkType" checked={input.deleteWorkTypeChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish turi o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Ish Tajribasi</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllWorkExperienceRoles} name="AllWorkExperienceRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_WORK_EXPERIENCE" name="addWorkExperience" checked={input.addWorkExperienceChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish tajribasi qo`shish</p>
            </div>
            <div className="div_check">
              <input value="GET_WORK_EXPERIENCE" name="viewWorkExperience" checked={input.viewWorkExperienceChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish tajribasi ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_WORK_EXPERIENCE" name="editWorkExperience" checked={input.editWorkExperienceChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish tajribasi tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_WORK_EXPERIENCE" name="deleteWorkExperience" checked={input.deleteWorkExperienceChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish tajribasi o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Sinf</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllClassRoles} name="AllClassRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_STUDENT_CLASS" name="addClass" checked={input.addClass} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Sinf qo`shish</p>
            </div>
            <div className="div_check">
              <input value="GET_STUDENT_CLASS" name="viewClass" checked={input.viewClass} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Sinf ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_STUDENT_CLASS" name="editClass" checked={input.editClass} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Sinf tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_STUDENT_CLASS" name="deleteClass" checked={input.deleteClass} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Sinf o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Talaba vazifalari</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllHomeworkRoles} name="AllHomeworkRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_STUDENT_HOMEWORK" name="addHomework" checked={input.addHomework} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Vazifa qo`shish</p>
            </div>
            <div className="div_check">
              <input value="GET_STUDENT_HOMEWORK" name="viewHomework" checked={input.viewHomework} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Vazifa ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_STUDENT_HOMEWORK" name="editHomework" checked={input.editHomework} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Vazifa tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_STUDENT_HOMEWORK" name="deleteHomework" checked={input.deleteHomework} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Vazifa o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Qarzdor talabalar</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Qarzdorlarni ko`rish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Maoshlar</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllSalaryRoles} name="AllSalaryRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_SALARY" name="addSalary" checked={input.addSalaryChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Maosh qo`shish</p>
            </div>
            <div className="div_check">
              <input value="GET_SALARY" name="viewSalary" checked={input.viewSalaryChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Maosh ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_SALARY" name="editSalary" checked={input.editSalaryChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Maosh tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_SALARY" name="deleteSalary" checked={input.deleteSalaryChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Maosh o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Baholar</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllScoreRoles} name="AllScoreRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_SCORE" name="addScore" checked={input.addScoreChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Baho qo`shish</p>
            </div>
            <div className="div_check">
              <input value="GET_SCORE" name="viewScore" checked={input.viewScoreChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Baho ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_SCORE" name="editScore" checked={input.editScoreChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Baho tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_SCORE" name="deleteScore" checked={input.deleteScoreChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Baho o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Dars soati</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllLessonHourRoles} name="AllLessonHourRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_TEACHING_HOURS" name="addLessonHour" checked={input.addLessonHourChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars soati qo`shish</p>
            </div>
            <div className="div_check">
              <input value="GET_TEACHING_HOURS" name="viewLessonHour" checked={input.viewLessonHourChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars soati ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_TEACHING_HOURS" name="editLessonHour" checked={input.editLessonHourChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars soati tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_TEACHING_HOURS" name="deleteLessonHour" checked={input.deleteLessonHourChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars soati o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Mavzu</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllThemeRoles} name="AllThemeRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_TOPIC" name="addTheme" checked={input.addThemeChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Mavzu qo`shish</p>
            </div>
            <div className="div_check">
              <input value="GET_TOPIC" name="viewTheme" checked={input.viewThemeChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Mavzu ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_TOPIC" name="editTheme" checked={input.editThemeChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Mavzu tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_TOPIC" name="deleteTheme" checked={input.deleteThemeChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Mavzu o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Fanlar</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllSubjectRoles} name="AllSubjectRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_SUBJECT" name="addSubject" checked={input.addSubjectChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Fan qo`shish</p>
            </div>
            <div className="div_check">
              <input value="GET_SUBJECT" name="viewSubject" checked={input.viewSubjectChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Fan ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_SUBJECT" name="editSubject" checked={input.editSubjectChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Fan tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_SUBJECT" name="deleteSubject" checked={input.deleteSubjectChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Fan o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Xona</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllRoomRoles} name="AllRoomRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_ROOM" name="addRoom" checked={input.addRoomChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Xona qo`shish</p>
            </div>
            <div className="div_check">
              <input value="GET_ROOM" name="viewRoom" checked={input.viewRoomChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Xona ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_ROOM" name="editRoom" checked={input.editRoomChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Xona tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_ROOM" name="deleteRoom" checked={input.deleteRoomChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Xona o`chirish</p>
            </div>
          </div>
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <Button onClick={saqla} danger icon={<DownloadOutlined />} className="mt-4 d-flex justify-end text-xl">
            Saqlash
          </Button>
        </div>

        {/* Ikkinchi tomon */}

        <div className="block">
          <div className="border-2 p-3">
            <h2 className="text-center text-2xl">Lavozimlar</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllRoleRoles} name="AllRoleRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_ROLE" name="addRole" checked={input.addRoleChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Lavozim qo`shish</p>
            </div>
            <div className="div_check">
              <input value="VIEW_ROLE" name="viewRole" checked={input.viewRoleChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Lavozim ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_ROLE" name="editRole" checked={input.editRoleChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Lavozim tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_ROLE" name="deleteRole" checked={input.deleteRoleChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Lavozim o`chirish</p>
            </div>
          </div>

          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Hodim yutuqlari</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllAchievementRoles} name="AllAchievementRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_ACHIEVEMENT" name="addAchievement" checked={input.addAchievementChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Yutuq qo`shish</p>
            </div>
            <div className="div_check">
              <input value="VIEW_ACHIEVEMENT" name="viewAchievement" checked={input.viewAchievementChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Yutuq ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_ACHIEVEMENT" name="editAchievement" checked={input.editAchievementChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Yutuq tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_ACHIEVEMENT" name="deleteAchievement" checked={input.deleteAchievementChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Yutuq o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Talabalar</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllStudentRoles} name="AllStudentRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_STUDENT" name="addStudent" checked={input.addStudentChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Talaba qo`shish</p>
            </div>
            <div className="div_check">
              <input value="VIEW_STUDENT" name="viewStudent" checked={input.viewStudentChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Talaba ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_STUDENT" name="editStudent" checked={input.editStudentChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Talaba tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_STUDENT" name="deleteStudent" checked={input.deleteStudentChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Talaba o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Hisob raqam</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllAccountNumberRoles} name="AllAccountNumberRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_STUDENT_ACCOUNT" name="addAccountNumber" checked={input.addAccountNumberChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hisob raqam qo`shish</p>
            </div>
            <div className="div_check">
              <input value="VIEW_STUDENT_ACCOUNT" name="viewAccountNumber" checked={input.viewAccountNumberChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hisob raqam ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_STUDENT_ACCOUNT" name="editAccountNumber" checked={input.editAccountNumberChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hisob raqam tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_STUDENT_ACCOUNT" name="deleteAccountNumber" checked={input.deleteAccountNumberChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hisob raqam o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Talaba to`lov qilish</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllTransactionRoles} name="AllTransactionRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_TRANSACTION" name="addTransaction" checked={input.addTransactionChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">To`lov qo`shish</p>
            </div>
            <div className="div_check">
              <input value="GET_TRANSACTION" name="viewTransaction" checked={input.viewTransactionChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">To`lov ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_TRANSACTION" name="editTransaction" checked={input.editTransactionChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">To`lov tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_TRANSACTION" name="deleteTransaction" checked={input.deleteTransactionChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">To`lov o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Talaba haqida</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllFamilyRoles} name="AllFamilyRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_FAMILY" name="addFamily" checked={input.addFamilyChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ma`lumot qo`shish</p>
            </div>
            <div className="div_check">
              <input value="VIEW_FAMILY" name="viewFamily" checked={input.viewFamilyChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ma`lumot ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_FAMILY" name="editFamily" checked={input.editFamilyChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ma`lumot tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_FAMILY" name="deleteFamily" checked={input.deleteFamilyChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ma`lumot o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Jurnal</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllJournalRoles} name="AllJournalRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_JOURNAL" name="addJournal" checked={input.addJournal} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Jurnal qo`shish</p>
            </div>
            <div className="div_check">
              <input value="VIEW_JOURNAL" name="viewJournal" checked={input.viewJournal} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Jurnal ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_JOURNAL" name="editJournal" checked={input.editJournal} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Jurnal tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_JOURNAL" name="deleteJournal" checked={input.deleteJournal} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Jurnal o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Davomad</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllAttendanceRoles} name="AllAttendanceRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_STAFF_ATTENDANCE" name="addAttendance" checked={input.addAttendanceChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Davomad qo`shish</p>
            </div>
            <div className="div_check">
              <input value="VIEW_STAFF_ATTENDANCE" name="viewAttendance" checked={input.viewAttendanceChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Davomad ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_STAFF_ATTENDANCE" name="editAttendance" checked={input.editAttendanceChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Davomad tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_STAFF_ATTENDANCE" name="deleteAttendance" checked={input.deleteAttendanceChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Davomad o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Dars jadvali</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllScheduleRoles} name="AllScheduleRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_LESSON_SCHEDULE" name="addSchedule" checked={input.addScheduleChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars jadvali qo`shish</p>
            </div>
            <div className="div_check">
              <input value="VIEW_LESSON_SCHEDULE" name="viewSchedule" checked={input.viewScheduleChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars jadvali ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_LESSON_SCHEDULE" name="editSchedule" checked={input.editScheduleChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars jadvali tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_LESSON_SCHEDULE" name="deleteSchedule" checked={input.deleteScheduleChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars jadvali o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Filial</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllBranchRoles} name="AllBranchRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_BRANCH" name="addBranch" checked={input.addBranchChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Filial qo`shish</p>
            </div>
            <div className="div_check">
              <input value="VIEW_BRANCH" name="viewBranch" checked={input.viewBranchChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Filial ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_BRANCH" name="editBranch" checked={input.editBranchChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Filial tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_BRANCH" name="deleteBranch" checked={input.deleteBranchChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Filial o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Balanslar</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllBalanceRoles} name="AllBalanceRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_MAIN_BALANCE" name="addBalance" checked={input.addBalanceChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Balans qo`shish</p>
            </div>
            <div className="div_check">
              <input value="VIEW_MAIN_BALANCE" name="viewBalance" checked={input.viewBalanceChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Balans ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_MAIN_BALANCE" name="editBalance" checked={input.editBalanceChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Balans tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_MAIN_BALANCE" name="deleteBalance" checked={input.deleteBalanceChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Balans o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Omborxona</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllWerHouseRoles} name="AllWerHouseRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_WAREHOUSE" name="addWerHouse" checked={input.addWerHouseChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ombor qo`shish</p>
            </div>
            <div className="div_check">
              <input value="VIEW_WAREHOUSE" name="viewWerHouse" checked={input.viewWerHouseChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ombor ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_WAREHOUSE" name="editWerHouse" checked={input.editWerHouseChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ombor tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_WAREHOUSE" name="deleteWerHouse" checked={input.deleteWerHouseChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ombor o`chirish</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((roleReducer, usersDataReducer), {
  getRoleBranch,
  saveRole,
  deleteRole,
  editRole
})(Roles);
