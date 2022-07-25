import React, { useState } from 'react'
import { createRef } from 'react'
import { classNames } from '../util/class-names'
import * as styles from './DraggableList.module.sass'

interface DraggableListProps
{
	children: React.ReactElement[]
	onReorder: (oldIndex: number, newIndex: number) => void
}

export default (props: DraggableListProps) =>
{
	const DRAG_DELAY = 500

	const [ isDragging, setDragging ] = useState(false)
	const [ dragStartTime, setDragStartTime ] = useState(0)
	const [ startLoc, setStartLoc ] = useState(0)
	const [ draggingElementId, setDraggingElementId ] = useState(-1)
	const [ dragRelativePosition, setDragRelativePosition ] = useState(0)
	const [ style, setStyle ] = useState<React.CSSProperties>({})
	const [ transformContainerStyle, setTransformContainerStyle ] = useState<React.CSSProperties>({})

	const lastChildRef = createRef<HTMLDivElement>()

	const dragStart = (i: number, y: number) =>
	{
		setDragging(true)
		setDraggingElementId(i)
		setDragStartTime(Date.now())
		setStartLoc(y)
		setDragRelativePosition(0)

		setTimeout(() => {
			if (!isDragging)
			{
				return
			}

			setTransformContainerStyle({
				transition: 'transform 300ms ease',
				transform: `scale(1.05)`,
				pointerEvents: 'none'
			})
		}, DRAG_DELAY)
	}

	const dragMove = (y: number) =>
	{
		if (!isDragging)
		{
			return
		}

		if (Date.now() - dragStartTime <= DRAG_DELAY)
		{
			return
		}

		const transform = y - startLoc

		setStyle({
			transform: `translateY(${ transform }px)`,
			zIndex: 1
		})

		setTransformContainerStyle({
			transition: 'transform 300ms ease',
			transform: `scale(1.05)`,
			pointerEvents: 'none'
		})

		const height = lastChildRef.current!.getBoundingClientRect().height
		setDragRelativePosition(Math.trunc(transform / height))
	}

	const dragEnd = () =>
	{
		if (!isDragging)
		{
			return
		}

		const bound = (num: number, min: number, max: number) =>
		{
			return Math.min(max, Math.max(min, num))
		}

		if (dragRelativePosition != 0)
		{
			const newIndex = bound(draggingElementId + dragRelativePosition, 0, props.children.length)
			props.onReorder(draggingElementId, newIndex)
		}

		setDragging(false)
		setStyle({})
		setTransformContainerStyle({})
	}

	const dragMouseStart = (i: number, e: React.MouseEvent) => dragStart(i, e.clientY)
	const dragMouseMove = (e: React.MouseEvent) => dragMove(e.clientY)
	const dragMouseEnd = () => dragEnd()
	const dragTouchStart = (i: number, e: React.TouchEvent) => dragStart(i, e.touches[0].clientY)
	const dragTouchMove = (e: React.TouchEvent) => dragMove(e.touches[0].clientY)
	const dragTouchEnd = () => dragEnd()

	return (
		<div className={ styles.draggableList }>
			{ props.children?.map((child, i) => (
				<div className={ styles.child }
					key={ i }
					ref={ lastChildRef }
					style={ draggingElementId == i ? style : {} }
					onMouseDown={ e => dragMouseStart(i, e) }
					onTouchStart={ e => dragTouchStart(i, e) }
					onMouseMove={ e => dragMouseMove(e) }
					onMouseUp={ () => dragMouseEnd() }
					onMouseLeave={ () => dragMouseEnd() }
					onTouchMove={ e => dragTouchMove(e) }
					onTouchEnd={ () => dragTouchEnd() }
				>
					<div className={ classNames({
						[styles.childTransformContainer]: true,
						[styles.transition]: isDragging,
						[styles.up]: isDragging && draggingElementId < i && draggingElementId + dragRelativePosition >= i,
						[styles.down]: isDragging && draggingElementId > i && draggingElementId + dragRelativePosition <= i
					}) }
						style={ draggingElementId == i ? transformContainerStyle : {} }
					>
						{ child }
					</div>	
				</div>
			)) }
		</div>
	)
}