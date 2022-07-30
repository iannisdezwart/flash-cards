import React, { useState } from 'react'
import Flag from './Flag'
import HorizontalFlexbox from './HorizontalFlexbox'
import SvgIcon from './SvgIcon'
import ArrowRightIcon from '../icons/arrow-right.svg'
import ClickDetector from './ClickDetector'
import Popup from './Popup'
import Padding from './Padding'
import { langs } from '../util/langs'

interface LangPickerProps
{
	onChange: (langFrom: string, langTo: string) => void
}

export default (props: LangPickerProps) =>
{
	const [ langBeingEdited, setLangBeingEdited ] = useState<'from' | 'to'>()
	const [ langFrom, setLangFrom ] = useState('XX')
	const [ langTo, setLangTo ] = useState('XX')

	const chooseLang = () =>
	{
		// langSetter()
		props.onChange(langFrom, langTo)
		setLangBeingEdited(undefined)
	}

	const chooseLangFrom = () => setLangBeingEdited('from')
	const chooseLangTo = () => setLangBeingEdited('to')

	return (
		<HorizontalFlexbox>
			<ClickDetector onClick={ chooseLangFrom }>
				<Flag lang={ langFrom } size={ 1.5 } />
			</ClickDetector>

			<Padding horizontal={ 32 } />
			<SvgIcon Icon={ ArrowRightIcon } height={ 32 } />
			<Padding horizontal={ 32 } />

			<ClickDetector onClick={ chooseLangTo }>
				<Flag lang={ langTo } size={ 1.5 } />
			</ClickDetector>

			<Popup title='Choose language' visible={ langBeingEdited != null }>
				<ScrollableList height={  }>
					{ langs.map(lang => ) }
				</ScrollableList>
			</Popup>
		</HorizontalFlexbox>
	)
}