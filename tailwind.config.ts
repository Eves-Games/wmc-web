import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: ["emerald"],
  },
  theme: {
    extend: {
      colors: {
        "white-dye": "#BDC1C1",
        "light-gray-dye": "#767672",
        "cyan-dye": "#0F7676",
        "orange-dye": "#BD6115",
        "purple-dye": "#68258B",
        "magenta-dye": "#973A8F",
        "blue-dye": "#2C3281",
        "light-blue-dye": "#2B88A5",
        "brown-dye": "#633F25",
        "yellow-dye": "#C0A32D",
        "green-dye": "#475E0F",
        "lime-dye": "#619615",
        "red-dye": "#85221C",
        "pink-dye": "#B76980",
        "black-dye": "#151517",
        "gray-dye": "#353C3E",
      },
    },
  },
  safelist: [{
    pattern: /(bg)-(white|light-gray|cyan|orange|purple|magenta|blue|light-blue|brown|yellow|green|lime|red|pink|black|gray)-dye/
  }],
  plugins: [require("daisyui")],
};
export default config;
