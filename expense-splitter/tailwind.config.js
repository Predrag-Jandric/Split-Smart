/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // Add darkMode setting
  darkMode: "class", // This allows toggling between dark and light modes with the 'dark' class

  theme: {
    extend: {
      colors: {
        mainBG: "#F4F7FE",
        primary: "#3775FB", // primary light theme
        primaryHover: "#1960FA", // darker shades in https://coolors.co/
        title: "#94A1C7",
        legendBG: "#F9FBFF",
        legend: "#767676",
        alert: "#fe413c",
        border: "#EBEBEB",
        white: "white",
        black: "#525252",
        progressBar: "#D7E4FE", // much lighter "primary"

        // DARK THEME COLORS - use prefix "dark"
        darkmainBG: "#212529",
        darkPrimary: "#26F4FF", // primary dark theme
        darkprimaryHover: "#73F8FF", // lighter shades in https://coolors.co/
        darkTitle: "#C1C2C3",
        darklegendBG: "#434950",
        darkLegend: "#EAEAEB",
        darkAlert: "#fe413c", // same color but left here just in case
        darkBorder: "#2F3237",
        darkWhite: "#383d43",
        darkBlack: "#F5F5F5",
        darkprogressBar: "#003A3D", // much darkened "darkPrimary"
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
        legendSize: "0.80rem",
        groupComponentHeader: "1.5rem",
      },
      // If you need custom shadows for your components:
      boxShadow: {
        "custom-light": "0 6px 7px -2px rgba(0, 0, 0, 0.30)",
        "custom-dark": "0 6px 10px -2px rgba(0, 0, 0, 0.15)",
      },
      borderWidth: {
        global: "1px",
      },
      padding: {
        global: "1.5rem",
      },
      borderRadius: {
        global: "7px",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
