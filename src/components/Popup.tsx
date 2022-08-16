import React from 'react'
import { createPortal } from 'react-dom'
import ClickDetector from './ClickDetector'
import Heading from './Heading'
import CloseIcon from '../icons/close.svg'
import * as styles from './Popup.module.sass'

interface PopupProps
{
	title: string
	visible: boolean
	children?: React.ReactNode
	onClose: () => void
}

export default (props: PopupProps) =>
{
	const style: React.CSSProperties = props.visible ? {
		opacity: 1,
		visibility: 'visible',
		transition: 'visibility 200ms ease-out, opacity 200ms ease-out'
	} : {
		opacity: 0,
		visibility: 'hidden',
		transition: 'visibility 150ms ease-in, opacity 150ms ease-in'
	}

	if (typeof document == 'undefined')
	{
		return null
	}

	return createPortal(
		<div className={ styles.popup } style={ style }>
			<Heading text={ props.title } size={ 2 } colour='#CBD1DC' trailingIcon={
				<ClickDetector onClick={ props.onClose }>
					<CloseIcon />
				</ClickDetector>
			} />
			{ props.children }
		</div>,
		document.body
	)
}