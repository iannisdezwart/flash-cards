import { navigate } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import ActionList from '../components/ActionList'
import ActionListItem from '../components/ActionListItem'
import Button from '../components/Button'
import Heading from '../components/Heading'
import VerticalFlexbox from '../components/VerticalFlexbox'
import SetsIcon from '../icons/sets.svg'
import CollectionsIcon from '../icons/collections.svg'
import { LocalStorage } from '../util/storage'

export default () =>
{
	const logOut = () =>
	{
		LocalStorage.remove('api-token')
		navigate('/')
	}

	return ( <>
		<Helmet>
			<title>Home | Flashcards</title>
		</Helmet>

		<VerticalFlexbox>
			<Heading text='Flash cards' />

			<ActionList>
				<ActionListItem size='big' icon={ SetsIcon } text='Sets' action={ () => navigate('/sets') } />
				<ActionListItem size='big' icon={ CollectionsIcon } text='Collections' action={ () => navigate('/collections') } />
			</ActionList>

			<Button text='Log out' fgColour='#FFFFFF' bgColour='#EC7272' onClick={ logOut } />
		</VerticalFlexbox>
	</> )
}