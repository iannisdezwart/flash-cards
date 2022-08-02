import React, { useState } from 'react'
import Flag from './Flag'
import * as styles from './FlashCardSet.module.sass'
import DeleteIcon from '../icons/delete.svg'
import { navigate } from 'gatsby'
import SideSwipable from './SideSwipable'
import { Lang } from '../util/langs'
import api from '../api'
import Popup from './Popup'
import Heading from './Heading'

interface Card
{
	back: string
	front: string
	starred: boolean
}

export interface FlashCardSetProps
{
	cards: Card[]
	name: string
	langFront: Lang
	langBack: Lang
	onDelete?: () => void
}

export default (props: FlashCardSetProps) =>
{
	const [ deleteSetErr, setDeleteSetErr ] = useState<string>()

	const deleteSet = async () =>
	{
		try
		{
			await api.sets.delete({
				setName: props.name
			})

			props.onDelete?.()
		}
		catch (err)
		{
			setDeleteSetErr(err as string)
		}
	}

	const openSet = () =>
	{
		navigate(`/set?name=${ props.name }`)
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

			<Popup visible={ deleteSetErr != null } title='Error deleting set'>
				<Heading size={ 1 } colour='#CBD1DC' text={ deleteSetErr! } />
			</Popup>
		</div>
	)
}