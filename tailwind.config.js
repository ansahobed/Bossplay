/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000', // Pure Black
          dark: '#0a0a0a',
        },
        accent: {
          fuchsia: '#FF1493',
          purple: '#8A2BE2',
          blue: '#1E90FF',
          green: '#00FF7F',
          orange: '#FF6347',
          yellow: '#FFD700',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 6s ease infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        glow: {
          '0%': {
            'box-shadow': '0 0 20px rgba(255, 20, 147, 0.5)',
          },
          '100%': {
            'box-shadow': '0 0 30px rgba(255, 20, 147, 0.8), 0 0 40px rgba(138, 43, 226, 0.6)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(255, 20, 147, 0.4)',
          },
          '50%': {
            'box-shadow': '0 0 40px rgba(255, 20, 147, 0.8), 0 0 60px rgba(138, 43, 226, 0.6)',
          },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF1493, #8A2BE2, #1E90FF)',
        'gradient-secondary': 'linear-gradient(135deg, #00FF7F, #FFD700, #FF6347)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};