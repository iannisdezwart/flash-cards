import React, { useState } from 'react'
import * as styles from './SideSwipable.module.sass'

export type SideSwipableOnClickAction = 'close' | 'keep-open' | void | Promise<void>
export type SideSwipableOnClickHandler = (e: React.MouseEvent) => SideSwipableOnClickAction

interface Icon
{
	Icon: any
	colour: string
	onClick: SideSwipableOnClickHandler
}

interface SideSwipableProps
{
	leftIcon?: Icon
	rightIcon?: Icon
	floatingIcon?: Icon
	iconSize: number
	children: React.ReactNode
	onClick?: React.MouseEventHandler
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

		if (Math.abs(translate) > props.iconSize)
		{
			translate = translate > 0 ? props.iconSize : -props.iconSize
		}

		if (props.leftIcon == null && translate > 0)
		{
			translate = 0
		}
		if (props.rightIcon == null && translate < 0)
		{
			translate = 0
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

		if (Math.abs(translate) < props.iconSize)
		{
			setTimeout(() => {
				setExpanded(false)
			}, 0)

			setTransform({
				transform: `translateX(0px)`
			})
		}
		else if (translate > 0 && props.leftIcon != null || translate < 0 && props.rightIcon != null)
		{
			setTimeout(() => {
				setExpanded(true)
			}, 0)

			setTransform({
				transform: `translateX(${ translate > 0 ? props.iconSize : -props.iconSize }px)`
			})
		}
		else
		{
			setTimeout(() => {
				setExpanded(false)
			}, 0)

			setTransform({
				transform: `translateX(0px)`
			})
		}
	}

	const leftIconOnClick = (e: React.MouseEvent) =>
	{
		e.stopPropagation()

		if (props.leftIcon!.onClick(e))
		{
			setExpanded(false)
			setTransform({
				transform: `translateX(0px)`
			})
		}
	}

	const rightIconOnClick = (e: React.MouseEvent) =>
	{
		e.stopPropagation()

		if (props.rightIcon!.onClick(e))
		{
			setExpanded(false)
			setTransform({
				transform: `translateX(0px)`
			})
		}
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

		props.onClick?.(e)
	}

	const swipeMouseStart = (e: React.MouseEvent) => swipeStart(e.clientX)
	const swipeMouseMove = (e: React.MouseEvent) => swipeMove(e.clientX)
	const swipeMouseEnd = (e: React.MouseEvent) => swipeEnd(e.clientX)
	const swipeTouchStart = (e: React.TouchEvent) => swipeStart(e.touches[0].clientX)
	const swipeTouchMove = (e: React.TouchEvent) => swipeMove(e.touches[0].clientX)
	const swipeTouchEnd = (e: React.TouchEvent) => swipeEnd(e.changedTouches[0].clientX)

	return (
		<div className={ styles.sideSwipableContainer }
			style={{ '--icon-size': `${ props.iconSize }px` } as React.CSSProperties}
		>
			<div className={ styles.sideSwipable }
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
					{ props.leftIcon &&
						<div className={ styles.leftIcon }
							style={{ backgroundColor: props.leftIcon.colour }}
							onMouseDown={ e => e.stopPropagation() }
							onTouchStart={ e => e.stopPropagation() }
							onMouseUp={ leftIconOnClick }
						>
							<props.leftIcon.Icon />
						</div>
					}

					<div className={ styles.inner }
						onClick={ onClick }
					>
						{ props.children }
					</div>

					{ props.rightIcon &&
						<div className={ styles.rightIcon }
							style={{ backgroundColor: props.rightIcon.colour }}
							onMouseDown={ e => e.stopPropagation() }
							onTouchStart={ e => e.stopPropagation() }
							onMouseUp={ rightIconOnClick }
						>
							<props.rightIcon.Icon />
						</div>
					}
				</div>
			</div>
			{ props.floatingIcon &&
				<div className={ styles.floatingIcon }
					style={{ backgroundColor: props.floatingIcon.colour }}
					onMouseUp={ props.floatingIcon.onClick }
				>
					<props.floatingIcon.Icon />
				</div>
			}
		</div>
	)
}