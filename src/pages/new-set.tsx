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
import { Helmet } from 'react-helmet'
import Paragraph from '../components/Paragraph'
import VerticalFlexbox from '../components/VerticalFlexbox'
import { LocalStorage } from '../util/storage'

export default () =>
{
	const [ backClicked, setBackClicked ] = useState(false)
	const [ langFront, setLangFront ] = useState(Lang.unknown)
	const [ langBack, setLangBack ] = useState(Lang.unknown)
	const [ saveErr, setSaveErr ] = useState<string>()
	const [ words, setWords ] = useState([ { front: '', back: '' } ])

	const setNameRef = createRef<HTMLInputElement>()

	const back = () =>
	{
		setBackClicked(true)
	}

	const onLangsPicked = (langFront: Lang, langBack: Lang) =>
	{
		setLangFront(langFront)
		setLangBack(langBack)
	}

	const saveSet = async () =>
	{
		const apiToken = LocalStorage.get('api-token')

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
		<Helmet>
			<title>New Set | Flashcards</title>
		</Helmet>

		<Heading text='New set' leadingIcon={
			<ClickDetector onClick={ back }>
				<SvgIcon Icon={ BackIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} />

		<VerticalFlexbox>
			<input ref={ setNameRef } className='big-input' type='text' placeholder='Set name' />
		</VerticalFlexbox>

		<Padding vertical={ 16 } />

		<LangPicker onChange={ onLangsPicked } />

		<Padding vertical={ 32 }/>

		<WordList synchroniseWithServer={ false }
			setName=''
			langFront={ langFront }
			langBack={ langBack }
			onChange={ wordsChanged }
			words={ [{
				front: '',
				back: '',
				new: true,
				starred: false
			}] }
		/>

		<Popup
			visible={ backClicked }
			onClose={ () => navigate('/sets') }
			title='Are you sure?'
		>
			<Paragraph colour='#CBD1DC' align='center' text='If you go back, the new set will not be saved.' />
			<HorizontalFlexbox>
				<Button bgColour='#88AD64' fgColour='#fff' text='Cancel' onClick={ () => setBackClicked(false) }></Button>
				<Button bgColour='#EC7272' fgColour='#fff' text='Discard set' onClick={ () => navigate('/sets') }></Button>
			</HorizontalFlexbox>
		</Popup>

		<Popup
			visible={ saveErr != null }
			onClose={ () => setSaveErr(undefined) }
			title='Error'
		>
			<Paragraph colour='#CBD1DC' align='center' text={ saveErr! } />
		</Popup>

		<FloatingButton Icon={ CheckIcon } colour='#88AD64' onClick={ saveSet } />
	</>)
}