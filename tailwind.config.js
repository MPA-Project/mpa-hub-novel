module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    //"./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        MPABlue: '#15acc4',
        MPAPurple: '#9b4a92'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}