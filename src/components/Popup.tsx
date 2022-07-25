import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import * as styles from './Popup.module.sass'

interface PopupProps
{
	title: string
	visible: boolean
	children?: React.ReactNode
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

	return createPortal(
		<div className={ styles.popup } style={ style }>
			<h1 className={ styles.heading }>{ props.title }</h1>
			{ props.children }
		</div>,
		document.body
	)
}