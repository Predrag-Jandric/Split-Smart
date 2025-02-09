import { Outlet } from "react-router-dom";

// components
import Sidebar from "../components/Home/Sidebar";

function Layout() {
  return (
    <section className="flex h-screen bg-mainBG">
      <Sidebar />
      <div className="flex-1 sm:p-0 p-2 overflow-auto w-screen ">
        <Outlet />
      </div>
    </section>
  );
}

export default Layout;
