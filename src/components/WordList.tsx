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

interface Word
{
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

	const updateWord = (index: number, newFront: string, newBack: string, starred: boolean, type: 'new-word' | 'update-word') =>
	{
		const newWords = words.slice()

		newWords[index].front = newFront
		newWords[index].back = newBack
		newWords[index].starred = starred
		newWords[index].new = false

		setWords(newWords)

		if (!props.synchroniseWithServer)
		{
			return
		}

		switch (type)
		{
			case 'new-word':
				api.sets.cards.add({
					setName: props.setName,
					card: {
						front: newWords[index].front,
						back: newWords[index].back
					}
				})
				break

			case 'update-word':
				api.sets.cards.update({
					setName: props.setName,
					cardIndex: index,
					card: {
						front: newWords[index].front,
						back: newWords[index].back,
						starred: newWords[index].starred
					}
				})
				break
		}
	}

	const deleteWord = (index: number) =>
	{
		if (!props.synchroniseWithServer)
		{
			return
		}

		api.sets.cards.delete({
			setName: props.setName,
			cardIndex: index
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
			oldCardIndex: oldIndex,
			newCardIndex: newIndex,
		})
	}

	return ( <>
		<Heading text='Words' size={ 2 } trailingIcon={
			<ClickDetector onClick={ addWord }>
				<PlusIcon />
			</ClickDetector>
		} />

		<DraggableList onReorder={ reorderWords }>
			{ words.map((word, i) => (
				<WordListItem
					front={{ text: word.front, lang: props.langFront }}
					back={{ text: word.back, lang: props.langBack }}
					new={ word.new }
					starred={ word.starred }
					key={ i }
					onChange={ (newFront, newBack, starred, type) => updateWord(i, newFront, newBack, starred, type) }
					onDelete={ () => deleteWord(i) }
				/>
			)) }
		</DraggableList>

		<Popup visible={ loadSetError != null } title='Error loading set'>
			<Heading size={ 1 } colour='#CBD1DC' text={ loadSetError! } />
		</Popup>
	</> )
}