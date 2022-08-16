import React from 'react'
import { classNames } from '../util/class-names'
import * as styles from './ActionListItem.module.sass'

export interface ActionListItemProps
{
	icon: any
	text: string
	action: () => void
	size?: 'small' | 'big'
}

export default (props: ActionListItemProps) =>
{
	const Icon = props.icon
	const size = props.size ?? 'small'
	return (
		<div className={ classNames({
			[styles.big]: size == 'big',
			[styles.actionListItem]: true
		}) } onClick={ props.action } >
			<Icon className={ styles.icon } />
			<p>{ props.text }</p>
		</div>
	)
}