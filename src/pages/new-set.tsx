import React, { createRef, useState } from 'react'
import { navigate } from 'gatsby'
import Heading from '../components/Heading'
import WordList from '../components/WordList'
import Padding from '../components/Padding'
import ClickDetector from '../components/ClickDetector'
import BackIcon from '../icons/back.svg'
import CheckIcon from '../icons/check.svg'
import SvgIcon from '../components/SvgIcon'
import Popup from '../components/Popup'
import Button from '../components/Button'
import LangPicker from '../components/LangPicker'
import HorizontalFlexbox from '../components/HorizontalFlexbox'
import { Lang } from '../util/langs'
import FloatingButton from '../components/FloatingButton'
import api from '../api'

export default () =>
{
	const [ backClicked, setBackClicked ] = useState(false)
	const [ langFront, setlangFront ] = useState(Lang.unknown)
	const [ langBack, setlangBack ] = useState(Lang.unknown)
	const [ saveErr, setSaveErr ] = useState<string>()
	const [ words, setWords ] = useState([ { front: '', back: '' } ])

	const setNameRef = createRef<HTMLInputElement>()

	const back = () =>
	{
		setBackClicked(true)
	}

	const onLangsPicked = (langFront: Lang, langBack: Lang) =>
	{
		setlangFront(langFront)
		setlangBack(langBack)
	}

	const saveSet = async () =>
	{
		const apiToken = localStorage.getItem('api-token')

		if (apiToken == null)
		{
			// TODO: Save state somehow.
			navigate('/')
			return
		}

		try
		{
			await api.sets.new({
				name: setNameRef.current!.value,
				localeFront: langFront.locale,
				localeBack: langBack.locale,
				cards: words
			})
			navigate('/sets')
		}
		catch (err)
		{
			setSaveErr(err as string)
		}
	}

	const wordsChanged = (words: { front: string, back: string }[]) =>
	{
		setWords(words)
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

		<WordList langFront={ langFront } langBack={ langBack } onChange={ wordsChanged } words={ [{
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

		<Popup visible={ saveErr != null } title='Error'>
			<Heading text={ saveErr! } size={ 1 } colour='#CBD1DC' />
		</Popup>

		<FloatingButton Icon={ CheckIcon } colour='#88AD64' onClick={ saveSet } />
	</>)
}