// eslint-disable-next-line import/no-extraneous-dependencies
import { ConfigProvider, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import RoutesPage from "./routes/RoutesPage";
import useTheme from "./hooks/useTheme";
import usersDataReducer, { saveUser } from "./reducer/usersDataReducer";

function App({ saveUser }) {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [themeApp] = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON?.parse(
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
    <ConfigProvider theme={{ algorithm: themeApp === "dark" ? darkAlgorithm : defaultAlgorithm }}>
      <RoutesPage />
    </ConfigProvider>
  );
}

export default connect(usersDataReducer, { saveUser })(App);
