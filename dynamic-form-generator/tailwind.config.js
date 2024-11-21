module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with the "class" strategy
  theme: {
    extend: {
    colors: {
      lightText: '#2D3748', // Custom text color for light mode
      darkText: '#E2E8F0',  // Custom text color for dark mode
    },
  },
},
  plugins: [],
};
// module.exports = {
//   darkMode: 'class', // Enable dark mode via class
//   theme: {
//     extend: {
//       colors: {
//         lightText: '#2D3748', // Custom text color for light mode
//         darkText: '#E2E8F0',  // Custom text color for dark mode
//       },
//     },
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// };