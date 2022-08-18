import React, { useEffect } from 'react'
import { navigate, PageProps } from 'gatsby'
import Heading from '../components/Heading'
import FlashCardList from '../components/FlashCardList'
import ClickDetector from '../components/ClickDetector'
import BackIcon from '../icons/back.svg'
import SvgIcon from '../components/SvgIcon'
import { Helmet } from 'react-helmet'

export default (props: PageProps) =>
{
	const searchParams = new URLSearchParams(props.location.search)
	const setName = searchParams.get('set')
	const collectionName = searchParams.get('collection')

	useEffect(() =>
	{
		if (setName == null && collectionName == null)
		{
			navigate('/sets')
		}
	}, [])

	const backUrl = setName != null
		? `/set?name=${ setName }`
		: `/collection?name=${ collectionName }`

	const title = setName != null ? setName : collectionName!

	return ( <>
		<Helmet>
			<title>Flashcards | { title } | Flashcards</title>
		</Helmet>

		<Heading text='Flashcards' leadingIcon={
			<ClickDetector onClick={ () => navigate(backUrl) }>
				<SvgIcon Icon={ BackIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} />

		{ setName != null &&
			<FlashCardList setName={ setName } />
		}

		{ collectionName != null &&
			<FlashCardList collectionName={ collectionName } />
		}
	</> )
}