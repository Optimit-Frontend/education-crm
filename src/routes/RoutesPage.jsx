import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layout/Layout";
import AddUser from "../pages/Users/addUser";

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

function RoutesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addUser" element={<AddUser />} />
          <Route path="businesses" element={<Business />} />
          <Route path="settings/branches" element={<BusinessBranch />} />
          <Route path="settings/roomType" element={<RoomType />} />
          <Route path="settings/room" element={<Room />} />
          <Route path="settings/subjects" element={<Subjects />} />
          <Route path="employee/role" element={<Role />} />
          <Route path="employee" element={<Employee />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
}

export default RoutesPage;
