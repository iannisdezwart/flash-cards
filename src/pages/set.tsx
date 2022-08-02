import React, { useState } from 'react'
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
import { Lang } from '../util/langs'

export default (props: PageProps) =>
{
	const setName = new URLSearchParams(props.location.search).get('name')

	if (setName == null)
	{
		navigate('/sets')
		return null
	}

	const [ langFront, setlangFront ] = useState<Lang>(Lang.unknown)
	const [ langBack, setlangBack ] = useState<Lang>(Lang.unknown)

	const navigateToFlashcards = () =>
	{
		navigate(`/flashcards?set=${ setName }`)
	}

	const navigateToLearn = () =>
	{
		navigate(`/learn?set=${ setName }`)
	}

	const navigateToTest = () =>
	{
		navigate(`/test?set=${ setName }`)
	}

	const onWordListLoad = (setProps: { langFront: Lang, langBack: Lang }) =>
	{
		setlangFront(setProps.langFront)
		setlangBack(setProps.langBack)
	}

	return ( <>
		<Heading text={ setName } leadingIcon={
			<ClickDetector onClick={ () => navigate('/sets') }>
				<SvgIcon Icon={ BackIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} />

		<ActionList>
			<ActionListItem icon={ FlashCardsIcon } text='Flashcards' action={ navigateToFlashcards } />
			<ActionListItem icon={ LearnIcon } text='Learn' action={ navigateToLearn } />
			<ActionListItem icon={ TestIcon } text='Test' action={ navigateToTest } />
		</ActionList>

		<Padding vertical={ 32 }/>

		<WordList synchroniseWithServer={ true }
			setName={ setName }
			langFront={ langFront }
			langBack={ langBack }
			words={ [] }
			onLoad={ onWordListLoad }
		/>
	</> )
}