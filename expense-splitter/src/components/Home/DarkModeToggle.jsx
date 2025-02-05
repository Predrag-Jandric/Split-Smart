import { useState } from "react";

function DarkModeToggle() {
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
      onClick={toggleDarkMode}
      className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full text-sm dark:text-white
      flex items-center space-x-2 w-full md:w-auto"
    >
      {darkMode ? "🌙" : "☀️"}
      <span className="hidden md:flex ml-2">{darkMode ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}

export default DarkModeToggle;
