import React from 'react'
import * as styles from './Button.module.sass'

interface ButtonProps
{
	bgColour: string
	fgColour: string
	text: string
	onClick: React.MouseEventHandler
}

export default (props: ButtonProps) =>
{
	return (
		<button
			className={ styles.button }
			onClick={ props.onClick }
			style={{
				backgroundColor: props.bgColour,
				color: props.fgColour
			}}
		>
			{ props.text }
		</button>
	)
}