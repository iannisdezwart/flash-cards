import React, { useEffect, useState } from 'react'
import { reorder } from '../util/reorder'
import DraggableList from './DraggableList'
import FlashCardSet, { FlashCardSetProps } from './FlashCardSet'
import ClickDetector from '../components/ClickDetector'
import Heading from '../components/Heading'
import PlusIcon from '../icons/plus.svg'
import SvgIcon from './SvgIcon'
import { navigate } from 'gatsby'
import { request } from '../util/request'
import * as styles from './FlashCardSetList.module.sass'

export default () =>
{
	const [ sets, setSets ] = useState<FlashCardSetProps[]>([])

	const loadSets = async () =>
	{
		const apiToken = localStorage.getItem('api-token')

		if (apiToken == null)
		{
			navigate('/')
			return
		}

		const res = await request({
			method: 'GET',
			endpoint: '/sets',
			apiToken
		}) as FlashCardSetProps[]

		setSets(res)
	}

	useEffect(() => { loadSets() }, [])

	const addSet = () =>
	{
		navigate('/new-set')
	}

	const onReorder = (oldIndex: number, newIndex: number) =>
	{
		setSets(reorder(sets, oldIndex, newIndex))

		// TODO: Reorder sets through API.
	}

	return ( <>
		<Heading text='Sets' trailingIcon={
			<ClickDetector onClick={ addSet }>
				<SvgIcon Icon={ PlusIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} />

		{ sets.length == 0 &&
			<p className={ styles.noSets }>You don't have any sets. Tap the plus icon to create your first set!</p>
		}

		<DraggableList onReorder={ onReorder }>
			{ sets.map((set, i) => (
				<FlashCardSet
					cards={ set.cards }
					name={ set.name }
					langFrom={ set.langFrom }
					langTo={ set.langTo }
					key={ i } />
			)) }
		</DraggableList>
	</> )
}