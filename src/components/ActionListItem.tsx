import React from 'react'
import * as styles from './ActionListItem.module.sass'

export interface ActionListItemProps
{
	icon: any
	text: string
	action: () => void
}

export default (props: ActionListItemProps) =>
{
	const Icon = props.icon
	return (
		<div className={ styles.actionListItem } onClick={ props.action } >
			<Icon className={ styles.icon } />
			<p>{ props.text }</p>
		</div>
	)
}