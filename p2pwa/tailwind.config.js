/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				pory: {
					red: '#ff5566',
					blue: '#4499dd',
				},
				mono: {
					100: '#0f0f0f',
					200: '#252525',
					300: '#3f3f3f',
					400: '#555555',
					500: '#696969',
					600: '#808080',
					700: '#aaaaaa',
					800: '#dedede',
					900: '#ffffff',
				},
				typecolor: {
					normal: '#a8a77a',
					fire: '#ee8130',
					water: '#6390f0',
					electric: '#f7d02c',
					grass: '#7ac74c',
					ice: '#96d9d6',
					fighting: '#c22e28',
					poison: '#a33ea1',
					ground: '#e2bf65',
					flying: '#a98ff3',
					psychic: '#f95587',
					bug: '#a6b91a',
					rock: '#b6a136',
					ghost: '#735797',
					dragon: '#6f35fc',
					dark: '#705746',
					steel: '#b7b7ce',
					fairy: '#d685ad',
				}
			},
		},
	},
	plugins: [
		require('tailwindcss-react-aria-components')
	]
}

