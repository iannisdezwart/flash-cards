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
			const set = await api.sets.get(props.setName)

			setSet({
				cards: set.cards,
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

	return ( <>
		<div className={ styles.flashCardList }>
			{ set != null && set.cards.map((card, i) => (
				<FlashCard
					front={{ lang: set.langFront, text: card.front }}
					back={{ lang: set.langBack, text: card.back }}
					key={ i } />
			)) }
		</div>

		<Popup visible={ loadSetError != null } title='Error loading set'>
			<Heading size={ 1 } colour='#CBD1DC' text={ loadSetError! } />
		</Popup>
	</> )
}