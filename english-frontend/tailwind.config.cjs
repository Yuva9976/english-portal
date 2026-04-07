module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      colors: {
        'primary': '#0057b8', // blue
        'primary-focus': '#003f7d',
        'primary-content': '#ffffff',
        'secondary': '#ffb300', // amber
        'secondary-focus': '#b37a00',
        'secondary-content': '#ffffff',
        'accent': '#e63946', // red
        'accent-focus': '#a4161a',
        'accent-content': '#ffffff',
        'neutral': '#3d4451',
        'neutral-focus': '#2a2e37',
        'neutral-content': '#ffffff',
        'base-100': '#ffffff',
        'base-200': '#f9fafb',
        'base-300': '#d1d5db',
        'base-content': '#1f2937',
        'info': '#2094f3',
        'success': '#009485',
        'warning': '#ff9900',
        'error': '#ff5724',
      },
    },
  },
  plugins: [],
}
