import React, { createRef, useState } from 'react'
import { navigate } from 'gatsby'
import Heading from '../components/Heading'
import Padding from '../components/Padding'
import ClickDetector from '../components/ClickDetector'
import BackIcon from '../icons/back.svg'
import CheckIcon from '../icons/check.svg'
import SvgIcon from '../components/SvgIcon'
import Popup from '../components/Popup'
import LangPicker from '../components/LangPicker'
import { Lang } from '../util/langs'
import FloatingButton from '../components/FloatingButton'
import api from '../api'
import { Helmet } from 'react-helmet'
import Paragraph from '../components/Paragraph'
import VerticalFlexbox from '../components/VerticalFlexbox'
import { LocalStorage } from '../util/storage'

export default () =>
{
	const [ langFront, setLangFront ] = useState(Lang.unknown)
	const [ langBack, setLangBack ] = useState(Lang.unknown)
	const [ saveErr, setSaveErr ] = useState<string>()

	const setNameRef = createRef<HTMLInputElement>()

	const onLangsPicked = (langFront: Lang, langBack: Lang) =>
	{
		setLangFront(langFront)
		setLangBack(langBack)
	}

	const saveCollection = async () =>
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
			await api.collections.new({
				collectionName: setNameRef.current!.value,
				localeFront: langFront.locale,
				localeBack: langBack.locale
			})
			navigate('/collections/')
		}
		catch (err)
		{
			setSaveErr(err as string)
		}
	}

	return (<>
		<Helmet>
			<title>New Collection | Flashcards</title>
		</Helmet>

		<Heading text='New collection' leadingIcon={
			<ClickDetector onClick={ () => navigate('/collections/') }>
				<SvgIcon Icon={ BackIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} />

		<VerticalFlexbox>
			<input ref={ setNameRef } className='big-input' type='text' placeholder='Collection name' />
		</VerticalFlexbox>

		<Padding vertical={ 16 } />

		<LangPicker onChange={ onLangsPicked } />

		<Padding vertical={ 32 }/>

		<Popup
			visible={ saveErr != null }
			title='Error'
			onClose={ () => setSaveErr(undefined) }
		>
			<Paragraph colour='#CBD1DC' align='center' text={ saveErr! } />
		</Popup>

		<FloatingButton Icon={ CheckIcon } colour='#88AD64' onClick={ saveCollection } />
	</>)
}