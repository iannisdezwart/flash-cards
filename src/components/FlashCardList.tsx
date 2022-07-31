import React from 'react'
import FlashCard from './FlashCard'
import * as styles from './FlashCardList.module.sass'
import { FlashCardSetProps } from './FlashCardSet'

interface FlashCardListProps
{
	set: FlashCardSetProps
}

export default (props: FlashCardListProps) => (
	<div className={ styles.flashCardList }>
		{ props.set.cards.map((card, i) => (
			<FlashCard
				front={{ lang: props.set.langFront, text: card.front }}
				back={{ lang: props.set.langBack, text: card.back }}
				key={ i } />
		)) }
	</div>
)