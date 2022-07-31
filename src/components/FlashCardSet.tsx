import React from 'react'
import Flag from './Flag'
import * as styles from './FlashCardSet.module.sass'
import DeleteIcon from '../icons/delete.svg'
import { navigate } from 'gatsby'
import SideSwipable from './SideSwipable'
import { Lang } from '../util/langs'

interface Card
{
	back: string
	front: string
}

export interface FlashCardSetProps
{
	cards: Card[]
	name: string
	langFront: Lang
	langBack: Lang
}

export default (props: FlashCardSetProps) =>
{
	const deleteSet = () =>
	{
		console.log('delete set')
	}

	const openSet = () =>
	{
		navigate(`/set`, {
			state: props
		})
	}

	return (
		<div className={ styles.flashCardSet }>
			<SideSwipable
				rightIcon={{
					Icon: DeleteIcon,
					colour: '#EC7272',
					onClick: deleteSet
				}}
				iconSize={ 80 }
				onClick={ openSet }
			>
				<div className={ styles.inner }>
					<Flag locale={ props.langFront.locale } />
					<p className={ styles.name }>{ props.name }</p>
					<Flag locale={ props.langBack.locale } />
				</div>
			</SideSwipable>
		</div>
	)
}