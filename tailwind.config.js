module.exports = {
  purge: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Classic Robot', 'Dream MMA', 'Poppins Regular', 'Poppins SemiBold'],
      'serif': ['Classic Robot', 'Dream MMA', 'Poppins Regular', 'Poppins SemiBold'],
      'mono': ['Classic Robot', 'Dream MMA', 'Poppins Regular', 'Poppins SemiBold'],
      'robot': ['Classic Robot'],
      'mma': ['Dream MMA'],
      'poppinsr': ['Poppins Regular'],
      'poppinss': ['Poppins SemiBold'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
