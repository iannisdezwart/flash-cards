import React, { useEffect, useState } from 'react'
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
import EditIcon from '../icons/edit-blue.svg'
import SvgIcon from '../components/SvgIcon'
import { Lang } from '../util/langs'
import { Helmet } from 'react-helmet'
import api from '../api'

export default (props: PageProps) =>
{
	const setName = new URLSearchParams(props.location.search).get('name')

	useEffect(() =>
	{
		if (setName == null)
		{
			navigate('/sets')
		}
	})

	if (setName == null)
	{
		return null
	}

	const [ langFront, setLangFront ] = useState<Lang>(Lang.unknown)
	const [ langBack, setLangBack ] = useState<Lang>(Lang.unknown)
	const [ titleIsBeingEdited, setTitleIsBeingEdited ] = useState(false)

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
		setLangFront(setProps.langFront)
		setLangBack(setProps.langBack)
	}

	const onTitleEdit = async (title: string) =>
	{
		setTitleIsBeingEdited(false)

		if (title == setName)
		{
			return
		}

		await api.sets.rename(setName, title)

		navigate(`/set?name=${ title }`)
	}

	return ( <>
		<Helmet>
			<title>{ setName } | Flashcards</title>
		</Helmet>

		<Heading text={ setName } leadingIcon={
			<ClickDetector onClick={ () => navigate('/sets') }>
				<SvgIcon Icon={ BackIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} trailingIcon={
			<ClickDetector onClick={ () => setTitleIsBeingEdited(true) }>
				<SvgIcon Icon={ EditIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} isBeingEdited={ titleIsBeingEdited } onEditSubmit={ onTitleEdit } />

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