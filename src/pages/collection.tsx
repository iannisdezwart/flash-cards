import React, { useEffect } from 'react'
import { navigate, PageProps } from 'gatsby'
import Heading from '../components/Heading'
import Padding from '../components/Padding'
import ClickDetector from '../components/ClickDetector'
import BackIcon from '../icons/back.svg'
import SvgIcon from '../components/SvgIcon'
import { Helmet } from 'react-helmet'
import SetList from '../components/SetList'
import PlusIcon from '../icons/plus.svg'
import Popup from '../components/Popup'
import SelectableSetList from '../components/SelectableSetList'
import api from '../api'
import { useUpdateLabel } from '../hooks/update-label'

export default (props: PageProps) =>
{
	const [ showAddSet, setShowAddSet ] = React.useState(false)
	const updateLabel = useUpdateLabel()

	const collectionName = new URLSearchParams(props.location.search).get('name')

	useEffect(() =>
	{
		if (collectionName == null)
		{
			navigate('/collections')
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

	return ( <>
		<Helmet>
			<title>{ collectionName } | Flashcards</title>
		</Helmet>

		<Heading text={ collectionName } leadingIcon={
			<ClickDetector onClick={ () => navigate('/collections') }>
				<SvgIcon Icon={ BackIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} trailingIcon={
			<ClickDetector onClick={ addSet }>
				<SvgIcon Icon={ PlusIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} />

		<Padding vertical={ 32 }/>

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