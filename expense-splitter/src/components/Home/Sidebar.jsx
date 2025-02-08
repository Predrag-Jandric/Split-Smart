import { MdGroups } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useSelector } from "react-redux";
import { useState } from "react";
import { special } from "../Utils/images";

function Sidebar() {
  const [expanded, setExpanded] = useState(false); // State to control expansion
  const SIDEBAR_LINKS = [
    { id: 124534, path: "/", name: "Home", icon: MdGroups },
    { id: 262546, path: "/groups", name: "Groups", icon: IoMdPerson },
  ];

  // Fetching groups from the Redux store
  const groups = useSelector((state) => state.groups.groups);

  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen pt-8 px-4 bg-white">
      <div className="mb-8 flex justify-center">
        <NavLink to="/" className="flex cursor-pointer">
          <img src={special} alt="logo" className="mr-1 flex" />
        </NavLink>
      </div>

      {/* Navigation */}
      <nav>
        {SIDEBAR_LINKS.map((link, index) => {
          if (link.name === "Groups") {
            return (
              <div key={link.id}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-5 space-x-5 text-xl font-extrabold ${
                      isActive ? "text-primary" : "text-title"
                    }`
                  }
                >
                  <span>{link.icon()}</span>
                  <span className="text-body font-medium text-title hidden md:flex">
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
                          isActive ? "text-primary" : "text-title"
                        }`
                      }
                    >
                      <span className="text-sm truncate hover:text-black w-full">
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
                              isActive ? "text-primary" : "text-title"
                            }`
                          }
                        >
                          <span className="text-sm truncate hover:text-black w-full">
                            {group.name}
                          </span>
                        </NavLink>
                      )
                    )}

                  {/* Toggle Button for more groups to be shown if more than 4*/}
                  {groups.length > 4 && (
                    <button
                      onClick={() => setExpanded(!expanded)}
                      className="text-sm truncate mt-2 px-8 text-primary focus:outline-none"
                    >
                      <span className="hidden md:flex">
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
                  isActive ? "text-primary" : "text-title"
                }`
              }
            >
              <span>{link.icon()}</span>
              <span className="text-body font-medium text-title hidden md:flex">
                {link.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
        {/* Dark Mode Toggle  */}
        <div className="mt-4 md:mt-2 flex items-center justify-center">
          <DarkModeToggle /> {/* This is our dark mode toggle button */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
