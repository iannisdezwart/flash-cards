import React from 'react'
import { navigate, PageProps } from 'gatsby'
import { FlashCardSetProps } from '../components/FlashCardSet'
import Heading from '../components/Heading'
import ActionListItem from '../components/ActionListItem'
import ActionList from '../components/ActionList'
import FlashCardsIcon from '../icons/flashcards.svg'
import LearnIcon from '../icons/learn.svg'
import TestIcon from '../icons/test.svg'
import WordList from '../components/WordList'
import PlusIcon from '../icons/plus.svg'
import Padding from '../components/Padding'
import ClickDetector from '../components/ClickDetector'

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

	const addWord = () =>
	{
		console.log('add word')
	}

	return (<>
		<Heading text={ set.name } />

		<ActionList>
			<ActionListItem icon={ FlashCardsIcon } text='Flashcards' action={ navigateToFlashcards } />
			<ActionListItem icon={ LearnIcon } text='Learn' action={ navigateToLearn } />
			<ActionListItem icon={ TestIcon } text='Test' action={ navigateToTest } />
		</ActionList>

		<Padding vertical={ 32 }/>

		<Heading text='Words' size={ 2 } trailingIcon={ <>
			<ClickDetector onClick={ addWord }>
				<PlusIcon />
			</ClickDetector>
		</> } />
		<WordList cards={ set.cards } />
	</>)
}