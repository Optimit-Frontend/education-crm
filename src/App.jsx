import { ConfigProvider, theme } from "antd";
import RoutesPage from "./routes/RoutesPage";
import useTheme from "./hooks/useTheme";

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [themeApp] = useTheme();

  return (
    <ConfigProvider theme={{ algorithm: themeApp === "dark" ? darkAlgorithm : defaultAlgorithm }}>
      <RoutesPage />
    </ConfigProvider>
  );
}

export default App;
