/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        leaf: {
          50: "#eef8ef",
          100: "#d8efdb",
          500: "#1f7a3d",
          600: "#176032",
          700: "#124b29"
        },
        amber: "#ffc107",
        coral: "#f26a4f",
        aqua: "#1aa6a6",
        bone: "#f8f6f0"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23, 33, 27, 0.10)",
        lift: "0 16px 34px rgba(23, 33, 27, 0.14)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
