import React, { useState } from 'react'
import Flag from './Flag'
import { FlashCardProps } from './FlashCard'
import * as styles from './FlashCardSet.module.sass'
import EditIcon from '../icons/edit.svg'
import DeleteIcon from '../icons/delete.svg'
import { navigate } from 'gatsby'

export interface FlashCardSetProps
{
	cards: FlashCardProps[]
	name: string
	langFrom: string
	langTo: string
}

export default (props: FlashCardSetProps) =>
{
	const [ isSwiping, setSwiping ] = useState(false)
	const [ startLoc, setStartLoc ] = useState(0)
	const [ transform, setTransform ] = useState({
		transform: `translateX(0px)`
	})
	const [ resetTransition, setResetTransition ] = useState({})
	const [ isExpanded, setExpanded ] = useState(false)
	const [ hasSwiped, setHasSwiped ] = useState(false)

	const swipeStart = (x: number) =>
	{
		if (!isExpanded)
		{
			setResetTransition({})
		}

		setStartLoc(x)
		setHasSwiped(false)
		setSwiping(true)
	}

	const swipeMove = (x: number) =>
	{
		if (!isSwiping)
		{
			return
		}

		let translate = x - startLoc

		setHasSwiped(Math.abs(translate) > 2)

		if (Math.abs(translate) > 80)
		{
			translate = translate > 0 ? 80 : -80
		}

		setTransform({
			transform: `translateX(${ translate }px)`
		})
	}

	const swipeEnd = (x: number) =>
	{
		if (!isSwiping)
		{
			return
		}

		setSwiping(false)

		let translate = x - startLoc

		setResetTransition({
			transition: `transform 0.2s ease-in-out`
		})

		if (Math.abs(translate) < 80)
		{
			setExpanded(false)

			setTransform({
				transform: `translateX(0px)`
			})
		}
		else
		{
			setExpanded(true)

			setTransform({
				transform: `translateX(${ translate > 0 ? 80 : -80 }px)`
			})
		}
	}

	const resetSwipe = () =>
	{
		if (isSwiping)
		{
			return
		}

		setExpanded(false)
		setTransform({
			transform: `translateX(0px)`
		})
	}

	const openSet = () =>
	{
		if (hasSwiped || isExpanded)
		{
			return
		}

		navigate(`/set`, {
			state: props
		})
	}

	const swipeMouseStart = (e: React.MouseEvent) => swipeStart(e.clientX)
	const swipeMouseMove = (e: React.MouseEvent) => swipeMove(e.clientX)
	const swipeMouseEnd = (e: React.MouseEvent) => swipeEnd(e.clientX)
	const swipeTouchStart = (e: React.TouchEvent) => swipeStart(e.touches[0].clientX)
	const swipeTouchMove = (e: React.TouchEvent) => swipeMove(e.touches[0].clientX)
	const swipeTouchEnd = (e: React.TouchEvent) => swipeEnd(e.changedTouches[0].clientX)

	return (
		<div className={ styles.set }
			onMouseDown={ swipeMouseStart }
			onMouseMove={ swipeMouseMove }
			onMouseUp={ swipeMouseEnd }
			onMouseLeave={ swipeMouseEnd }
			onTouchStart={ swipeTouchStart }
			onTouchMove={ swipeTouchMove }
			onTouchEnd={ swipeTouchEnd }
		>
			<div className={ styles.content }
				style={ { ...transform, ...resetTransition } }
			>
				<div className={ styles.editIcon }>
					<EditIcon />
				</div>

				<div className={ styles.inner }
					onMouseDown={ resetSwipe }
					onTouchStart={ resetSwipe }
					onClick={ openSet }
				>
					<Flag lang={ props.langFrom } />
					<p className={ styles.name }>{ props.name }</p>
					<Flag lang={ props.langTo } />
				</div>

				<div className={ styles.deleteIcon }>
					<DeleteIcon />
				</div>
			</div>
		</div>
	)
}