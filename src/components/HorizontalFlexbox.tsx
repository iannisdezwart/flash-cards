import React from 'react'
import { Property } from 'csstype'

interface HorizontalFlexboxProps
{
	children: React.ReactNode
	mainAxisAlignment?: Property.JustifyContent
	crossAxisAlignment?: Property.AlignItems
}

export default (props: HorizontalFlexboxProps) =>
{
	const justifyContent = props.mainAxisAlignment || 'center'
	const alignItems = props.crossAxisAlignment || 'center'

	return (
		<div style={{
			display: 'flex',
			justifyContent,
			alignItems
		}}>
			{ props.children }
		</div>
	)
}