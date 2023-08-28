import { Col } from "antd";
import useWindowWidth from "../hooks/useWindowWidth";

export default function FormLayoutComp({ children }) {
  const width = useWindowWidth();
  return <Col span={width < 600 ? 24 : 12}>{children}</Col>;
}
