/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a365d',
        secondary: '#ff6b6b',
        accent: '#feca57',
        neutral: '#f7fafc',
        text: '#2d3748'
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'display': ['Poppins', 'sans-serif']
      },
      animation: {
        'pulse': 'pulse 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'listening': 'listening-pulse 1s ease-in-out infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
        'typing': 'typing 1.4s infinite ease-in-out',
        'breathe': 'breathe 3s ease-in-out infinite'
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(255, 107, 107, 0.7)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(255, 107, 107, 0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' }
        },
        'listening-pulse': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(255, 107, 107, 0.7)' },
          '50%': { transform: 'scale(1.1)', boxShadow: '0 0 0 20px rgba(255, 107, 107, 0)' }
        },
        wave: {
          '0%, 100%': { height: '10px' },
          '50%': { height: '40px' }
        },
        typing: {
          '0%, 80%, 100%': { transform: 'scale(0)', opacity: '0.5' },
          '40%': { transform: 'scale(1)', opacity: '1' }
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        }
      }
    }
  },
  plugins: []
}