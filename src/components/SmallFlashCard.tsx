import React from 'react'
import { Lang } from '../util/langs'
import ActiveStarIcon from '../icons/star-active.svg'
import StarIcon from '../icons/star.svg'
import SpeakerIcon from '../icons/speaker.svg'
import { speak } from '../util/speak'
import * as styles from './SmallFlashCard.module.sass'
import { TtsGender } from '../api/tts/speak'

interface SmallFlashcardProps
{
	text: string
	lang: Lang
	ttsGender: TtsGender
	starred: boolean
	onToggleStar: () => void
}

export default (props: SmallFlashcardProps) =>
{
	const handleSpeak = async () =>
	{
		speak({
			lang: props.lang,
			text: props.text,
			gender: props.ttsGender
		})
	}

	return (
		<div className={ styles.smallFlashcard }>
			{ props.starred
				? <ActiveStarIcon className={ styles.button } width='24' height='24' onClick={ props.onToggleStar } />
				: <StarIcon className={ styles.button } width='24' height='24' onClick={ props.onToggleStar } /> }
			<p>{ props.text }</p>
			<SpeakerIcon className={ styles.button } width='24' height='24' onClick={ handleSpeak } />
		</div>
	)
}