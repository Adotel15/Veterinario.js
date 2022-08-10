module.exports = {
  // En que archivos se va a usar ? (index.html, todos los archivos dentro de src que tengan terminación jsx)
  purge: ["index.html", "./src/**/*.jsx"], 
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
