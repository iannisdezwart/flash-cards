import React from 'react'
import { Property } from 'csstype'

interface HorizontalFlexboxProps
{
	children: React.ReactNode
	mainAxisAlignment?: Property.JustifyContent
	crossAxisAlignment?: Property.AlignItems
	fill?: boolean
}

export default (props: HorizontalFlexboxProps) =>
{
	const justifyContent = props.mainAxisAlignment || 'center'
	const alignItems = props.crossAxisAlignment || 'center'
	const fill = props.fill || false

	return (
		<div style={{
			display: 'flex',
			justifyContent,
			alignItems,
			width: fill ? '100%' : ''
		}}>
			{ props.children }
		</div>
	)
}