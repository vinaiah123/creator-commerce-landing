
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				carte: {
					DEFAULT: '#FAC200', // Primary yellow
					50: '#FFFBEB',
					100: '#FEF3CD',
					200: '#FDE7A0',
					300: '#FCDA73',
					400: '#FBCE47',
					500: '#FAC200', // Primary yellow
					600: '#C89B00',
					700: '#966F00',
					800: '#644B00',
					900: '#322500',
				},
				carteYellow: {
					DEFAULT: '#FAC200', // Same as carte for compatibility
					50: '#FFFBEB',
					100: '#FEF3CD',
					200: '#FDE7A0',
					300: '#FCDA73',
					400: '#FBCE47',
					500: '#FAC200',
					600: '#C89B00',
					700: '#966F00',
					800: '#644B00',
					900: '#322500',
				},
				carteBlue: {
					DEFAULT: '#0D4E6F', // Secondary blue 
					50: '#E6EFF3',
					100: '#C2D8E3',
					200: '#9BC0D2',
					300: '#73A8C1',
					400: '#4C90B0',
					500: '#0D4E6F',
					600: '#0B4560',
					700: '#093A51',
					800: '#072F41',
					900: '#052432',
				},
				cartePink: {
					DEFAULT: '#FF7BAC', // New pink accent
					50: '#FFEFF5',
					100: '#FFDAEA',
					200: '#FFB5D5',
					300: '#FF98C0',
					400: '#FF7BAC',
					500: '#FF5E97',
					600: '#FF4182',
					700: '#FF246D',
					800: '#FF0758',
					900: '#EA0050',
				},
				carteBackground: {
					DEFAULT: '#FFFDF6', // Background cream 
					dark: '#F8F4E9',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				outfit: ['Outfit', 'sans-serif'],
				nunito: ['Nunito', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(-10px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'fade-in-left': {
					'0%': { opacity: '0', transform: 'translateX(10px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'bounce-small': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
				'hero-element-appear': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'hero-shapes-appear': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'hero-button-pop': {
					'0%': { transform: 'scale(0.95)' },
					'50%': { transform: 'scale(1.05)' },
					'100%': { transform: 'scale(1)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out',
				'fade-in-right': 'fade-in-right 0.7s ease-out',
				'fade-in-left': 'fade-in-left 0.7s ease-out',
				'spin-slow': 'spin-slow 3s linear infinite',
				'float': 'float 3s ease-in-out infinite',
				'bounce-small': 'bounce-small 2s ease-in-out infinite',
				'hero-element-appear': 'hero-element-appear 0.7s ease-out forwards',
				'hero-shapes-appear': 'hero-shapes-appear 1s ease-out forwards',
				'hero-button-pop': 'hero-button-pop 0.5s ease-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
