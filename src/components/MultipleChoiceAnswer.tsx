import React, { useEffect, useRef, useState } from 'react'
import { Lang } from '../util/langs'
import Paragraph from './Paragraph'
import * as styles from './MultipleChoiceAnswer.module.sass'
import { classNames } from '../util/class-names'

interface MultipleChoiceAnswerProps
{
	choices: string[]
	answerLang: Lang
	correctAnswer?: string
	isCorrect?: boolean
	onAnswer: (answer: string) => void
}

export default (props: MultipleChoiceAnswerProps) =>
{
	const [ selectedAnswer, setSelectedAnswer ] = useState<string>()

	const onAnswer = (choice: string) =>
	{
		if (props.correctAnswer != null)
		{
			return
		}

		setSelectedAnswer(choice)
		props.onAnswer(choice)
	}

	const keypressHandler = (e: KeyboardEvent) =>
	{
		if ((e.code.match(/^Digit[0-4]$/)) && props.correctAnswer == null)
		{
			onAnswer(props.choices[+e.code.slice(5) - 1])
		}
	}

	const keypressHandlerRef = useRef(keypressHandler)

	useEffect(() => { keypressHandlerRef.current = keypressHandler })

	useEffect(() =>
	{
		const cb = (e: KeyboardEvent) => keypressHandlerRef.current(e)
		addEventListener('keyup', cb)
		return () => removeEventListener('keyup', cb)
	}, [ keypressHandler ])

	return ( <>
		<Paragraph size={ 1.25 } colour='#67696C' align='center' text={ `Select the correct ${ props.answerLang.name } word` } />

		{ props.choices.map((choice, i) => (
			<div key={ i }
				className={ classNames({
					[styles.mcChoice]: true,
					[styles.correct]: props.correctAnswer != null && choice == props.correctAnswer,
					[styles.incorrect]: choice == selectedAnswer && props.correctAnswer != null
						&& props.correctAnswer != choice
				}) }
				onClick={ () => onAnswer(choice) }
			>
				<div className={ styles.key }>{ i + 1 }</div>
				<div>{ choice }</div>
			</div>
		)) }
	</> )
}