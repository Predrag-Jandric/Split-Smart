import { useState } from "react";

function DarkModeToggle({closeSidebar}) {
  const [darkMode, setDarkMode] = useState(() => {
    const isDarkMode = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", isDarkMode);
    return isDarkMode;
  });

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleDarkMode, closeSidebar}

      className="bg-gray-200 p-2 shadow-custom-dark rounded-global
      flex items-center gap-3 justify-center space-x-2 w-full"
    >
      {darkMode ? "🌙" : "☀️"}
      <span className="">{darkMode ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}

export default DarkModeToggle;
