import { navigate, PageProps } from 'gatsby'
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import api from '../api'
import Paragraph from '../components/Paragraph'
import { FillInTheBlankLearnItem, MultipleChoiceLearnItem, ResponseModel as LearnData, LearnItem } from '../api/sets/cards/learn/get'
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
import SettingsIcon from '../icons/settings.svg'
import Padding from '../components/Padding'
import VerticalFlexbox from '../components/VerticalFlexbox'
import BottomProgressBar from '../components/BottomProgressBar'
import { speak } from '../util/speak'
import { ResponseModel as DetailedCard } from '../api/sets/cards/get-by-id'
import FlashCard from '../components/FlashCard'
import Checkbox from '../components/Checkbox'
import Button from '../components/Button'
import HorizontalFlexbox from '../components/HorizontalFlexbox'

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
	const [ learnData, setLearnData ] = useState<LearnData>()
	const [ learnItemIndex, setLearnItemIndex ] = useState(0)
	const [ loadSetError, setLoadSetError ] = useState<string>()
	const [ questionAnswered, setQuestionAnswered ] = useState(false)
	const [ hasSpoken, setSpoken ] = useState(false)
	const [ correctAnswer, setCorrectAnswer ] = useState<string>()
	const [ isCorrect, setCorrect ] = useState<boolean>()
	const [ numCorrectAnswers, setNumCorrectAnswers ] = useState(0)
	const [ wrongAnswerCardIds, setWrongAnswerCardIds ] = useState<Set<number>>(new Set())
	const [ learnDetails, setLearnDetails ] = useState<{
		knowledgeLevel: number
		knowledgeLevelDelta: number
		timesRevised: number
	}>()
	const [ roundFinished, setRoundFinished ] = useState(false)
	const [ difficultWords, setDifficultWords ] = useState<DetailedCard[]>()

	const [ settingsOpen, _setSettingsOpen ] = useState(false)
	const [ settingChanged, setSettingChanged ] = useState(false)
	const [ frontToBackEnabled, _setFrontToBackEnabled ] = useState(true)
	const [ backToFrontEnabled, _setBackToFrontEnabled ] = useState(true)
	const [ mcQuestionsEnabled, _setMcQuestionsEnabled ] = useState(true)
	const [ openQuestionsEnabled, _setOpenQuestionsEnabled ] = useState(true)

	const nextRound = () =>
	{
		setLangFront(undefined)
		setLangBack(undefined)
		setLearnData(undefined)
		setLearnItemIndex(0)
		setLoadSetError(undefined)
		setQuestionAnswered(false)
		setSpoken(false)
		setCorrectAnswer(undefined)
		setCorrect(undefined)
		setNumCorrectAnswers(0)
		setWrongAnswerCardIds(new Set())
		setLearnDetails(undefined)
		setRoundFinished(false)
		setDifficultWords(undefined)

		loadLearnItems()
	}

	const setSettingsOpen = (value: boolean) =>
	{
		setSettingChanged(false)
		_setSettingsOpen(value)
	}

	const closeSettings = () =>
	{
		if (!frontToBackEnabled && !backToFrontEnabled
			|| !mcQuestionsEnabled && !openQuestionsEnabled)
		{
			return
		}

		setSettingsOpen(false)

		if (settingChanged)
		{
			nextRound()
		}
	}

	const toggleSettings = () =>
	{
		if (settingsOpen)
		{
			closeSettings()
		}
		else
		{
			setSettingsOpen(true)
		}
	}

	const setFrontToBackEnabled = (enabled: boolean) =>
	{
		setSettingChanged(true)
		_setFrontToBackEnabled(enabled)
	}

	const setBackToFrontEnabled = (enabled: boolean) =>
	{
		setSettingChanged(true)
		_setBackToFrontEnabled(enabled)
	}

	const setMcQuestionsEnabled = (enabled: boolean) =>
	{
		setSettingChanged(true)
		_setMcQuestionsEnabled(enabled)
	}

	const setOpenQuestionsEnabled = (enabled: boolean) =>
	{
		setSettingChanged(true)
		_setOpenQuestionsEnabled(enabled)
	}

	const loadLearnItems = async () =>
	{
		try
		{
			const [ set, learnData ] = await Promise.all([
				api.sets.get(setName),
				api.sets.cards.learn.get({
					setName,
					frontToBackEnabled,
					backToFrontEnabled,
					mcQuestionsEnabled,
					openQuestionsEnabled
				})
			])
			setLangFront(Lang.fromLocale(set.localeFront))
			setLangBack(Lang.fromLocale(set.localeBack))
			setLearnData(learnData)
		}
		catch (err)
		{
			setLoadSetError(err as string)
		}
	}

	useEffect(() => { loadLearnItems() }, [])

	const toggleStarLearnItem = async (learnItem: LearnItem) =>
	{
		if (learnData == null)
		{
			return
		}

		const newLearnItems = learnData.items
			.slice()
			.map(item => item.cardId == learnItem.cardId ? { ...item, starred: !item.starred } : item)

		await api.sets.cards.setStarred({
			setName: setName,
			cardId: learnItem.cardId,
			starred: !learnItem.starred
		})

		setLearnData({
			...learnData,
			items: newLearnItems
		})
	}

	const generateMcQuestion = (learnItem: MultipleChoiceLearnItem) => ( <>
		<SmallFlashcard
			text={ learnItem.question }
			lang={ learnItem.direction == 'front' ? langFront! : langBack! }
			starred={ learnItem.starred }
			onToggleStar={ () => toggleStarLearnItem(learnItem) }
		/>
		<Padding vertical={ 24 } />
		<MultipleChoiceAnswer
			key={ `${ learnItem.cardId }-${ learnItem.type }-${ learnItem.direction }` } choices={ learnItem.choices }
			answerLang={ learnItem.direction == 'front' ? langBack! : langFront! }
			correctAnswer={ correctAnswer }
			isCorrect={ isCorrect }
			onAnswer={ answer => sendAnswer(learnItem, answer) }
		/>
	</> )

	const generateFillInTheBlankQuestion = (learnItem: FillInTheBlankLearnItem) => ( <>
		<SmallFlashcard
			text={ learnItem.question }
			lang={ learnItem.direction == 'front' ? langFront! : langBack! }
			starred={ learnItem.starred }
			onToggleStar={ () => toggleStarLearnItem(learnItem) }
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
		if (!hasSpoken)
		{
			speak({
				text: learnItem.question,
				lang: learnItem.direction == 'front' ? langFront! : langBack!
			})
			setSpoken(true)
		}

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
		console.log('sendAnswer', learnItem, answer)
		setQuestionAnswered(true)

		const res = await api.sets.cards.learn.answer({
			setName,
			direction: learnItem.direction,
			cardId: learnItem.cardId,
			answer
		})

		setCorrect(res.correct)

		if (res.correct)
		{
			setNumCorrectAnswers(numCorrectAnswers + 1)
		}
		else
		{
			setWrongAnswerCardIds(wrongAnswerCardIds.add(learnItem.cardId))
		}

		setCorrectAnswer(res.correctAnswer)
		setLearnDetails({
			knowledgeLevel: res.knowledgeLevel,
			knowledgeLevelDelta: res.knowledgeLevelDelta,
			timesRevised: res.timesRevised
		})
	}

	const nextQuestion = () =>
	{
		if (learnItemIndex == learnData!.items.length - 1)
		{
			setRoundFinished(true)
			loadDifficultWords()
			return
		}

		setLearnItemIndex(learnItemIndex + 1)
		setQuestionAnswered(false)
		setCorrectAnswer(undefined)
		setCorrect(undefined)
		setLearnDetails(undefined)
		setSpoken(false)
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
		addEventListener('keydown', cb)
		return () => removeEventListener('keydown', cb)
	}, [ enterContinues ])

	const loadDifficultWords = async () =>
	{
		const difficultWords = await Promise.all(Array
			.from(wrongAnswerCardIds)
			.map(cardId => api.sets.cards.getById(setName, cardId))
		)

		setDifficultWords(difficultWords)
	}

	const toggleStarDifficultWord = async (difficultWord: DetailedCard) =>
	{
		if (difficultWords == null)
		{
			return
		}

		const newDifficultWords = difficultWords.slice()
			.map(word => word.id == difficultWord.id ? { ...word, starred: !word.starred } : word)

		await api.sets.cards.setStarred({
			setName: setName,
			cardId: difficultWord.id,
			starred: !difficultWord.starred
		})

		setDifficultWords(newDifficultWords)
	}

	return ( <>
		<Helmet>
			<title>Learn | { setName } | Flashcards</title>
		</Helmet>

		<Heading text='Learn' leadingIcon={
			<ClickDetector onClick={ () => navigate(`/set?name=${ setName }`) }>
				<SvgIcon Icon={ BackIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} trailingIcon={
			<ClickDetector onClick={ () => toggleSettings() }>
				<SvgIcon Icon={ SettingsIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} />

		{ learnData == null &&
			<Paragraph size={ 2 } text='Loading...' align='center' colour='#CBD1DC' />
		}

		{ !roundFinished && learnData != null && generateQuestion(learnData.items[learnItemIndex]) }

		{ !roundFinished && learnDetails != null && <VerticalFlexbox>
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

		{ !roundFinished && questionAnswered &&
			<FloatingButton Icon={ ArrowRight } colour='#88AD64' onClick={ nextQuestion } />
		}

		{ roundFinished && <VerticalFlexbox>
			<Padding vertical={ 16 } />

			<Heading text='Round report' size={ 2.5 } colour='#CBD1DC' />

			<p style={{ color: '#67696C', margin: '.25rem' }}>
				<span style={{ fontWeight: 600 }}>Words practised</span>:
				&nbsp;
				<span style={{ color: '#CBD1DC' }}>{ learnData!.numCards }</span>
			</p>

			<p style={{ color: '#67696C', margin: '.25rem' }}>
				<span style={{ fontWeight: 600 }}>Correct answers</span>:
				&nbsp;
				<span style={{ color: '#CBD1DC' }}>{ numCorrectAnswers }</span>
			</p>

			<Padding vertical={ 24 } />

			{ numCorrectAnswers == learnData!.items.length
				? <Paragraph  size={ 1.25 } colour='#3C8DEC' align='center'
					text='Congratulations! You answered every question correctly!' />
				: <>
					<Heading text='Difficult words' size={ 1.5 } colour='#3C8DEC' />
					{ difficultWords?.map((word, i) => (
						<FlashCard
							front={{ text: word.front, lang: langFront! }}
							back={{ text: word.back, lang: langBack! }}
							onToggleStar={ () => toggleStarDifficultWord(word) }
							starred={ word.starred }
							details={ <VerticalFlexbox>
								<p style={{
									color: '#CBD1DC',
									margin: '.25rem',
									fontSize: '1rem',
									whiteSpace: 'nowrap'
								}}>
									<span style={{ fontWeight: 600 }}>Knowledge level</span>:
									&nbsp;
									<span style={{ color: knowledgeColour(word.knowledgeLevel) }}>
										{ word.knowledgeLevel.toFixed(1) }
									</span>
									<br />
									<span style={{ fontWeight: 600 }}>Number of revisions</span>:
									&nbsp;
									<span style={{ color: '#CBD1DC' }}>{ word.timesRevised }</span>
								</p>
							</VerticalFlexbox> }
							key={ i }
						/>
					)) }
				</>
			}

			<FloatingButton Icon={ ArrowRight } colour='#88AD64' onClick={ nextRound } />
		</VerticalFlexbox> }

		<Popup visible={ loadSetError != null } title='Error loading sets'>
			<Paragraph colour='#CBD1DC' align='center' text={ loadSetError! } />
		</Popup>

		{ !roundFinished && learnItemIndex != null && learnData != null &&
			<BottomProgressBar progress={ learnItemIndex / learnData.items.length } />
		}

		<Popup visible={ settingsOpen } title='Settings'>
			<VerticalFlexbox crossAxisAlignment='flex-start'>
				<Heading text='Learning direction' size={ 0.875 } colour='#67696C' align='start' />

				<Checkbox
					default={ frontToBackEnabled }
					label={ `${ langFront?.name } to ${ langBack?.name }` }
					onChange={ checked => setFrontToBackEnabled(checked) }
				/>
				<Padding vertical={ 8 } />
				<Checkbox
					default={ backToFrontEnabled }
					label={ `${ langBack?.name } to ${ langFront?.name }` }
					onChange={ checked => setBackToFrontEnabled(checked) }
				/>
				{ !frontToBackEnabled && !backToFrontEnabled &&
					<Paragraph colour='#EC7272' align='center' text='Please select a learning direction' />
				}

				<Padding vertical={ 24 } />

				<Heading text='Question types' size={ 0.875 } colour='#67696C' align='start' />

				<Checkbox
					default={ mcQuestionsEnabled }
					label='Multiple choice questions'
					onChange={ checked => setMcQuestionsEnabled(checked) }
				/>
				<Padding vertical={ 8 } />
				<Checkbox
					default={ openQuestionsEnabled }
					label='Open questions'
					onChange={ checked => setOpenQuestionsEnabled(checked) }
				/>
				{ !mcQuestionsEnabled && !openQuestionsEnabled &&
					<Paragraph colour='#EC7272' align='center' text='Please select a question type' />
				}

				<Padding vertical={ 24 } />

				<HorizontalFlexbox fill={ true }>
					<Button text='Save' fgColour='#FFFFFF' bgColour='#88AD64' onClick={ closeSettings } />
				</HorizontalFlexbox>
			</VerticalFlexbox>
		</Popup>
	</> )
}