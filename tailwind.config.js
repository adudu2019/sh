/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "home-image":
          "url('https://www.blibli.com/friends-backend/wp-content/uploads/2022/12/B110681-cover-scaled.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
