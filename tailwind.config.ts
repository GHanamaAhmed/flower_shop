import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-color": "#004F44",
        "white-color":"#EFF7F5",
        "black-color":"#1E1E1E",
        "gray-color":"#9C9C9C"
      },
      inset: {
        '10': '15%',
      }
    },
  },
  
  plugins: [],
};
export default config;
