import React from 'react'
import * as styles from './RoundIcon.module.sass'

interface RoundIconProps
{
	colour: string
	Icon: any
	size: number
	onClick?: React.MouseEventHandler
}

export default (props: RoundIconProps) =>
{
	return (
		<div className={ styles.roundIcon }
			style={{
				backgroundColor: props.colour,
				'--icon-size': `${ props.size }px`
			} as React.CSSProperties}
			onMouseUp={ props.onClick }
		>
			<props.Icon />
		</div>
	)
}