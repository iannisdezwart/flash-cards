import React, { useEffect, useState } from 'react'
import { navigate, PageProps } from 'gatsby'
import Heading from '../components/Heading'
import Padding from '../components/Padding'
import ClickDetector from '../components/ClickDetector'
import BackIcon from '../icons/back.svg'
import SvgIcon from '../components/SvgIcon'
import { Helmet } from 'react-helmet'
import SetList from '../components/SetList'
import PlusIcon from '../icons/plus.svg'
import EditIcon from '../icons/edit-blue.svg'
import Popup from '../components/Popup'
import SelectableSetList from '../components/SelectableSetList'
import api from '../api'
import { useUpdateLabel } from '../hooks/update-label'
import ActionList from '../components/ActionList'
import ActionListItem from '../components/ActionListItem'
import FlashCardsIcon from '../icons/flashcards.svg'
import LearnIcon from '../icons/learn.svg'
import TestIcon from '../icons/test.svg'

export default (props: PageProps) =>
{
	const [ showAddSet, setShowAddSet ] = useState(false)
	const [ titleIsBeingEdited, setTitleIsBeingEdited ] = useState(false)
	const updateLabel = useUpdateLabel()

	const collectionName = new URLSearchParams(props.location.search).get('name')

	useEffect(() =>
	{
		if (collectionName == null)
		{
			navigate('/collections/')
		}
	}, [])

	if (collectionName == null)
	{
		return null
	}

	const addSet = () =>
	{
		setShowAddSet(true)
	}

	const selectSetToAdd = async (setName: string) =>
	{
		await api.collections.addSet({
			collectionName,
			setName
		})

		setShowAddSet(false)
		updateLabel.update()
	}

	const onTitleEdit = async (title: string) =>
	{
		setTitleIsBeingEdited(false)

		if (title == collectionName)
		{
			return
		}

		await api.collections.rename({
			oldCollectionName: collectionName,
			newCollectionName: title
		})

		navigate(`/collection/?name=${ title }`)
	}

	const navigateToFlashcards = () =>
	{
		navigate(`/flashcards/?collection=${ collectionName }`)
	}

	const navigateToLearn = () =>
	{
		navigate(`/learn/?collection=${ collectionName }`)
	}

	const navigateToTest = () =>
	{
		navigate(`/test/?collection=${ collectionName }`)
	}

	return ( <>
		<Helmet>
			<title>{ collectionName } | Flashcards</title>
		</Helmet>

		<Heading text={ collectionName } leadingIcon={
			<ClickDetector onClick={ () => navigate('/collections/') }>
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

		<Heading text='Sets in collection' size={ 2 } trailingIcon={
			<ClickDetector onClick={ addSet }>
				<PlusIcon width={ 32 } height={ 32 } />
			</ClickDetector>
		} />

		<SetList ofCollection={ collectionName }
			onDelete={ updateLabel.update }
			updateLabel={ updateLabel }
			noSetsError={`This collection is empty. Tap the plus icon to add a set!`} />

		<Popup
			title='Add set'
			visible={ showAddSet }
			onClose={ () => setShowAddSet(false) }
		>
			<SelectableSetList updateLabel={ updateLabel } forCollection={ collectionName } onSelect={ selectSetToAdd } />
		</Popup>
	</> )
}