import React, { useEffect, useState } from 'react'
import api from '../api'
import { Lang } from '../util/langs'
import Set, { SetProps } from './Set'
import VerticalFlexbox from './VerticalFlexbox'
import * as styles from './SelectableSetList.module.sass'
import Popup from './Popup'
import Paragraph from './Paragraph'
import SelectableSet from './SelectableSet'
import { UpdateLabel } from '../hooks/update-label'

interface SelectableSetListProps
{
	forCollection?: string
	onSelect: (setName: string) => void
	updateLabel?: UpdateLabel
}

export default (props: SelectableSetListProps) =>
{
	const [ sets, setSets ] = useState<SetProps[]>([])
	const [ loadSetsError, setLoadSetsError ] = useState<string>()

	const loadSets = async () =>
	{
		try
		{
			const allSets = await api.sets.getAll({
				fitsCollection: props.forCollection
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

	return ( <>
		{ sets.length == 0 &&
			<p className={ styles.noSets }>You have no sets that can be added to this collection.</p>
		}

		<VerticalFlexbox>
			{ sets.map((set, i) => (
				<SelectableSet
					name={ set.name }
					langFront={ set.langFront }
					langBack={ set.langBack }
					onClick={ () => props.onSelect?.(set.name) }
					key={ i } />
			)) }
		</VerticalFlexbox>

		<Popup
			visible={ loadSetsError != null }
			title='Error loading sets'
			onClose={ () => setLoadSetsError(undefined) }
		>
			<Paragraph colour='#CBD1DC' align='center' text={ loadSetsError! } />
		</Popup>
	</> )
}