import React, { createRef, useState } from 'react'
import Flag from './Flag'
import HorizontalFlexbox from './HorizontalFlexbox'
import SvgIcon from './SvgIcon'
import ArrowRightIcon from '../icons/arrow-right.svg'
import ClickDetector from './ClickDetector'
import Popup from './Popup'
import Padding from './Padding'
import { Lang } from '../util/langs'
import ScrollableList from './ScrollableList'
import Heading from './Heading'

interface LangPickerProps
{
	onChange: (langFront: Lang, langBack: Lang) => void
}

export default (props: LangPickerProps) =>
{
	const [ langBeingEdited, setLangBeingEdited ] = useState<'from' | 'to'>()
	const [ langFront, setlangFront ] = useState(Lang.unknown)
	const [ langBack, setlangBack ] = useState(Lang.unknown)
	const [ pickableLangs, setPickableLangs ] = useState<Lang[]>(Lang.all)

	const pickerSearchRef = createRef<HTMLInputElement>()

	const chooseLang = (lang: Lang) =>
	{
		switch (langBeingEdited)
		{
			case 'from':
				setlangFront(lang)
				props.onChange(lang, langBack)
				break

			case 'to':
				setlangBack(lang)
				props.onChange(langFront, lang)
				break
		}

		setLangBeingEdited(undefined)
	}

	const chooselangFront = () => setLangBeingEdited('from')
	const chooselangBack = () => setLangBeingEdited('to')

	const updatePickerSearch = () =>
	{
		const input = pickerSearchRef.current!.value

		setPickableLangs(Lang.all.filter(lang => lang.name.toLowerCase().includes(input.toLowerCase())))
	}

	return (
		<HorizontalFlexbox>
			<ClickDetector onClick={ chooselangFront }>
				<Flag locale={ langFront.locale } size={ 1.5 } />
			</ClickDetector>

			<Padding horizontal={ 32 } />
			<SvgIcon Icon={ ArrowRightIcon } height={ 32 } />
			<Padding horizontal={ 32 } />

			<ClickDetector onClick={ chooselangBack }>
				<Flag locale={ langBack.locale } size={ 1.5 } />
			</ClickDetector>

			<Popup title='Choose language' visible={ langBeingEdited != null }>
				<input ref={ pickerSearchRef } className='full-width dark' placeholder='Search...' onChange={ updatePickerSearch } />
				<ScrollableList height='70vh' width='300px'>
					{ pickableLangs.map((lang, i) => (
						<HorizontalFlexbox key={ i } mainAxisAlignment={ 'flex-start' } fill={ true }>
							<ClickDetector onClick={ () => chooseLang(lang) }>
								<div style={{ flexShrink: 0 }}>
									<HorizontalFlexbox>
										<Flag locale={ lang.countryCode } size={ 1 } />
										<Padding horizontal={ 16 } />
									</HorizontalFlexbox>
								</div>
								<Heading text={ lang.fullName } size={ 1 } colour='#CBD1DC' align='start' />
							</ClickDetector>
						</HorizontalFlexbox>
					)) }
				</ScrollableList>
			</Popup>
		</HorizontalFlexbox>
	)
}