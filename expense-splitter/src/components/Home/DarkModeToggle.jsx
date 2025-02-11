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
    onClick={() => { toggleDarkMode() }}
      className="btnSecondary mb-10 mx-8 flex items-center gap-2 justify-center"
    >
      {darkMode ? "☀️" : "🌙"}
      <span>{darkMode ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}

export default DarkModeToggle;
