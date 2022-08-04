import React from 'react'
import { Property } from 'csstype'

interface HeadingProps
{
	text: string
	size?: number
	colour?: string
	leadingIcon?: React.ReactElement
	trailingIcon?: React.ReactElement
	align?: Property.TextAlign
}

export default (props: HeadingProps) =>
{
	const fontSize = props.size || 1
	const colour = props.colour || '#3C8DEC'
	const textAlign = props.align || 'left'

	const style: React.CSSProperties = {
		fontSize: `${ fontSize }rem`,
		color: colour,
		textAlign
	}

	return (
		<p style={ style }>{ props.text }</p>
	)
}