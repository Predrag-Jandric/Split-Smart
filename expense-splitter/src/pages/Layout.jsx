import { Outlet } from "react-router-dom";
import Sidebar from "../components/Home/Sidebar";

export default function Layout() {
  return (
    <section className="flex h-full bg-mainBG dark:bg-darkmainBG">
      <Sidebar />
      <div className="w-screen flex-1 px-4 py-10 sm:px-10">
        <Outlet />
      </div>
    </section>
  );
}
