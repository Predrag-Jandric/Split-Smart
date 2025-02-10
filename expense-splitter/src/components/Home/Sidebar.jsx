import { MdGroups } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useSelector } from "react-redux";
import { useState } from "react";
import { special } from "../Utils/images";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function Sidebar() {
  const [expanded, setExpanded] = useState(false); // State to control expansion
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility on small screens

  const SIDEBAR_LINKS = [
    { id: 124534, path: "/", name: "Home", icon: MdGroups },
    { id: 262546, path: "/groups", name: "Groups", icon: IoMdPerson },
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
      {/* Toggle button for small screens */}
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

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-darkWhite dark:shadow-custom-light shadow-custom-dark z-10 pt-8 px-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-56 flex flex-col`}
      >
        <div className="mb-8 flex justify-center">
          <NavLink
            to="/"
            className="flex cursor-pointer"
            onClick={closeSidebar}
          >
            <img src={special} alt="logo" className="mr-1 flex" />
          </NavLink>
        </div>
        {/* Navigation */}
        <nav className="flex-1">
          {SIDEBAR_LINKS.map((link, index) => {
            if (link.name === "Groups") {
              return (
                <div key={link.id}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-5 space-x-5 text-xl font-extrabold ${
                        isActive
                          ? "text-primary dark:text-darkPrimary"
                          : "text-title dark:text-darkTitle"
                      }`
                    }
                    onClick={closeSidebar}
                  >
                    <span>{link.icon()}</span>
                    <span className="text-body font-medium dark:text-darkTitle text-title">
                      {link.name}
                    </span>
                  </NavLink>

                  {/* Listing the created groups directly below the "Groups" link */}
                  <div>
                    {/*display the first 4 groups in sidebar*/}
                    {groups.slice(0, 4).map((group) => (
                      <NavLink
                        key={group.id}
                        to={`/groups/${group.id}`} //Hooking from routes for each group
                        className={({ isActive }) =>
                          `flex items-center px-8 py-2 space-x-5 text-base font-medium ${
                            isActive
                              ? "text-primary dark:text-darkPrimary"
                              : "text-title dark:text-darkTitle"
                          }`
                        }
                        onClick={closeSidebar}
                      >
                        <span className="text-sm truncate hover:text-black dark:hover:text-darkBlack w-full">
                          {group.name}
                        </span>
                      </NavLink>
                    ))}

                    {/* Expansion Logic, I set this to slice at 4 groups for now */}
                    {expanded &&
                      groups.slice(4).map(
                        (
                          group // Here we will additional groups if expanded
                        ) => (
                          <NavLink
                            key={group.id}
                            to={`/groups/${group.id}`} // Hooking from routes for each group
                            className={({ isActive }) =>
                              `flex items-center px-8 py-2 space-x-2 text-base font-medium ${
                                isActive
                                  ? "text-primary dark:text-darkPrimary"
                                  : "text-title dark:text-darkTitle"
                              }`
                            }
                            onClick={closeSidebar}
                          >
                            <span className="text-sm truncate hover:text-black dark:hover:text-darkBlack w-full">
                              {group.name}
                            </span>
                          </NavLink>
                        )
                      )}

                    {/* Toggle Button for more groups to be shown if more than 4*/}
                    {groups.length > 4 && (
                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-sm truncate mt-2 px-8 text-primary dark:text-darkPrimary focus:outline-none"
                      >
                        <span className="text-primary dark:text-darkPrimary">
                          {expanded ? "Show Less" : "Show More"}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-5 space-x-5 text-xl font-extrabold  ${
                    isActive
                      ? "text-primary dark:text-darkPrimary"
                      : "text-title dark:text-darkTitle"
                  }`
                }
                onClick={closeSidebar}
              >
                <span>{link.icon()}</span>
                <span className="text-body font-medium text-title dark:text-darkTitle">
                  {link.name}
                </span>
              </NavLink>
            );
          })}
        </nav>
     
          <DarkModeToggle closeSidebar={closeSidebar} />
       
      </div>
    </>
  );
}

export default Sidebar;
