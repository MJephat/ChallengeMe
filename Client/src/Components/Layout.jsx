import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import TopNav from "./TopNav";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="app-layout">
      <SideNav />

      <div className="main-area">
        {/* ALWAYS visible */}
        <TopNav />

        <div className="content watermark">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
