import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F8FAFC",
        ink: "#0F172A",
        muted: "#475569",
        cta: "#2563EB",
        "cta-hover": "#1D4ED8"
      },
      boxShadow: {
        soft: "0 22px 40px -28px rgba(15, 23, 42, 0.35)"
      }
    }
  },
  plugins: []
} satisfies Config;
