import React, { useEffect, useState } from 'react'
import api from '../api'
import { Lang } from '../util/langs'
import FlashCard from './FlashCard'
import * as styles from './FlashCardList.module.sass'
import { FlashCardSetProps } from './FlashCardSet'
import Heading from './Heading'
import Popup from './Popup'

interface FlashCardListProps
{
	setName: string
}

export default (props: FlashCardListProps) => {
	const [ set, setSet ] = useState<FlashCardSetProps>()
	const [ loadSetError, setLoadSetError ] = useState<string>()

	const loadSet = async () =>
	{
		try
		{
			const [ set, cards ] = await Promise.all([
				await api.sets.get(props.setName),
				await api.sets.cards.get(props.setName)
			])

			setSet({
				cards: cards,
				name: set.name,
				langFront: Lang.fromLocale(set.localeFront)!,
				langBack: Lang.fromLocale(set.localeBack)!
			})
		}
		catch (err)
		{
			setLoadSetError(err as string)
		}
	}

	useEffect(() => { loadSet() }, [])

	const toggleStar = (cardIndex: number) =>
	{
		if (set == null)
		{
			return
		}

		const newSet = { ...set }
		newSet.cards[cardIndex].starred = !newSet.cards[cardIndex].starred
		setSet(newSet)

		api.sets.cards.update({
			setName: props.setName,
			cardIndex,
			card: {
				front: set.cards[cardIndex].front,
				back: set.cards[cardIndex].back,
				starred: newSet.cards[cardIndex].starred
			}
		})
	}

	return ( <>
		<div className={ styles.flashCardList }>
			{ set != null && set.cards.map((card, i) => (
				<FlashCard
					front={{ lang: set.langFront, text: card.front }}
					back={{ lang: set.langBack, text: card.back }}
					starred={ card.starred }
					onToggleStar={ () => toggleStar(i) }
					key={ i } />
			)) }
		</div>

		<Popup visible={ loadSetError != null } title='Error loading set'>
			<Heading size={ 1 } colour='#CBD1DC' text={ loadSetError! } />
		</Popup>
	</> )
}