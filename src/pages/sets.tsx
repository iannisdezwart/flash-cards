import React from 'react'
import { navigate } from 'gatsby'
import Button from '../components/Button'
import FlashCardSetList from '../components/FlashCardSetList'
import './global.sass'

export default () => {
	const logOut = () =>
	{
		localStorage.removeItem('api-token')

		navigate('/')
	}

	return ( <>
		<FlashCardSetList />
		<Button text='Log out' fgColour='#FFFFFF' bgColour='#EC7272' onClick={ logOut } />
	</> )
}