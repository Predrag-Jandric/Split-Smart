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
      className="bg-gray-200 p-2 rounded-global
      flex items-center justify-center gap-2 w-full"
    >
      {darkMode ? "🌙" : "☀️"}
      <span >
        {darkMode ? "Light mode" : "Dark mode"}
      </span>
    </button>
  );
}

export default DarkModeToggle;
