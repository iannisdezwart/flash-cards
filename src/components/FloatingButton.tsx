import React from 'react'
import { createPortal } from 'react-dom'
import ClickDetector from './ClickDetector'
import * as styles from './FloatingButton.module.sass'
import SvgIcon from './SvgIcon'

interface FloatingButtonProps
{
	Icon: any
	colour: string
	onClick: () => void
}

export default (props: FloatingButtonProps) =>
{
	if (typeof document == 'undefined')
	{
		return null
	}

	return createPortal(
		<ClickDetector onClick={ props.onClick }>
			<div className={ styles.floatingButton } style={{ backgroundColor: props.colour }}>
					<SvgIcon Icon={ props.Icon } width={ 40 } height={ 40 } />
			</div>
		</ClickDetector>,
		document.body
	)
}