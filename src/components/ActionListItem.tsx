import { navigate } from 'gatsby'
import React from 'react'
import * as styles from './ActionListItem.module.sass'

export interface ActionListItemProps
{
	icon: any
	text: string
	action: string
}

export default (props: ActionListItemProps) =>
{
	const performAction = () =>
	{
		navigate(props.action)
	}

	const Icon = props.icon
	return (
		<div className={ styles.actionListItem } onClick={ performAction } >
			<Icon className={ styles.icon } />
			<p>{ props.text }</p>
		</div>
	)
}