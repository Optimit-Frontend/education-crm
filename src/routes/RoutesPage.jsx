import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layout/Layout";

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
          <Route path="employee/role" element={<Role />} />
          <Route path="employee" element={<Employee />} />
          <Route path="employee/achievement" element={<Achievement />} />
          <Route path="students" element={<Students />} />
          <Route path="class" element={<Class />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
}

export default RoutesPage;
