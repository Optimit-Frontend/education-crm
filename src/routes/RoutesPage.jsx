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

function RoutesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="addUser" element={<AddUser />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path='*' element={<Error404 />} /> */}
      </Routes>
    </Suspense>
  );
}

export default RoutesPage;
