import React from 'react'
import * as styles from './SvgIcon.module.sass'

interface SvgIconProps
{
	Icon: any
	width?: number
	height?: number
}

export default (props: SvgIconProps) =>
{
	return (
		<div className={ styles.svgIcon } style={{ width: props.width, height: props.height }}>
			{ <props.Icon /> }
		</div>
	)
}