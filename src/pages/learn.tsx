import { navigate, PageProps } from 'gatsby'
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import api from '../api'
import Paragraph from '../components/Paragraph'
import { FillInTheBlankLearnItem, MultipleChoiceLearnItem, ResponseModel as LearnItem } from '../api/sets/cards/learn/get'
import FloatingButton from '../components/FloatingButton'
import ArrowRight from '../icons/arrow-right-light-green.svg'
import { Lang } from '../util/langs'
import SmallFlashcard from '../components/SmallFlashcard'
import MultipleChoiceAnswer from '../components/MultipleChoiceAnswer'
import FillInTheBlankAnswer from '../components/FillInTheBlankAnswer'
import Popup from '../components/Popup'
import Heading from '../components/Heading'
import ClickDetector from '../components/ClickDetector'
import SvgIcon from '../components/SvgIcon'
import BackIcon from '../icons/back.svg'
import Padding from '../components/Padding'
import VerticalFlexbox from '../components/VerticalFlexbox'
import BottomProgressBar from '../components/BottomProgressBar'

export default (props: PageProps) =>
{
	const setName = new URLSearchParams(props.location.search).get('set')

	if (setName == null)
	{
		navigate('/sets')
		return null
	}

	const [ langFront, setLangFront ] = useState<Lang>()
	const [ langBack, setLangBack ] = useState<Lang>()
	const [ learnItems, setLearnItems ] = useState<LearnItem[]>()
	const [ learnItemIndex, setLearnItemIndex ] = useState(0)
	const [ loadSetError, setLoadSetError ] = useState<string>()
	const [ questionAnswered, setQuestionAnswered ] = useState(false)
	const [ correctAnswer, setCorrectAnswer ] = useState<string>()
	const [ isCorrect, setCorrect ] = useState<boolean>()
	const [ learnDetails, setLearnDetails ] = useState<{
		knowledgeLevel: number
		knowledgeLevelDelta: number
		timesRevised: number
	}>()

	const loadLearnItems = async () =>
	{
		try
		{
			const [ set, learnItems ] = await Promise.all([
				api.sets.get(setName),
				api.sets.cards.learn.get(setName)
			])
			setLangFront(Lang.fromLocale(set.localeFront) || Lang.unknown)
			setLangBack(Lang.fromLocale(set.localeBack) || Lang.unknown)
			setLearnItems(learnItems)
		}
		catch (err)
		{
			setLoadSetError(err as string)
		}
	}

	useEffect(() => { loadLearnItems() }, [])

	const toggleStar = async (learnItem: LearnItem) =>
	{
		if (learnItems == null)
		{
			return
		}

		const newLearnItems = learnItems
			.slice()
			.map(item => item.cardId == learnItem.cardId ? { ...item, starred: !item.starred } : item)

		await api.sets.cards.setStarred({
			setName: setName,
			cardId: learnItem.cardId,
			starred: !learnItem.starred
		})

		setLearnItems(newLearnItems)
	}

	const generateMcQuestion = (learnItem: MultipleChoiceLearnItem) => ( <>
		<SmallFlashcard
			text={ learnItem.question }
			lang={ learnItem.direction == 'front' ? langFront! : langBack! }
			starred={ learnItem.starred }
			onToggleStar={ () => toggleStar(learnItem) }
		/>
		<Padding vertical={ 24 } />
		<MultipleChoiceAnswer
			key={ `${ learnItem.cardId }-${ learnItem.type }-${ learnItem.direction }` } choices={ learnItem.choices }
			answerLang={ learnItem.direction == 'front' ? langBack! : langFront! }
			correctAnswer={ correctAnswer }
			isCorrect={ isCorrect }
			onAnswer={ (answer) => sendAnswer(learnItem, answer) }
		/>
	</> )

	const generateFillInTheBlankQuestion = (learnItem: FillInTheBlankLearnItem) => ( <>
		<SmallFlashcard
			text={ learnItem.question }
			lang={ learnItem.direction == 'front' ? langFront! : langBack! }
			starred={ learnItem.starred }
			onToggleStar={ () => toggleStar(learnItem) }
		/>
		<Padding vertical={ 24 } />
		<FillInTheBlankAnswer
			key={ `${ learnItem.cardId }-${ learnItem.type }-${ learnItem.direction }` }
			answerLang={ learnItem.direction == 'front' ? langBack! : langFront! }
			correctAnswer={ correctAnswer }
			isCorrect={ isCorrect }
			onAnswer={ answer => sendAnswer(learnItem, answer) } />
	</> )

	const generateQuestion = (learnItem: LearnItem) =>
	{
		switch (learnItem.type)
		{
			case 'multiple-choice':
				return generateMcQuestion(learnItem)

			case 'fill-in-the-blank':
				return generateFillInTheBlankQuestion(learnItem)

			default:
				return null
		}
	}

	const sendAnswer = async (learnItem: LearnItem, answer: string) =>
	{
		setQuestionAnswered(true)

		const res = await api.sets.cards.learn.answer({
			setName,
			direction: learnItem.direction,
			cardId: learnItem.cardId,
			answer
		})

		setCorrect(res.correct)
		setCorrectAnswer(res.correctAnswer)
		setLearnDetails({
			knowledgeLevel: res.knowledgeLevel,
			knowledgeLevelDelta: res.knowledgeLevelDelta,
			timesRevised: res.timesRevised
		})
	}

	const nextQuestion = () =>
	{
		if (learnItemIndex == learnItems!.length - 1)
		{
			// TODO: Implement.
			console.log('done')
			return
		}

		setLearnItemIndex(learnItemIndex + 1)
		setQuestionAnswered(false)
		setCorrectAnswer(undefined)
		setCorrect(undefined)
		setLearnDetails(undefined)
	}

	const knowledgeColour = (knowledgeLevel: number) =>
	{
		if (knowledgeLevel < 3)
		{
			return '#EC7272'
		}

		if (knowledgeLevel < 7)
		{
			return '#F0B762'
		}

		return '#88AD64'
	}

	const enterContinues = (e: KeyboardEvent) =>
	{
		if ((e.code == 'Enter' || e.code == 'Space') && questionAnswered)
		{
			nextQuestion()
		}
	}

	const enterContinuesRef = useRef(enterContinues)

	useEffect(() => { enterContinuesRef.current = enterContinues })

	useEffect(() =>
	{
		const cb = (e: KeyboardEvent) => enterContinuesRef.current(e)
		addEventListener('keyup', cb)
		return () => removeEventListener('keyup', cb)
	}, [ enterContinues ])

	return ( <>
		<Helmet>
			<title>Learn | { setName } | Flashcards</title>
		</Helmet>

		<Heading text='Learn' leadingIcon={
			<ClickDetector onClick={ () => navigate('/sets') }>
				<SvgIcon Icon={ BackIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} />

		{ learnItems == null &&
			<Paragraph size={ 2 } text='Loading...' align='center' colour='#CBD1DC' />
		}

		{ learnItems != null && generateQuestion(learnItems[learnItemIndex]) }

		{ learnDetails != null && <VerticalFlexbox>
			<Padding vertical={ 16 } />
			<p style={{ color: '#67696C', margin: '.25rem' }}>
				<span style={{ fontWeight: 600 }}>Knowledge level</span>:
				&nbsp;
				<span style={{ color: knowledgeColour(learnDetails.knowledgeLevel) }}>
					{ learnDetails.knowledgeLevel.toFixed(1) }
				</span>
				&nbsp;
				<span style={{ color: '#CBD1DC' }}>(</span>
				{ learnDetails.knowledgeLevelDelta >= 0
					? <span style={{ color: '#88AD64' }}>+{ learnDetails.knowledgeLevelDelta.toFixed(1) }</span>
					: <span style={{ color: '#EC7272' }}>{ learnDetails.knowledgeLevelDelta.toFixed(1) }</span>
				}
				<span style={{ color: '#CBD1DC' }}>)</span>
			</p>
			<p style={{ color: '#67696C', margin: '.25rem' }}>

				<span style={{ fontWeight: 600 }}>Number of revisions</span>:
				&nbsp;
				<span style={{ color: '#CBD1DC' }}>{ learnDetails.timesRevised }</span>
			</p>
		</VerticalFlexbox> }

		{ questionAnswered &&
			<FloatingButton Icon={ ArrowRight } colour='#88AD64' onClick={ nextQuestion } />
		}

		<Popup visible={ loadSetError != null } title='Error loading sets'>
			<Paragraph colour='#CBD1DC' align='center' text={ loadSetError! } />
		</Popup>

		{ learnItemIndex != null && learnItems != null &&
			<BottomProgressBar progress={ learnItemIndex / learnItems!.length } />
		}
	</> )
}