import React, { useState } from 'react'
import api from '../api'
import Speaker from '../icons/speaker.svg'
import Star from '../icons/star.svg'
import { Lang } from '../util/langs'
import * as styles from './FlashCard.module.sass'

interface FlashCardContent
{
	lang: Lang
	text: string
}

export interface FlashCardProps
{
	front: FlashCardContent
	back: FlashCardContent
}

interface FlashCardState
{
	isFlipped: boolean
}

export default (props: FlashCardProps) =>
{
	const [ state, setState ] = useState<FlashCardState>({
		isFlipped: false
	})

	const flipCard = () =>
	{
		setState({ isFlipped: !state.isFlipped })
	}

	const getLang = () =>
	{
		if (state.isFlipped)
		{
			return props.back.lang
		}

		return props.front.lang
	}

	const getText = () =>
	{
		if (state.isFlipped)
		{
			return props.back.text
		}

		return props.front.text
	}

	const speak = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
	{
		e.stopPropagation()

		try
		{
			const audioCtx = new AudioContext()
			const arrayBuffer = await api.tts.speak({
				text: getText(),
				locale: getLang().locale
			})

			audioCtx.decodeAudioData(arrayBuffer, audio =>
			{
				const audioBuf = audioCtx.createBufferSource()
				audioBuf.buffer = audio
				audioBuf.connect(audioCtx.destination)
				audioBuf.start()
			})
		}
		catch (err)
		{
			console.error('Error fetching audio', err)
		}
	}

	const star = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
	{
		e.stopPropagation()

		// TODO: Implement.
	}

	return (
		<div className={ `${ styles.flashCard } ${ state.isFlipped ? styles.flipped : '' }` } onClick={ flipCard }>
			<div className={ styles.content }>
				<div className={ styles.front }>
					<Star className={ styles.button } width='24' height='24' onClick={ star } />
					<p>{ props.front.text }</p>
					<Speaker className={ styles.button } width='24' height='24' onClick={ speak } />
				</div>

				<div className={ styles.back }>
					<Star className={ styles.button } width='24' height='24' onClick={ star } />
					<p>{ props.back.text }</p>
					<Speaker className={ styles.button } width='24' height='24' onClick={ speak } />
				</div>
			</div>
		</div>
	)
}