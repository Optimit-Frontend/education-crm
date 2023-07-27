import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useTheme = () => {
  const [themeApp, setTheme] = useLocalStorage("APP-THEME", "light");

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    themeApp === "dark" ? bodyClass.add(className) : bodyClass.remove(className);
  }, [themeApp]);

  return [themeApp, setTheme];
};

export default useTheme;
