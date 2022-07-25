import React from 'react'
import { navigate, PageProps } from 'gatsby'
import Heading from '../components/Heading'
import FlashCardList from '../components/FlashCardList'
import ClickDetector from '../components/ClickDetector'
import BackIcon from '../icons/back.svg'
import SvgIcon from '../components/SvgIcon'
import { FlashCardSetProps } from '../components/FlashCardSet'

export default (props: PageProps) =>
{
	const set = props.location.state as FlashCardSetProps

	return (<>
		<Heading text='Flashcards' leadingIcon={
			<ClickDetector onClick={ () => navigate(-1) }>
				<SvgIcon Icon={ BackIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} />
		<FlashCardList set={ set } />
	</>)
}