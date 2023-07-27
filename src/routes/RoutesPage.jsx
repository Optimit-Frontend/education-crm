import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DefaultLayout from "../layout/Layout";
import AddUser from "../pages/Users/addUser";
import { saveUser } from "../reducer/usersDataReducer";

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

function RoutesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("userDataCRM") || sessionStorage.getItem("EducationCRM"),
    );
    const token = localStorage.getItem("EducationCRM") || sessionStorage.getItem("EducationCRM");
    if (user && token) {
      saveUser({
        object: user,
        message: token,
        success: true,
      });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addUser" element={<AddUser />} />
          <Route path="businesses" element={<Business />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path='*' element={<Error404 />} /> */}
      </Routes>
    </Suspense>
  );
}

export default RoutesPage;
