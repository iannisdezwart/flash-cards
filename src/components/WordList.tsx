import React from 'react'
import WordListItem from './WordListItem'
import Heading from './Heading'
import ClickDetector from './ClickDetector'
import DraggableList from './DraggableList'
import PlusIcon from '../icons/plus.svg'
import { useState } from 'react'
import { reorder } from '../util/reorder'
import { Lang } from '../util/langs'

interface Word
{
	front: string
	back: string
	new: boolean
}

export interface WordListProps
{
	words: Word[]
	langFront: Lang
	langBack: Lang
	onChange?: (words: { front: string, back: string }[]) => void
}

export default (props: WordListProps) =>
{
	const [ words, _setWords ] = useState(props.words)

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
				new: true
			}
		])
	}

	const updateWord = (index: number, newFront: string, newBack: string, type: 'new-word' | 'update-word') =>
	{
		const newWords = words.slice()

		newWords[index].front = newFront
		newWords[index].back = newBack
		newWords[index].new = false

		setWords(newWords)

		switch (type)
		{
		case 'new-word':
			// TODO: Add word through API.
			break
		case 'update-word':
			// TODO: Update word through API.
			break
		}
	}

	const reorderWords = (oldIndex: number, newIndex: number) =>
	{
		setWords(reorder(words, oldIndex, newIndex))

		// TODO: Reorder words through API.
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
					key={ i }
					onChange={ (newFront, newBack, type) => updateWord(i, newFront, newBack, type) }
				/>
			)) }
		</DraggableList>
	</> )
}