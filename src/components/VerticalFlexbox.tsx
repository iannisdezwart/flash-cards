import React from 'react'

interface VerticalFlexboxProps
{
	children: React.ReactNode
}

export default (props: VerticalFlexboxProps) =>
{
	return (
		<div style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column'
		}}>
			{ props.children }
		</div>
	)
}