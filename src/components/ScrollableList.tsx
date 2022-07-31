import React, { forwardRef } from 'react'
import * as styles from './ScrollableList.module.sass'
import { Property } from 'csstype'

interface ScrollableListProps
{
	width?: Property.Width
	height?: Property.Height
	children: React.ReactNode
}

export default forwardRef((props: ScrollableListProps, ref: React.Ref<HTMLDivElement>) =>
{
	const width = props.width || ''
	const height = props.height || ''

	return (
		<div ref={ ref } className={ styles.scrollableList } style={{ width, height }}>
			{ props.children }
		</div>
	)
})