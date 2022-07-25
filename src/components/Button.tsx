import React from 'react'
import * as styles from './Button.module.sass'

interface ButtonProps
{
	bgColour: string
	fgColour: string
	text: string
	onClick: React.MouseEventHandler
	size?: number
}

export default (props: ButtonProps) =>
{
	const size = props.size || 1

	return (
		<button
			className={ styles.button }
			onClick={ props.onClick }
			style={{
				'--size': size,
				backgroundColor: props.bgColour,
				color: props.fgColour
			} as React.CSSProperties}
		>
			{ props.text }
		</button>
	)
}