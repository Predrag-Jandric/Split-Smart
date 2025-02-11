import { Outlet } from "react-router-dom";

// components
import Sidebar from "../components/Home/Sidebar";

function Layout() {
  return (
    <section className="flex h-screen bg-mainBG dark:bg-darkmainBG">
      <Sidebar />
      <div className="flex-1 py-10 px-4 sm:px-10 overflow-auto w-screen ">
        <Outlet />
      </div>
    </section>
  );
}

export default Layout;
