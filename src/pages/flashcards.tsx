import React from 'react'
import { navigate, PageProps } from 'gatsby'
import Heading from '../components/Heading'
import FlashCardList from '../components/FlashCardList'
import ClickDetector from '../components/ClickDetector'
import BackIcon from '../icons/back.svg'
import SvgIcon from '../components/SvgIcon'
import { Helmet } from 'react-helmet'

export default (props: PageProps) =>
{
	const setName = new URLSearchParams(props.location.search).get('set')

	if (setName == null)
	{
		navigate('/sets')
		return null
	}

	return (<>
		<Helmet>
			<title>Flashcards | { setName } | Flashcards</title>
		</Helmet>

		<Heading text='Flashcards' leadingIcon={
			<ClickDetector onClick={ () => navigate(`/set?name=${ setName }`) }>
				<SvgIcon Icon={ BackIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} />
		<FlashCardList setName={ setName } />
	</>)
}