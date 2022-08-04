import React, { useEffect, useState } from 'react'
import { reorder } from '../util/reorder'
import DraggableList from './DraggableList'
import FlashCardSet, { FlashCardSetProps } from './FlashCardSet'
import ClickDetector from '../components/ClickDetector'
import Heading from '../components/Heading'
import PlusIcon from '../icons/plus.svg'
import SvgIcon from './SvgIcon'
import { navigate } from 'gatsby'
import * as styles from './FlashCardSetList.module.sass'
import { Lang } from '../util/langs'
import api from '../api'
import Popup from './Popup'
import Paragraph from './Paragraph'

export default () =>
{
	const [ sets, setSets ] = useState<FlashCardSetProps[]>([])
	const [ loadSetsError, setLoadSetsError ] = useState<string>()

	const deleteSet = (setName: string) =>
	{
		setSets(sets.filter(s => s.name != setName))
	}

	const loadSets = async () =>
	{
		try
		{
			const allSets = await api.sets.getAll()

			setSets(allSets.map(set => ({
				name: set.name,
				langFront: Lang.fromLocale(set.localeFront)!,
				langBack: Lang.fromLocale(set.localeBack)!
			})))
		}
		catch (err)
		{
			setLoadSetsError(err as string)
		}
	}

	useEffect(() => { loadSets() }, [])

	const addSet = () =>
	{
		navigate('/new-set')
	}

	const onReorder = (oldIndex: number, newIndex: number) =>
	{
		setSets(reorder(sets, oldIndex, newIndex))
		api.sets.reorder(oldIndex, newIndex)
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
					name={ set.name }
					langFront={ set.langFront }
					langBack={ set.langBack }
					onDelete={ () => deleteSet(set.name) }
					key={ i } />
			)) }
		</DraggableList>

		<Popup visible={ loadSetsError != null } title='Error loading sets'>
			<Paragraph colour='#CBD1DC' align='center' text={ loadSetsError! } />
		</Popup>
	</> )
}