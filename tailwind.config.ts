import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: "#0000FF", ink: "#000000", paper: "#FFFFFF" },
      fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"] },
      letterSpacing: { tightest: "-0.045em" },
      maxWidth: { page: "1200px" },
    },
  },
  plugins: [],
};
export default config;
