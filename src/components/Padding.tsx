import React from 'react'

interface PaddingProps
{
	horizontal?: number
	vertical?: number
}

export default (props: PaddingProps) =>
{
	return (
		<div style={{
			width: props.horizontal,
			height: props.vertical
		}}></div>
	)
}