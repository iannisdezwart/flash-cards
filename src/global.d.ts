// necessary to make importing sass modules work.
// See https://github.com/gatsbyjs/gatsby/issues/8144#issuecomment-438206866
declare module '*.sass'
{
	const content: { [className: string]: string }
	export = content
}

// Necessary to make importing svgs work.
declare module "*.svg" {
	const content: any
	export default content
}