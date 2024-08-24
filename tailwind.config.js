/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./resources/**/*.blade.php",
        "./resources/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-darker': '#153c3c',
                'primary': '#1e5555',
                'primary-lighter': '#256969',
                'secondary': '#287271',
                'tertiary': '#5e9594',
                'accent': '#ffffff'
            }
        },
        fontFamily: {
            'ubuntu': ['ubuntu'],
            'playfair-display': ['"Playfair Display"']
        }
    },
    plugins: [],
}

