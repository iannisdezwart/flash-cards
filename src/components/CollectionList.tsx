import React, { useEffect, useState } from 'react'
import * as styles from './CollectionList.module.sass'
import { Lang } from '../util/langs'
import api from '../api'
import Popup from './Popup'
import Paragraph from './Paragraph'
import VerticalFlexbox from './VerticalFlexbox'
import Collection from './Collection'

interface Collection
{
	name: string
	langFront: Lang
	langBack: Lang
}

export default () =>
{
	const [ collections, setCollections ] = useState<Collection[]>([])
	const [ loadCollectionsError, setLoadCollectionsError ] = useState<string>()

	const deleteCollection = (collectionName: string) =>
	{
		setCollections(collections.filter(c => c.name != collectionName))
	}

	const loadCollections = async () =>
	{
		try
		{
			const allCollections = await api.collections.getAll()

			setCollections(allCollections.map(collection => ({
				name: collection.name,
				langFront: Lang.fromLocale(collection.localeFront),
				langBack: Lang.fromLocale(collection.localeBack)
			})))
		}
		catch (err)
		{
			setLoadCollectionsError(err as string)
		}
	}

	useEffect(() => { loadCollections() }, [])

	return ( <>
		{ collections.length == 0 &&
			<p className={ styles.noCollections }>You don't have any collections. Tap the plus icon to create your first collection!</p>
		}

		<VerticalFlexbox>
			{ collections.map((collection, i) => (
				<Collection
					name={ collection.name }
					langFront={ collection.langFront }
					langBack={ collection.langBack }
					onDelete={ () => deleteCollection(collection.name) }
					key={ i } />
			)) }
		</VerticalFlexbox>

		<Popup
			visible={ loadCollectionsError != null }
			title='Error loading collections'
			onClose={ () => setLoadCollectionsError(undefined) }
		>
			<Paragraph colour='#CBD1DC' align='center' text={ loadCollectionsError! } />
		</Popup>
	</> )
}