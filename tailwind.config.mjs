/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(min(35ch, 100%), 1fr))",
      },
    },
  },
  plugins: [],
};
