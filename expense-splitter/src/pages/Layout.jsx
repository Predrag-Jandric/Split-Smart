import { Outlet } from "react-router-dom";

// components
import Sidebar from "../components/Home/Sidebar";

function Layout() {
  return (
    <section className="flex h-screen">
      <Sidebar />
      <div className="overflow-auto w-screen p-5">
        <Outlet />
      </div>
    </section>
  );
}

export default Layout;
