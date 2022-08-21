module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{jsx,html,js}',
    './src/components/**/*.{jsx,html,js}',
    './node_modules/flowbite/**/*.js',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        mf: "990px",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
      },
      fontFamily: {
        display: ["Open Sans", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
        PlasticBeach: ["PlasticBeach", "sans-serif"],
        BADABB: ["BADABB", "sans-serif"],
        grobold: ["grobold", "sans-serif"],
        maru: ["maru", "sans-serif"]
      },
      colors: {
        'apt-green': '#2ed8a7',
        // 'apt-dark': '#121615'
        'apt-dark': '#0e1215',
        'apt-grey': '#2c3a43',
        'apt-light-grey': '#a3a3a3',
        'apt-blue': '#a3a3a3',
      },
    },
  },
  ///add from project_web3///
  variants: {
    extend: {},
  },

  plugins: [
    // require("@tailwindcss/forms")
    // require('flowbite/plugin'),
    // require('tw-elements/dist/plugin')
    require('daisyui')
  ],
  daisyui: {
    base: false,
    themes: [
      {
        mytheme: {
          "primary": "#0e1215",
          "secondary": "#2ed8a7",
          "accent": "#262626",
          "neutral": "#2c3a43",
          "base-100": "#EAE5EB",
          // "info": "#0057ff",
          "info": "#03a9fc",
          "success": "#15935A",
          "warning": "#F0AB0A",
          "error": "#fdd7e4",
          // "error": "#3b82f680",
          
        },
      }
    ]
  }
}
