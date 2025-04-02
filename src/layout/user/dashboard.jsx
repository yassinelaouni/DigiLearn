import UpMenu from "./upMenu";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <UpMenu />
      <Outlet />
    </>
  );
}
 