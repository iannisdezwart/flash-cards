export default {
	siteMetadata: {
		title: 'flash-cards',
		siteUrl: 'https://flashcards.iannis.io'
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		'gatsby-plugin-sass',
		'gatsby-plugin-react-svg',
		'gatsby-transformer-json',
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Flashcards`,
				short_name: `Flashcards`,
				start_url: `/`,
				background_color: `#232328`,
				theme_color: `#3c8dec`,
				display: `standalone`,
				icon: `src/icons/favicon.png`
			},
		},
		'gatsby-plugin-offline'
	]
}