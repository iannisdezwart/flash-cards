import React from 'react'
import { Property } from 'csstype'

interface VerticalFlexboxProps
{
	children: React.ReactNode
	mainAxisAlignment?: Property.JustifyContent
	crossAxisAlignment?: Property.AlignItems
}

export default (props: VerticalFlexboxProps) =>
{
	const justifyContent = props.mainAxisAlignment || 'center'
	const alignItems = props.crossAxisAlignment || 'center'

	return (
		<div style={{
			display: 'flex',
			justifyContent,
			alignItems,
			flexDirection: 'column'
		}}>
			{ props.children }
		</div>
	)
}