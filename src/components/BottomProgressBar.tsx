import React, { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import * as styles from './BottomProgressBar.module.sass'

interface BottomProgressBarProps
{
	progress: number
}

export default (props: BottomProgressBarProps) =>
{
	return createPortal(
		<div className={ styles.bottomProgressBar } style={{ '--progress': props.progress } as CSSProperties}>
			<div className={ styles.inner }></div>
		</div>,
		document.body
	)
}