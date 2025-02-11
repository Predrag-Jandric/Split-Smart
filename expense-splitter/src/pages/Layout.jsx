import { Outlet } from "react-router-dom";
import Sidebar from "../components/Home/Sidebar";

function Layout() {
  return (
    <section className="flex h-screen bg-mainBG dark:bg-darkmainBG">
      <Sidebar />
      <div className="w-screen flex-1 overflow-auto px-4 py-10 sm:px-10">
        <Outlet />
      </div>
    </section>
  );
}

export default Layout;
