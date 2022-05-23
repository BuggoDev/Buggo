/* eslint-disable no-undef */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: { colors: { buggoGreen: "#99C2A2" } },
  },
  variants: {
    outline: ["focus"],
  },
  plugins: [
    require("tw-elements/dist/plugin"),
    require("flowbite/plugin")
  ],
};
