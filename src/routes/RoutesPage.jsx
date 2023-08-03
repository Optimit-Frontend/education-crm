import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layout/Layout";
import Transaction from "../pages/Transaction/Transaction.jsx";
import StudentAccount from "../pages/Students/StudentAccount.jsx";

const Loading = lazy(() => {
  return import("../components/Loading/Loading");
});
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
const Role = lazy(() => {
  return import("../pages/Employee/Role");
});
const Employee = lazy(() => {
  return import("../pages/Employee/Employee");
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
const WorkExpirence = lazy(() => {
  return import("../pages/Employee/WorkExpirence");
});
const Achievement = lazy(() => {
  return import("../pages/Employee/Achievement");
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
          <Route path="settings/balance" element={<Balance />} />
          <Route path="employee/role" element={<Role />} />
          <Route path="employee" element={<Employee />} />
          <Route path="employee/achievement" element={<Achievement />} />
          <Route path="employee/workExpirence" element={<WorkExpirence />} />
          <Route path="students" element={<Students />} />
          <Route path="class" element={<Class />} />
          <Route path="create-account" element={<StudentAccount />} />
          <Route path="transactions" element={<Transaction />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path='*' element={<Error404 />} /> */}
      </Routes>
    </Suspense>
  );
}

export default RoutesPage;
