import { Outlet } from "react-router-dom";

// components
import Sidebar from "../components/Home/Sidebar";

function Layout() {
  return (
    <section className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto w-screen ">
        <Outlet />
      </div>
    </section>
  );
}

export default Layout;
