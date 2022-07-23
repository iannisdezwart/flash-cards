import React from 'react'
import * as styles from './ClickDetector.module.sass'

interface ClickDetectorProps
{
	children: React.ReactNode
	onClick: React.MouseEventHandler
}

export default (props: ClickDetectorProps) =>
{
	return (
		<div className={ styles.clickDetector } onClick={ props.onClick }>
			{ props.children }
		</div>
	)
}