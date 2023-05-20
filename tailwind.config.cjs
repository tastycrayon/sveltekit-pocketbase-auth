/** @type {import('tailwindcss').Config}*/
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config}*/
const config = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', require('path').join(require.resolve(
		'@skeletonlabs/skeleton'),
		'../**/*.{html,js,svelte,ts}'
	)],

	theme: {
		extend: {}
	},

	plugins: [forms, typography, ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()]
};

module.exports = config;
