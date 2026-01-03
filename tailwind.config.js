/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                synq: {
                    bg: '#000000', // Pure black for seamless transition
                    card: 'rgba(255, 255, 255, 0.03)',
                    border: 'rgba(255, 255, 255, 0.08)',
                    text: {
                        primary: '#f3f4f6', // Off-white
                        secondary: '#9ca3af', // Muted gray
                        muted: '#6b7280',
                    },
                    accent: {
                        cyan: '#22d3ee', // Cool cyan
                        violet: '#a78bfa', // Soft violet
                    }
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
