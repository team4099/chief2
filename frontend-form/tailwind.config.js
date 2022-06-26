module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'team-gold': "#EFAE04",
        'team-gold-hover': "#FEBD13",
        'team-black': "#363636",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')]
};
