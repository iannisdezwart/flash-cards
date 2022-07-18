import React from 'react'
import * as styles from './Heading.module.sass'

interface HeadingProps
{
	text: string
	size?: number
}

export default (props: HeadingProps) =>
{
	const fontSize = props.size || 3

	const style = {
		fontSize: `${ fontSize }rem`
	}

	return (
		<h1 style={ style } className={ styles.heading }>{ props.text }</h1>
	)
}