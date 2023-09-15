import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

function Role({
  roleReducer,
  usersDataReducer,
  saveRole,
  editRole,
  getRoleBranch,
  match
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const size = searchParams.get("size");
  const [pageData, setPageData] = useState({
    page: parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1,
    size: size ? parseInt(size, 10) : 10,
    loading: false,
  });

  useEffect(() => {
    setSelectedRowKeys([[], []]);
    navigate("/employee/role");
  }, [roleReducer?.success]);

  useEffect(() => {
    console.log(usersDataReducer);
  }, []);

  useEffect(() => {
    const pageSize = parseInt(size, 10);
    const pageCount = parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1;
    if (pageSize >= 100) {
      setPageData((prev) => {
        return { ...prev, size: 100 };
      });
      navigate(`/roles?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return { ...prev, size: 50 };
      });
      navigate(`/roles?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return { ...prev, size: 20 };
      });
      navigate(`/roles?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return { ...prev, size: 10 };
      });
      navigate(`/roles?page=${pageCount}&size=10`);
    }
  }, []);

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
      deleteWerHouseChecked: false
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
    AllLessonHourRolesValue: ["ADD_LESSON_HOUR", "DELETE_LESSON_HOUR", "GET_LESSON_HOUR", "EDIT_LESSON_HOUR"],
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
    AllWerHouseRolesValue: ["ADD_WAREHOUSE", "DELETE_WAREHOUSE", "GET_WAREHOUSE", "EDIT_WAREHOUSE"]
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
    input.AllUserRoles = input.addUserChecked && input.editUserChecked && input.deleteUserChecked && input.viewUserChecked;
    input.AllRoleRoles = input.addRoleChecked && input.editRoleChecked && input.deleteRoleChecked && input.viewRoleChecked;
    input.AllWorkTypeRoles = input.addWorkTypeChecked && input.editWorkTypeChecked && input.deleteWorkTypeChecked && input.viewWorkTypeChecked;
    input.AllAchievementRoles = input.addAchievementChecked && input.editAchievementChecked && input.deleteAchievementChecked && input.viewAchievementChecked;
    input.AllWorkExperienceRoles = input.addWorkExperienceChecked && input.editWorkExperienceChecked && input.deleteWorkExperienceChecked && input.viewWorkExperienceChecked;
    input.AllStudentRoles = input.addStudentChecked && input.editStudentChecked && input.viewStudentChecked && input.deleteStudentChecked;
    input.AllAccountNumberRoles = input.addAccountNumberChecked && input.editAccountNumberChecked && input.deleteAccountNumberChecked && input.viewAccountNumber;
    input.AllHomeworkRoles = input.addHomeworkChecked && input.editHomeworkChecked && input.deleteHomeworkChecked && input.viewHomeworkChecked;
    input.AllTransactionRoles = input.addTransactionChecked && input.editTransactionChecked && input.viewTransactionChecked && input.deleteTransactionChecked;
    input.AllFamilyRoles = input.addFamilyChecked && input.editFamilyChecked && input.viewFamilyChecked && input.deleteFamilyChecked;
    input.AllSalaryRoles = input.addSalaryChecked && input.editSalaryChecked && input.deleteSalaryChecked && input.viewSalaryChecked;
    input.AllJournalRoles = input.addJournalChecked && input.editJournalChecked && input.viewJournalChecked && input.deleteJournalChecked;
    input.AllScoreRoles = input.addScoreChecked && input.editScoreChecked && input.viewScoreChecked && input.deleteScoreChecked;
    input.AllAttendanceRoles = input.addAttendanceChecked && input.editAttendanceChecked && input.viewAttendanceChecked && input.deleteAttendanceChecked;
    input.AllLessonHourRoles = input.addLessonHourChecked && input.editLessonHourChecked && input.viewLessonHourChecked && input.deleteLessonHourChecked;
    input.AllScheduleRoles = input.addScheduleChecked && input.editScheduleChecked && input.viewScheduleChecked && input.deleteScheduleChecked;
    input.AllThemeRoles = input.addThemeChecked && input.editThemeChecked && input.viewThemeChecked && input.deleteThemeChecked;
    input.AllBranchRoles = input.addBranchChecked && input.editBranchChecked && input.viewBranchChecked && input.deleteBranchChecked;
    input.AllRoomRoles = input.addRoomChecked && input.editRoomChecked && input.viewRoomChecked && input.deleteRoomChecked;
    input.AllSubjectRoles = input.addSubjectChecked && input.editSubjectChecked && input.viewSubjectChecked && input.deleteSubjectChecked;
    input.AllBalanceRoles = input.addBalanceChecked && input.editBalanceChecked && input.viewBalanceChecked && input.deleteBalanceChecked;
    input.AllWerkRoles = input.addWerHouseChecked && input.editWerHouseChecked && input.viewWerHouseChecked && input.deleteWerHouseChecked;

    const a = { ...input };
    setInput(a);
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
      );
      const a = [...permission];
      setpermission(a);
      // if (match.params.id === undefined) {
      saveRole(
        {
          name,
          branchId: usersDataReducer?.branch?.id,
          permissions: permission,
          parentId: null
        }
      );
      // }
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
              <input value="ADD_LESSON_HOUR" name="addLessonHour" checked={input.addLessonHourChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars soati qo`shish</p>
            </div>
            <div className="div_check">
              <input value="GET_LESSON_HOUR" name="viewLessonHour" checked={input.viewLessonHourChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars soati ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_LESSON_HOUR" name="editLessonHour" checked={input.editLessonHourChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars soati tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_LESSON_HOUR" name="deleteLessonHour" checked={input.deleteLessonHourChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
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
          <Button onClick={saqla} danger icon={<DownloadOutlined />} className="mt-4 d-flex justify-end text-xl" size={size}>
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
})(Role);
