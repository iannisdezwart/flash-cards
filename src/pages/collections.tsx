import React from 'react'
import './global.sass'
import { Helmet } from 'react-helmet'
import CollectionList from '../components/CollectionList'
import BackIcon from '../icons/back.svg'
import Heading from '../components/Heading'
import ClickDetector from '../components/ClickDetector'
import SvgIcon from '../components/SvgIcon'
import PlusIcon from '../icons/plus.svg'
import { navigate } from 'gatsby'

export default () => {
	const addCollection = () =>
	{
		navigate('/new-collection/')
	}

	return ( <>
		<Helmet>
			<title>Collections | Flashcards</title>
		</Helmet>

		<Heading text='Collections'
			leadingIcon={
				<ClickDetector onClick={ () => navigate('/home/') }>
					<SvgIcon Icon={ BackIcon } width={ 32 } height={ 32 } />
				</ClickDetector>
			}
			trailingIcon={
				<ClickDetector onClick={ addCollection }>
					<SvgIcon Icon={ PlusIcon } width={ 32 } height={ 32 } />
				</ClickDetector>
			}
		/>

		<CollectionList />
	</> )
}