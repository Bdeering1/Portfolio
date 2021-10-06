module.exports = {
	pathPrefix: '/Portfolio',
	siteMetadata: {
		siteUrl: 'https://bdeering1.github.io/Portfolio',
		title: 'Portfolio'
	},
	plugins: [
		'gatsby-plugin-sass',
		'gatsby-plugin-image',
		{
			resolve: 'gatsby-plugin-html-attributes',
			options: {
				lang: 'en'
			}
		},
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: "Bryn's Portfolio",
				short_name: 'Bryn Deering',
				description: "Bryn Deering's Portfolio",
				start_url: './',
				scope: '.',
				orientation: 'portrait',
				background_color: '#130330',
				theme_color: '#1C5491',
				display: 'standalone',
				icon: 'static/images/icon.png'
			}
		},
		'gatsby-plugin-offline',
		'gatsby-transformer-json',
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: './data'
			}
		},
		{
			resolve: `gatsby-plugin-typescript`,
			options: {
				isTSX: true, // defaults to false
				jsxPragma: `jsx`, // defaults to "React"
				allExtensions: true // defaults to false
			}
		}
	]
};
