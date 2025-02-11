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

function Sidebar() {
  const [expanded, setExpanded] = useState(true); // State to control expansion
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility on small screens

  const SIDEBAR_LINKS = [
    { id: 124534, path: "/", name: "Home", icon: MdGroups },
    { id: 262546, path: null, name: "Groups", icon: IoMdPerson },
  ];

  // Fetching groups from the Redux store
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
        className="fixed top-4 left-4 z-20 dark:bg-darkPrimary bg-primary dark:text-darkWhite text-white p-2 rounded-full lg:hidden"
      >
        {isSidebarOpen ? (
          <IoIosArrowBack size={24} />
        ) : (
          <IoIosArrowForward size={24} />
        )}
      </button>

      {/* sidebar */}
      <div
        className={`fixed top-0 left-0  h-full w-64 bg-white dark:bg-darkWhite dark:shadow-custom-light shadow-custom-dark z-10 pt-2 transform border-r border-progressBar 
          dark:border-darkmainBG ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform lg:relative lg:translate-x-0 lg:w-56 flex flex-col`}
      >
        {/* logo */}
        <NavLink
          to="/"
          className="flex py-7 justify-center cursor-pointer "
          onClick={closeSidebar}
        >
          <img src={special} alt="logo" className="mr-1 flex" />
        </NavLink>

        {/* Navigation */}
        <nav className="flex-1 mt-3">
          {SIDEBAR_LINKS.map((link, index) => {
            if (link.name === "Groups") {
              if (groups.length === 0) {
                return null;
              }
              return (
                // groups
                <div key={link.id}>
                  <div
                    className="flex dark:hover:bg-darkmainBG/70 transition items-center px-6 py-5 space-x-5 text-lg dark:hover:bg-
                     hover:bg-progressBar/50 text-primary dark:text-darkPrimary cursor-pointer"
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
                          to={`/groups/${group.id}`} // Hooking from routes for each group
                          className={({ isActive }) =>
                            `flex dark:hover:bg-darkmainBG/70 
                          transition items-center px-10 py-3 text-sm 
                     hover:bg-progressBar/50 
                      font-medium
                      dark:text-darkBlack cursor-pointer ${
                        isActive
                          ? "text-primary dark:text-darkPrimary dark:bg-darkmainBG/70 bg-progressBar/50"
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
              // home page
              <NavLink
                key={index}
                to={link.path}
                className="flex dark:hover:bg-darkmainBG/70 transition items-center px-6 py-5 space-x-5 text-lg dark:hover:bg-
                     hover:bg-progressBar/50 text-primary dark:text-darkPrimary cursor-pointer"
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

export default Sidebar;
