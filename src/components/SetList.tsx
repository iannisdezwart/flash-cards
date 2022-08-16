import React, { useEffect, useState } from 'react'
import { reorder } from '../util/reorder'
import DraggableList from './DraggableList'
import Set, { SetProps } from './Set'
import * as styles from './SetList.module.sass'
import { Lang } from '../util/langs'
import api from '../api'
import Popup from './Popup'
import Paragraph from './Paragraph'
import VerticalFlexbox from './VerticalFlexbox'
import { UpdateLabel } from '../hooks/update-label'

interface SetListProps
{
	ofCollection?: string
	noSetsError: string
	updateLabel?: UpdateLabel
	onDelete?: (setName: string) => void
}

export default (props: SetListProps) =>
{
	const [ sets, setSets ] = useState<SetProps[]>([])
	const [ loadSetsError, setLoadSetsError ] = useState<string>()

	const loadSets = async () =>
	{
		try
		{
			const allSets = await api.sets.getAll({
				ofCollection: props.ofCollection
			})

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

	useEffect(() => { loadSets() }, [ props.updateLabel ])

	const deleteSet = async (setName: string) =>
	{
		setSets(sets.filter(set => set.name != setName))
		await api.sets.delete({ setName })
		props.onDelete?.(setName)
	}

	const onReorder = async (oldIndex: number, newIndex: number) =>
	{
		setSets(reorder(sets, oldIndex, newIndex))
		await api.sets.reorder(oldIndex, newIndex)
	}

	const removeSetFromCollection = async (setName: string, collectionName: string) =>
	{
		setSets(sets.filter(s => s.name != setName))
		await api.collections.deleteSet({ setName, collectionName })
	}

	return ( <>
		{ sets.length == 0 &&
			<p className={ styles.noSets }>{ props.noSetsError }</p>
		}

		{ props.ofCollection == null &&
			<DraggableList onReorder={ onReorder }>
				{ sets.map((set, i) => (
					<Set
						name={ set.name }
						langFront={ set.langFront }
						langBack={ set.langBack }
						onDelete={ () => deleteSet(set.name) }
						key={ i } />
				)) }
			</DraggableList>
		}

		{ props.ofCollection != null &&
			<VerticalFlexbox>
				{ sets.map((set, i) => (
					<Set
						name={ set.name }
						langFront={ set.langFront }
						langBack={ set.langBack }
						onDelete={ () => removeSetFromCollection(set.name, props.ofCollection!) }
						deleteMessage='This will remove the set from the collection. The set will not be deleted.'
						deleteConfirm='Remove set'
						key={ i } />
				)) }
			</VerticalFlexbox>
		}

		<Popup
			visible={ loadSetsError != null }
			title='Error loading sets'
			onClose={ () => setLoadSetsError(undefined) }
		>
			<Paragraph colour='#CBD1DC' align='center' text={ loadSetsError! } />
		</Popup>
	</> )
}