import React from 'react'
import * as styles from './Heading.module.sass'

interface HeadingProps
{
	text: string
	size?: number
	leadingIcon?: React.ReactElement
	trailingIcon?: React.ReactElement
}

export default (props: HeadingProps) =>
{
	const fontSize = props.size || 3

	const style = {
		fontSize: `${ fontSize }rem`
	}

	return (
		<div className={ styles.heading }>
			<div>{ props.leadingIcon }</div>
			<h1 style={ style }>{ props.text }</h1>
			<div>{ props.trailingIcon }</div>
		</div>
	)
}