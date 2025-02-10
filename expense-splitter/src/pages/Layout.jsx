import { Outlet } from "react-router-dom";

// components
import Sidebar from "../components/Home/Sidebar";

function Layout() {
  return (
    <section className="flex h-screen bg-mainBG dark:bg-darkmainBG">
      <Sidebar />
      <div className="flex-1 py-6 px-0 sm:py-6 sm:px-8 overflow-auto w-screen ">
        <Outlet />
      </div>
    </section>
  );
}

export default Layout;
