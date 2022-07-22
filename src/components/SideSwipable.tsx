import React, { useState } from 'react'
import * as styles from './SideSwipable.module.sass'

interface SideSwipableProps
{
	LeftIcon: any
	leftIconColour: string
	leftIconOnClick: React.MouseEventHandler
	RightIcon: any
	rightIconColour: string
	rightIconOnClick: React.MouseEventHandler
	children: React.ReactNode
	onClick: React.MouseEventHandler
}

export default (props: SideSwipableProps) =>
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
			setTimeout(() => {
				setExpanded(false)
			}, 0)

			setTransform({
				transform: `translateX(0px)`
			})
		}
		else
		{
			setTimeout(() => {
				setExpanded(true)
			}, 0)

			setTransform({
				transform: `translateX(${ translate > 0 ? 80 : -80 }px)`
			})
		}
	}

	const iconPressed = (e: React.MouseEvent) =>
	{
		e.stopPropagation()
	}

	const leftIconOnClick = (e: React.MouseEvent) =>
	{
		e.stopPropagation()
		props.leftIconOnClick(e)
	}

	const rightIconOnClick = (e: React.MouseEvent) =>
	{
		e.stopPropagation()
		props.rightIconOnClick(e)
	}

	const onClick = (e: React.MouseEvent) =>
	{
		if (hasSwiped)
		{
			return
		}

		if (isExpanded)
		{
			setExpanded(false)
			setTransform({
				transform: `translateX(0px)`
			})

			return
		}

		props.onClick(e)
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
				<div className={ styles.leftIcon }
					style={{ backgroundColor: props.leftIconColour }}
					onMouseDown={ iconPressed }
					onMouseUp={ leftIconOnClick }
				>
					<props.LeftIcon />
				</div>

				<div className={ styles.inner }
					onClick={ onClick }
				>
					{ props.children }
				</div>

				<div className={ styles.rightIcon }
					style={{ backgroundColor: props.rightIconColour }}
					onMouseDown={ iconPressed }
					onMouseUp={ rightIconOnClick }
				>
					<props.RightIcon />
				</div>
			</div>
		</div>
	)
}