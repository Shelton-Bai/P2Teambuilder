/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
  theme: {
    extend: {
		colors:{
			pory:{
				red:'#ff5566',
				blue:'#4499dd',
			},
			mono:{
				100:'#0f0f0f',
				200:'#252525',
				300:'#3f3f3f',
				400:'#555555',
				500:'#696969',
				600:'#808080',
				700:'#aaaaaa',
				800:'#dedede',
				900:'#ffffff',
			}
		},
	},
  },
  plugins: [
    require('tailwindcss-react-aria-components')
  ]
}

