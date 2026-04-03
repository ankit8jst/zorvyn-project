/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08111f",
        mist: "#eef4ff",
        mint: "#16a34a",
        rose: "#dc2626",
        gold: "#f59e0b"
      },
      boxShadow: {
        panel: "0 16px 50px rgba(15, 23, 42, 0.12)"
      },
      backgroundImage: {
        "dashboard-grid": "radial-gradient(circle at top, rgba(34,197,94,0.16), transparent 26%), radial-gradient(circle at bottom right, rgba(59,130,246,0.14), transparent 24%)"
      },
      fontFamily: {
        sans: ["Segoe UI", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
