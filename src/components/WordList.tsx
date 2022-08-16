import React, { useEffect } from 'react'
import WordListItem from './WordListItem'
import Heading from './Heading'
import ClickDetector from './ClickDetector'
import DraggableList from './DraggableList'
import PlusIcon from '../icons/plus.svg'
import { useState } from 'react'
import { reorder } from '../util/reorder'
import { Lang } from '../util/langs'
import api from '../api'
import Popup from './Popup'
import * as styles from './WordList.module.sass'
import Paragraph from './Paragraph'

interface Word
{
	id?: number
	front: string
	back: string
	new: boolean
	starred: boolean
}

export interface WordListProps
{
	words: Word[]
	langFront: Lang
	langBack: Lang
	setName: string
	synchroniseWithServer: boolean
	onChange?: (words: { front: string, back: string }[]) => void
	onLoad?: (setProps: { langFront: Lang, langBack: Lang }) => void
}

export default (props: WordListProps) =>
{
	const [ words, _setWords ] = useState(props.words)
	const [ loadSetError, setLoadSetError ] = useState<string>()

	const loadSet = async () =>
	{
		try
		{
			const [ set, cards ] = await Promise.all([
				await api.sets.get(props.setName),
				await api.sets.cards.get(props.setName)
			])

			setWords(cards.map(card => ({
				id: card.id,
				front: card.front,
				back: card.back,
				new: false,
				starred: card.starred
			})))

			props.onLoad?.({
				langFront: Lang.fromLocale(set.localeFront)!,
				langBack: Lang.fromLocale(set.localeBack)!
			})
		}
		catch (err)
		{
			setLoadSetError(err as string)
		}
	}

	useEffect(() => { props.synchroniseWithServer && loadSet() }, [])

	const setWords = (words: Word[]) =>
	{
		props.onChange?.(words.map(word => ({ front: word.front, back: word.back })))
		_setWords(words)
	}

	const addWord = () =>
	{
		setWords([
			...words,
			{
				front: '',
				back: '',
				new: true,
				starred: false
			}
		])
	}

	const updateWord = async (index: number, newFront: string, newBack: string, starred: boolean, type: 'new-word' | 'update-word') =>
	{
		const newWords = words.slice()

		newWords[index].front = newFront
		newWords[index].back = newBack
		newWords[index].starred = starred
		newWords[index].new = false

		if (!props.synchroniseWithServer)
		{
			if (type === 'new-word')
			{
				newWords[index].id = Math.floor(Math.random() * 1E9)
			}

			setWords(newWords)
			return
		}

		switch (type)
		{
			case 'new-word':
				const { cardId } = await api.sets.cards.add({
					setName: props.setName,
					card: {
						front: newWords[index].front,
						back: newWords[index].back
					}
				})
				newWords[index].id = cardId
				setWords(newWords)
				break

			case 'update-word':
				api.sets.cards.update({
					setName: props.setName,
					cardId: newWords[index].id!,
					card: {
						front: newWords[index].front,
						back: newWords[index].back,
						starred: newWords[index].starred
					}
				})
				setWords(newWords)
				break
		}
	}

	const deleteWord = (cardId: number) =>
	{
		setWords(words.filter(word => word.id != cardId))

		if (!props.synchroniseWithServer)
		{
			return
		}

		api.sets.cards.delete({
			setName: props.setName,
			cardId
		})
	}

	const reorderWords = (oldIndex: number, newIndex: number) =>
	{
		setWords(reorder(words, oldIndex, newIndex))

		if (!props.synchroniseWithServer)
		{
			return
		}

		api.sets.cards.reorder({
			setName: props.setName,
			cardId: words[oldIndex].id!,
			insertAtId: words[newIndex].id!
		})
	}

	return ( <>
		<Heading text='Words' size={ 2 } trailingIcon={
			<ClickDetector onClick={ addWord }>
				<PlusIcon />
			</ClickDetector>
		} />

		{ words.length == 0 &&
			<p className={ styles.noSets }>This set doesn't have any words. Tap the plus icon to add a word!</p>
		}

		<DraggableList onReorder={ reorderWords }>
			{ words.map((word, i) => (
				<WordListItem
					front={{ text: word.front, lang: props.langFront }}
					back={{ text: word.back, lang: props.langBack }}
					new={ word.new }
					starred={ word.starred }
					canBeStarred={ word.id != null }
					key={ `${ word.id }-${ i }` }
					onChange={ (newFront, newBack, starred, type) => updateWord(i, newFront, newBack, starred, type) }
					onDelete={ () => deleteWord(word.id!) }
				/>
			)) }
		</DraggableList>

		<Popup
			visible={ loadSetError != null }
			title='Error loading set'
			onClose={ () => setLoadSetError(undefined) }
		>
			<Paragraph colour='#CBD1DC' align='center' text={ loadSetError! } />
		</Popup>
	</> )
}