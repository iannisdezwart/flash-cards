import React from 'react'
import WordListItem from './WordListItem'
import Heading from './Heading'
import ClickDetector from './ClickDetector'
import DraggableList from './DraggableList'
import PlusIcon from '../icons/plus.svg'
import { useState } from 'react'

interface Word
{
	front: string
	back: string
	new: boolean
}

export interface WordListProps
{
	words: Word[]
}

export default (props: WordListProps) =>
{
	const [ words, setWords ] = useState(props.words)

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
		const wordsBeforeIndex = words.slice(0, oldIndex)
		const wordsAfterIndex = words.slice(oldIndex + 1)
		const newWords = [ ...wordsBeforeIndex, ...wordsAfterIndex ]
		newWords.splice(newIndex, 0, words[oldIndex])

		setWords(newWords)
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
					front={ word.front }
					back={ word.back }
					new={ word.new }
					key={ i }
					onChange={ (newFront, newBack, type) => updateWord(i, newFront, newBack, type) }
				/>
			)) }
		</DraggableList>
	</> )
}