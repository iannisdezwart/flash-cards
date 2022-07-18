import React from 'react'
import { FlashCardProps } from './FlashCard'
import WordListItem from './WordListItem'
import * as styles from './WordList.module.sass'

interface WordListProps
{
	cards: FlashCardProps[]
}

export default (props: WordListProps) =>
{
	return (
		<div className={ styles.wordList }>
			{ props.cards.map((card, i) => (
				<WordListItem
					front={ card.front }
					back={ card.back }
					key={ i } />
			)) }
		</div>
	)
}