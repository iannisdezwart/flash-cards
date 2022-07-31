import React from 'react'
import * as styles from './Heading.module.sass'
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
	const fontSize = props.size || 3
	const colour = props.colour || '#3C8DEC'
	const textAlign = props.align || 'center'

	const style: React.CSSProperties = {
		fontSize: `${ fontSize }rem`,
		color: colour,
		textAlign
	}

	return (
		<div className={ styles.heading }>
			<div>{ props.leadingIcon }</div>
			<h1 style={ style }>{ props.text }</h1>
			<div>{ props.trailingIcon }</div>
		</div>
	)
}