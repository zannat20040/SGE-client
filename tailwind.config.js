const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '370px',  
      },
      colors: {
        customPurple: "#7367f0",
      },
    },
  },
  plugins: [require("daisyui")],
});
