import React, { createRef, useEffect, useState } from 'react'
import { Lang } from '../util/langs'
import Paragraph from './Paragraph'
import SubmitIcon from '../icons/arrow-right-light-green.svg'
import * as styles from './FillInTheBlankAnswer.module.sass'
import { classNames } from '../util/class-names'
import VerticalFlexbox from './VerticalFlexbox'

interface MultipleChoiceAnswerProps
{
	answerLang: Lang
	correctAnswer?: string
	isCorrect?: boolean
	onAnswer: (answer: string) => void
}

export default (props: MultipleChoiceAnswerProps) =>
{
	const inputRef = createRef<HTMLInputElement>()

	const onAnswer = () =>
	{
		if (props.correctAnswer != null)
		{
			return
		}

		props.onAnswer(inputRef.current!.value)
		inputRef.current!.readOnly = true
	}

	const enterSubmitsAnswer = (e: React.KeyboardEvent) =>
	{
		if (e.code == 'Enter' && props.correctAnswer == null)
		{
			onAnswer()
			e.stopPropagation()
		}
	}

	useEffect(() =>
	{
		inputRef.current?.focus()
	})

	return ( <>
		<Paragraph size={ 1.25 } colour='#67696C' align='center' text={ `Type the word in ${ props.answerLang.name }` } />

		<div className={ styles.fillInTheBlank }>
			<input
				type='text'
				ref={ inputRef }
				className={ classNames({
					'big-input': true,
					[styles.correct]: props.isCorrect != null && props.isCorrect,
					[styles.incorrect]: props.isCorrect != null && !props.isCorrect
				}) }
				placeholder={ `Enter ${ props.answerLang.name }` }
				onKeyDown={ enterSubmitsAnswer }
			/>

			<div className={ styles.floatingIcon }
				style={{ backgroundColor: '#88AD64' }}
				onMouseUp={ onAnswer }
			>
				<SubmitIcon />
			</div>
		</div>

		{ props.correctAnswer != null &&
			<VerticalFlexbox>
				<p style={{ color: '#67696C' }}>
					<span style={{ fontWeight: 600 }}>Correct answer</span>:
					&nbsp;
					<span style={{ color: '#88AD64' }}>{ props.correctAnswer }</span>
				</p>
			</VerticalFlexbox>
		}
	</> )
}