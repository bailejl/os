const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

const config = {
  plugins: {
    //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    tailwindcss: {},
    "postcss-focus-visible": {
      replaceWith: "[data-focus-visible-added]"
    },
    //But others, like autoprefixer, need to run after,
    autoprefixer: {}
  }
};

module.exports = config;
