module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'team-gold': "#eac55f",
        'team-gold-hover': "#FEBD13",
        'team-black': "#000000",
        'hover': ""
      },
    },
  },
  plugins: [require('@tailwindcss/forms')]
};
