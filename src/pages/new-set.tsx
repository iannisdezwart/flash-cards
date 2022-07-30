import React, { createRef, useState } from 'react'
import { navigate, PageProps } from 'gatsby'
import Heading from '../components/Heading'
import WordList from '../components/WordList'
import Padding from '../components/Padding'
import ClickDetector from '../components/ClickDetector'
import BackIcon from '../icons/back.svg'
import SvgIcon from '../components/SvgIcon'
import { FlashCardSetProps } from '../components/FlashCardSet'
import Popup from '../components/Popup'
import Button from '../components/Button'
import LangPicker from '../components/LangPicker'
import HorizontalFlexbox from '../components/HorizontalFlexbox'

export default () =>
{
	const [ backClicked, setBackClicked ] = useState(false)

	const setNameRef = createRef<HTMLInputElement>()

	const back = () =>
	{
		setBackClicked(true)
	}

	const onLangsPicked = (langFrom: string, langTo: string) =>
	{
		
	}

	return (<>
		<Heading text='New set' leadingIcon={
			<ClickDetector onClick={ back }>
				<SvgIcon Icon={ BackIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} />

		<input ref={ setNameRef } className='big-input' type='text' placeholder='Set name' />

		<Padding vertical={ 16 } />

		<LangPicker onChange={ onLangsPicked } />

		<Padding vertical={ 32 }/>

		<WordList words={ [{
			front: '',
			back: '',
			new: true
		}] } />

		<Popup visible={ backClicked } title='Are you sure?'>
			<Heading text='If you go back, the new set will not be saved.' size={ 1 } colour='#CBD1DC' />
			<HorizontalFlexbox>
				<Button bgColour='#88AD64' fgColour='#fff' text='Cancel' onClick={ () => setBackClicked(false) }></Button>
				<Button bgColour='#EC7272' fgColour='#fff' text='Discard set' onClick={ () => navigate(-1) }></Button>
			</HorizontalFlexbox>
		</Popup>
	</>)
}