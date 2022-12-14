import React, { useEffect, useState } from 'react'
import api from '../api'
import { Lang } from '../util/langs'
import FlashCard from './FlashCard'
import * as styles from './FlashCardList.module.sass'
import Paragraph from './Paragraph'
import Popup from './Popup'
import { ResponseModel as Word } from '../api/collections/cards/get'

interface FlashCardListProps
{
	setName?: string
	collectionName?: string
}

export default (props: FlashCardListProps) => {
	const [ cards, setCards ] = useState<Word[]>([])
	const [ langFront, setLangFront ] = useState(Lang.unknown)
	const [ langBack, setLangBack ] = useState(Lang.unknown)
	const [ loadSetError, setLoadSetError ] = useState<string>()

	const loadSet = async () =>
	{
		try
		{
			const [ set, cards ] = await Promise.all(
				props.setName != null
					? [
						await api.sets.get(props.setName),
						await api.sets.cards.get(props.setName)
					]
					: [
						await api.collections.get(props.collectionName!),
						await api.collections.cards.get(props.collectionName!)
					])

			setLangFront(Lang.fromLocale(set.localeFront))
			setLangBack(Lang.fromLocale(set.localeBack))
			setCards(cards)
		}
		catch (err)
		{
			setLoadSetError(err as string)
		}
	}

	useEffect(() => { loadSet() }, [])

	const toggleStar = (cardIndex: number) =>
	{
		if (cards == null)
		{
			return
		}

		const newCards = cards.slice()
		newCards[cardIndex].starred = !newCards[cardIndex].starred
		setCards(newCards)

		api.sets.cards.setStarred({
			setName: newCards[cardIndex].setName,
			cardId: newCards[cardIndex].id,
			starred: newCards[cardIndex].starred
		})
	}

	return ( <>
		<div className={ styles.flashCardList }>
			{ cards != null && cards.map((card, i) => (
				<FlashCard
					front={{ lang: langFront, text: card.front }}
					back={{ lang: langBack, text: card.back }}
					starred={ card.starred }
					onToggleStar={ () => toggleStar(i) }
					key={ `${ card.id }-${ i }` } />
			)) }
		</div>

		<Popup
			visible={ loadSetError != null }
			onClose={ () => setLoadSetError(undefined) }
			title='Error loading set'
		>
			<Paragraph colour='#CBD1DC' align='center' text={ loadSetError! } />
		</Popup>
	</> )
}