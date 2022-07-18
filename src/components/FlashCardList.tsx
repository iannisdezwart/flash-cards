import React from 'react'
import FlashCard, { FlashCardProps } from './FlashCard'
import * as styles from './FlashCardList.module.sass'

interface FlashCardListProps
{
	cards: FlashCardProps[]
}

export default (props: FlashCardListProps) => (
	<div className={ styles.flashCardList }>
		{ props.cards.map((card, i) => (
			<FlashCard
				front={ card.front }
				back={ card.back }
				key={ i } />
		)) }
	</div>
)