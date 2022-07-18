import React from 'react'
import { PageProps } from 'gatsby'
import { FlashCardSetProps } from '../components/FlashCardSet'
import Heading from '../components/Heading'
import ActionListItem from '../components/ActionListItem'
import ActionList from '../components/ActionList'
import FlashCardsIcon from '../icons/flashcards.svg'
import LearnIcon from '../icons/learn.svg'
import TestIcon from '../icons/test.svg'
import WordList from '../components/WordList'

export default (props: PageProps) =>
{
	const set = props.location.state as FlashCardSetProps

	return (<>
		<Heading text={ set.name } />

		<ActionList>
			<ActionListItem icon={ FlashCardsIcon } text='Flashcards' action='/flashcards' />
			<ActionListItem icon={ LearnIcon } text='Learn' action='/learn' />
			<ActionListItem icon={ TestIcon } text='Test' action='/test' />
		</ActionList>

		<Heading text='Words' size={ 2 } />
		<WordList cards={ set.cards } />
	</>)
}