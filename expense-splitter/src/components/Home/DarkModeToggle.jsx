import { useState } from "react";

// dark mode button at the bottom of the sidebar and logic to toggle dark mode
function DarkModeToggle({ closeSidebar }) {
  const [darkMode, setDarkMode] = useState(() => {
    const isDarkMode = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", isDarkMode);
    return isDarkMode;
  });

  // toggle dark mode on and off
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  // close sidebar on dark mode toggle
  return (
    <button
      onClick={() => {
        toggleDarkMode(), closeSidebar();
      }}
      className="btnSecondary mx-8 mb-10 flex items-center justify-center gap-2"
    >
      {darkMode ? "☀️" : "🌙"}
      <span>{darkMode ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}

export default DarkModeToggle;
