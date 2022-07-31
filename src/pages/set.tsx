import React from 'react'
import { navigate, PageProps } from 'gatsby'
import Heading from '../components/Heading'
import ActionListItem from '../components/ActionListItem'
import ActionList from '../components/ActionList'
import FlashCardsIcon from '../icons/flashcards.svg'
import LearnIcon from '../icons/learn.svg'
import TestIcon from '../icons/test.svg'
import WordList from '../components/WordList'
import Padding from '../components/Padding'
import ClickDetector from '../components/ClickDetector'
import BackIcon from '../icons/back.svg'
import SvgIcon from '../components/SvgIcon'
import { FlashCardSetProps } from '../components/FlashCardSet'

export default (props: PageProps) =>
{
	const set = props.location.state as FlashCardSetProps

	const navigateToFlashcards = () =>
	{
		navigate('/flashcards', {
			state: set
		})
	}

	const navigateToLearn = () =>
	{
		navigate('/learn', {
			state: set
		})
	}

	const navigateToTest = () =>
	{
		navigate('/test', {
			state: set
		})
	}

	return (<>
		<Heading text={ set.name } leadingIcon={
			<ClickDetector onClick={ () => navigate(-1) }>
				<SvgIcon Icon={ BackIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} />

		<ActionList>
			<ActionListItem icon={ FlashCardsIcon } text='Flashcards' action={ navigateToFlashcards } />
			<ActionListItem icon={ LearnIcon } text='Learn' action={ navigateToLearn } />
			<ActionListItem icon={ TestIcon } text='Test' action={ navigateToTest } />
		</ActionList>

		<Padding vertical={ 32 }/>

		<WordList langFront={ set.langFront } langBack={ set.langBack } words={ set.cards.map(card => ({
			front: card.front,
			back: card.back,
			new: false
		})) } />
	</>)
}