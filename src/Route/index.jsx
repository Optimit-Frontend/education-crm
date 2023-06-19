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

function index() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path='*' element={<Error404 />} /> */}
      </Routes>
    </Suspense>
  );
}

export default index;
