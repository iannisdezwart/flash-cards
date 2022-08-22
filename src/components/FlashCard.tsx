import React, { useState } from 'react'
import SpeakerIcon from '../icons/speaker.svg'
import StarIcon from '../icons/star.svg'
import ActiveStarIcon from '../icons/star-active.svg'
import InfoIcon from '../icons/info.svg'
import { Lang } from '../util/langs'
import * as styles from './FlashCard.module.sass'
import { speak } from '../util/speak'

interface FlashCardContent
{
	lang: Lang
	text: string
}

export interface FlashCardProps
{
	front: FlashCardContent
	back: FlashCardContent
	starred: boolean
	details?: React.ReactNode
	onToggleStar: () => void
}

export default (props: FlashCardProps) =>
{
	const [ isFlipped, setFlipped ] = useState(false)

	const flipCard = () =>
	{
		setFlipped(!isFlipped)
	}

	const getLang = () =>
	{
		if (isFlipped)
		{
			return props.back.lang
		}

		return props.front.lang
	}

	const getText = () =>
	{
		if (isFlipped)
		{
			return props.back.text
		}

		return props.front.text
	}

	const handleSpeak = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
	{
		e.stopPropagation()
		speak({
			lang: getLang(),
			text: getText()
		})
	}

	const star = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
	{
		e.stopPropagation()
		props.onToggleStar()
	}

	return (
		<div className={ `${ styles.flashCard } ${ isFlipped ? styles.flipped : '' }` } onClick={ flipCard }>
			<div className={ styles.content }>
				<div className={ styles.front }>
					{ props.starred
						? <ActiveStarIcon className={ styles.button } width='24' height='24' onClick={ star } />
						: <StarIcon className={ styles.button } width='24' height='24' onClick={ star } /> }
					<p className={ styles.cardText }>{ props.front.text }</p>
					<SpeakerIcon className={ styles.button } width='24' height='24' onClick={ handleSpeak } />
					{ props.details &&
						<div className={ styles.details }>
							<InfoIcon />
							<div className={ styles.inner }>
								{ props.details }
							</div>
						</div>
					}
				</div>

				<div className={ styles.back }>
					{ props.starred
						? <ActiveStarIcon className={ styles.button } width='24' height='24' onClick={ star } />
						: <StarIcon className={ styles.button } width='24' height='24' onClick={ star } /> }
					<p className={ styles.cardText }>{ props.back.text }</p>
					<SpeakerIcon className={ styles.button } width='24' height='24' onClick={ handleSpeak } />
					{ props.details &&
						<div className={ styles.details }>
							<InfoIcon />
							<div className={ styles.inner }>
								{ props.details }
							</div>
						</div>
					}
				</div>
			</div>
		</div>
	)
}