import React from 'react'
import { navigate } from 'gatsby'
import SetList from '../components/SetList'
import './global.sass'
import { Helmet } from 'react-helmet'
import Heading from '../components/Heading'
import ClickDetector from '../components/ClickDetector'
import SvgIcon from '../components/SvgIcon'
import PlusIcon from '../icons/plus.svg'
import BackIcon from '../icons/back.svg'

export default () => {
	const addSet = () =>
	{
		navigate('/new-set')
	}

	return ( <>
		<Helmet>
			<title>Sets | Flashcards</title>
		</Helmet>

		<Heading text='Sets'
			leadingIcon={
				<ClickDetector onClick={ () => navigate('/home/') }>
					<SvgIcon Icon={ BackIcon } width={ 32 } height={ 32 } />
				</ClickDetector>
			}
			trailingIcon={
				<ClickDetector onClick={ addSet }>
					<SvgIcon Icon={ PlusIcon } width={ 32 } height={ 32 } />
				</ClickDetector>
			}
		/>

		<SetList noSetsError={`You don't have any sets. Tap the plus icon to create your first set!`} />
	</> )
}