/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // Add darkMode setting
  darkMode: "class", // This allows toggling between dark and light modes with the 'dark' class

  theme: {
    extend: {
      colors: {
        mainBG: "#F4F7FE",
        primary: "#013BFF",
        title: "#A3AED0",
        legend: "#767676",
        alert: "#FF3636",
        border: "#E0E0E0",
        // white: "#F6CE3C",
        // black: "#0EFB2E",

        //dark mode colors using 'dark:' classes in components)
        darkmainBG: "#",
        darkPrimary: "#",
        darkTitle: "#",
        darkLegend: "#",
        darkAlert: "#",
        darkBorder: "#1f1f1f",
      },
      /* Defining consistent global typography
      fontFamily: {
        "fontPrimary": ["Lucia Sans", "sans-serif"],
        "fontSecondary": ["Arial", "sans-serif"],
      },*/
      // Defining consistent text sizes
      fontSize: {
        header: "2.125rem",
        subheader: "1.125rem",
        body: "1rem",
        legend: "0.75rem",
        groupComponentHeader: "1.5rem",
      },
      // If you need custom shadows for your components:
      boxShadow: {
        "custom-light": "0 6px 10px -2px rgba(255, 255, 255, 0.15)",
        "custom-dark": "0 6px 10px -2px rgba(0, 0, 0, 0.15)",
      },
      borderWidth: {
        global: "1px",
      },
      padding: {
        global: "1.7rem",
      },
      borderRadius: {
        global: "10px",
      },
    },
  },
  plugins: [],
};
