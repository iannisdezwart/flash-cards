import React from 'react'
import { createPortal } from 'react-dom'
import * as styles from './Popup.module.sass'

interface PopupProps
{
	title: string
	children?: React.ReactNode
}

export default (props: PopupProps) =>
{
	return createPortal(
		<div className={ styles.popup }>
			<h1 className={ styles.heading }>{ props.title }</h1>
			{ props.children }
		</div>,
		document.body
	)
}