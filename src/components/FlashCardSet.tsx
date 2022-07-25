import React from 'react'
import Flag from './Flag'
import * as styles from './FlashCardSet.module.sass'
import EditIcon from '../icons/edit.svg'
import DeleteIcon from '../icons/delete.svg'
import { navigate } from 'gatsby'
import SideSwipable from './SideSwipable'

interface Card
{
	back: string
	front: string
}

export interface FlashCardSetProps
{
	cards: Card[]
	name: string
	langFrom: string
	langTo: string
}

export default (props: FlashCardSetProps) =>
{
	const editSet = () =>
	{
		console.log('edit set')
	}

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
					<Flag lang={ props.langFrom } />
					<p className={ styles.name }>{ props.name }</p>
					<Flag lang={ props.langTo } />
				</div>
			</SideSwipable>
		</div>
	)
}