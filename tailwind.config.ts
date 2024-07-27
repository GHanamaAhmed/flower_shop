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
        "white-color": "#EFF7F5",
        "black-color": "#1E1E1E",
        "gray-color": "#9C9C9C",
        // Dahsboard colors
        white: "#FFFFFF",
        Gray: "#7B809A",
        darkBlue: "#344767",
        darkSnow: "#C7CCD0",
        snow: "#E9EAED",
        customBackground: "#F0F2F5",
        green: "#4CAF50",
        red: "#E91F63",
        darkMud: "#4F4F52",
        blue: "#1A73E7",
        lightBlue: "#16C0E8",
        lightGray: "#A8B8D8",
        redOrange: "#F44334",
      },
      backgroundImage: {
        gradientBlack: "linear-gradient(180deg, #3E3D45, #202020)",
        gradientBlue: "linear-gradient(45deg, #439DEE, #1E78E9)",
        gradientOrange: "linear-gradient(45deg, #FB8E03, #FEA321)",
        gradientRed: "linear-gradient(45deg, #E93B77, #DA1F63)",
        gradientGreen: "linear-gradient(45deg, #63B967, #4BA64F)",
      },
      inset: {
        "10": "15%",
      },
    },
  },

  plugins: [],
};
export default config;
