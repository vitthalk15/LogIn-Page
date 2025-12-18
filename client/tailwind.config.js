/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'custom-dark': '#2A2F45', // Approx background
                'custom-teal': '#00E0D0', // Approx button/header
                'custom-dark-input': '#3B4158', // Input bg
            }
        },
    },
    plugins: [],
}
