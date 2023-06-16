import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useTheme = () => {
  const [theme, setTheme] = useLocalStorage("APP-THEME", "light");

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    theme === "dark" ? bodyClass.add(className) : bodyClass.remove(className);
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
