import React from 'react'
import { navigate } from 'gatsby'
import Button from '../components/Button'
import FlashCardSetList from '../components/FlashCardSetList'
import './global.sass'
import HorizontalFlexbox from '../components/HorizontalFlexbox'

export default () => {
	const logOut = () =>
	{
		localStorage.removeItem('api-token')
		navigate('/')
	}

	return ( <>
		<FlashCardSetList />
		<HorizontalFlexbox>
			<Button text='Log out' fgColour='#FFFFFF' bgColour='#EC7272' onClick={ logOut } />
		</HorizontalFlexbox>
	</> )
}