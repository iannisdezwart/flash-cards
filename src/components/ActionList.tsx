import React from 'react'
import * as styles from './ActionList.module.sass'

interface ActionListProps
{
	children: React.ReactNode
}

export default (props: ActionListProps) =>
{
	return (
		<div className={ styles.actionList }>
			{ props.children }
		</div>
	)
}