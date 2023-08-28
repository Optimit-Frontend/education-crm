import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layout/Layout";
import Loading from "../components/Loading/Loading";
import Salary from "../pages/Salary/Salary";
import PartlySalary from "../pages/Salary/PartlySalary";
import Journal from "../pages/Journal/Journal";
import StudentHomework from "../pages/Students/StudentHomework";
import Scores from "../pages/Journal/Scores";
import Attendance from "../pages/Attendance/Attendance";
import TeachingHours from "../pages/TeachHours/TeachingHours";
import LessonSchedule from "../pages/LessonSchedule/LessonSchedule.jsx";
import Family from "../pages/Students/Family.jsx";
import FamilyLogin from "../pages/Students/FamilyLogin.jsx";
import Topic from "../pages/Topic/Topic.jsx";

const Dashboard = lazy(() => {
  return import("../pages/Dashboard/Dashboard");
});
const Login = lazy(() => {
  return import("../pages/Login/Login");
});
const Business = lazy(() => {
  return import("../pages/Business/Business");
});
const BusinessBranch = lazy(() => {
  return import("../pages/Settings/BusinessBranches");
});
const RoomType = lazy(() => {
  return import("../pages/Settings/RoomType");
});
const Room = lazy(() => {
  return import("../pages/Settings/Room");
});
const Subjects = lazy(() => {
  return import("../pages/Settings/Subjects");
});
const SubjectForLevel = lazy(() => {
  return import("../pages/Settings/SubjectForLevel");
});
const Role = lazy(() => {
  return import("../pages/Employee/Role");
});
const Employee = lazy(() => {
  return import("../pages/Employee/Employee");
});
const TypeOfWork = lazy(() => {
  return import("../pages/Employee/TypeOfWork");
});
const Students = lazy(() => {
  return import("../pages/Students/Students");
});
const Class = lazy(() => {
  return import("../pages/Students/Class");
});
const Balance = lazy(() => {
  return import("../pages/Settings/Balance");
});
const Warehouse = lazy(() => {
  return import("../pages/Settings/Warehouse");
});
const PurchasedProduct = lazy(() => {
  return import("../pages/Kitchen/PurchasedProduct");
});
const PurchasedDrink = lazy(() => {
  return import("../pages/Kitchen/PurchasedDrink");
});
const DailyConsumedProducts = lazy(() => {
  return import("../pages/Kitchen/DailyConsumedProducts");
});
const DailyConsumedDrinks = lazy(() => {
  return import("../pages/Kitchen/DailyConsumedDrinks");
});
const Product = lazy(() => {
  return import("../pages/Kitchen/Product");
});
const Drinks = lazy(() => {
  return import("../pages/Kitchen/Drinks");
});
const DailyMeal = lazy(() => {
  return import("../pages/Kitchen/DailyMeal");
});
const WorkExpirence = lazy(() => {
  return import("../pages/Employee/WorkExpirence");
});
const StudentDebt = lazy(() => {
  return import("../pages/Students/StudentDebt");
});
const StudentPayment = lazy(() => {
  return import("../pages/Students/StudentPayment");
});
const Achievement = lazy(() => {
  return import("../pages/Employee/Achievement");
});
const StudentAccount = lazy(() => {
  return import("../pages/Students/StudentAccount");
});
const Transaction = lazy(() => {
  return import("../pages/Transaction/Transaction");
});

function RoutesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="businesses" element={<Business />} />
          <Route path="settings/branches" element={<BusinessBranch />} />
          <Route path="settings/roomType" element={<RoomType />} />
          <Route path="settings/room" element={<Room />} />
          <Route path="settings/subjects" element={<Subjects />} />
          <Route path="settings/subjectsForLevel" element={<SubjectForLevel />} />
          <Route path="settings/balance" element={<Balance />} />
          <Route path="settings/warehouse" element={<Warehouse />} />
          <Route path="kitchen/dailyMeal" element={<DailyMeal />} />
          <Route path="kitchen/product" element={<Product />} />
          <Route path="kitchen/drinks" element={<Drinks />} />
          <Route path="kitchen/purchasedProduct" element={<PurchasedProduct />} />
          <Route path="kitchen/purchasedDrink" element={<PurchasedDrink />} />
          <Route path="kitchen/dailyconsumedProduct" element={<DailyConsumedProducts />} />
          <Route path="kitchen/dailyConsumedDrink" element={<DailyConsumedDrinks />} />
          <Route path="employee/role" element={<Role />} />
          <Route path="employee" element={<Employee />} />
          <Route path="employee/achievement" element={<Achievement />} />
          <Route path="employee/workExpirence" element={<WorkExpirence />} />
          <Route path="employee/typeOfWork" element={<TypeOfWork />} />
          <Route path="students" element={<Students />} />
          <Route path="class" element={<Class />} />
          <Route path="create-account" element={<StudentAccount />} />
          <Route path="transactions" element={<Transaction />} />
          <Route path="student-transaction" element={<StudentPayment />} />
          <Route path="student-debts" element={<StudentDebt />} />
          <Route path="salaries" element={<Salary />} />
          <Route path="partly-salaries" element={<PartlySalary />} />
          <Route path="journal" element={<Journal />} />
          <Route path="lesson-schedule" element={<LessonSchedule />} />
          <Route path="student-homework" element={<StudentHomework />} />
          <Route path="scores" element={<Scores />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="teaching-hours" element={<TeachingHours />} />
          <Route path="lesson-schedule" element={<LessonSchedule />} />
          <Route path="family" element={<Family />} />
          <Route path="family-login" element={<FamilyLogin />} />
          <Route path="topic" element={<Topic />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path='*' element={<Error404 />} /> */}
      </Routes>
    </Suspense>
  );
}

export default RoutesPage;
