import { MdGroups } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useSelector } from "react-redux";
import { useState } from "react";
import { special } from "../Utils/images";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";

export default function Sidebar() {
  // expanded controls "Group" link in the navbar being expanded and showing the list of present groups or not
  const [expanded, setExpanded] = useState(true);
  // isSidebarOpen controls whether the sidebar is expanded or not on small screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // map for scalability in the future
  const SIDEBAR_LINKS = [
    { id: 124534, path: "/", name: "Home", icon: MdGroups },
    { id: 262546, path: null, name: "Groups", icon: IoMdPerson },
  ];

  const groups = useSelector((state) => state.groups.groups);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* toggle button for small screens */}
      <button
        onClick={toggleSidebar}
        className="fixed left-2 top-4 z-20 rounded-full border border-border bg-primary p-2.5 text-white transition hover:bg-primaryHover dark:border-darkBorder dark:bg-darkPrimary dark:text-darkWhite dark:hover:bg-darkprimaryHover lg:hidden"
      >
        {isSidebarOpen ? (
          <IoIosArrowBack size={24} />
        ) : (
          <IoIosArrowForward size={24} />
        )}
      </button>

      {/* sidebar */}
      <div
        className={`fixed left-0 top-0 z-10 min-h-screen w-64 transform border-r border-progressBar bg-white pt-2 shadow-custom-dark dark:border-darkmainBG dark:bg-darkWhite dark:shadow-custom-light ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col transition-transform lg:relative lg:w-56 lg:translate-x-0`}
      >
        {/* logo */}
        <NavLink
          to="/"
          className="flex cursor-pointer justify-center py-7"
          onClick={closeSidebar}
        >
          <img src={special} alt="logo" className="mr-1 flex" />
        </NavLink>

        {/* navigation links */}
        <nav className="flex-1">
          {SIDEBAR_LINKS.map((link, index) => {
            if (link.name === "Groups") {
              if (groups.length === 0) {
                return null;
              }
              return (
                // "Groups" second link in the sidebar
                <div key={link.id}>
                  <div
                    className="flex cursor-pointer items-center space-x-5 px-6 py-5 text-lg text-primary transition hover:bg-progressBar/50 dark:text-darkPrimary dark:hover:bg-darkmainBG/70"
                    onClick={() => setExpanded(!expanded)}
                  >
                    <span>{link.icon()}</span>
                    <span>{link.name}</span>
                    <span>
                      {expanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                  </div>

                  {/* subgroups */}
                  {expanded && (
                    <div>
                      {groups.map((group) => (
                        <NavLink
                          key={group.id}
                          to={`/groups/${group.id}`} // path to the specific group page
                          className={({ isActive }) =>
                            `flex cursor-pointer items-center px-10 py-3 text-sm font-medium transition hover:bg-progressBar/50 dark:text-darkBlack dark:hover:bg-darkmainBG/70 ${
                              isActive
                                ? "bg-progressBar/50 text-primary dark:bg-darkmainBG/70 dark:text-darkPrimary"
                                : "text-legend"
                            }`
                          }
                          onClick={closeSidebar}
                        >
                          <span className="">- {group.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              // home page btn
              <NavLink
                key={index}
                to={link.path}
                className="dark:hover:bg- flex cursor-pointer items-center space-x-5 px-6 py-5 text-lg text-primary transition hover:bg-progressBar/50 dark:text-darkPrimary dark:hover:bg-darkmainBG/70"
                onClick={closeSidebar}
              >
                <span>{link.icon()}</span>
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* dark mode btn */}
        <DarkModeToggle closeSidebar={closeSidebar} />
      </div>
    </>
  );
}
