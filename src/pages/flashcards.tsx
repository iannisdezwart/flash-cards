import React from 'react'
import { PageProps } from 'gatsby'
import { FlashCardSetProps } from '../components/FlashCardSet'
import Heading from '../components/Heading'
import FlashCardList from '../components/FlashCardList'

export default (props: PageProps) =>
{
	const set = props.location.state as FlashCardSetProps

	return (<>
		<Heading text='Flashcards' />
		<FlashCardList cards={ set.cards } />
	</>)
}