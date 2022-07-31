import React, { useState } from 'react'
import SideSwipable, { SideSwipableOnClickAction } from './SideSwipable'
import EditIcon from '../icons/edit.svg'
import DeleteIcon from '../icons/delete.svg'
import CheckIcon from '../icons/check.svg'
import * as styles from './WordListItem.module.sass'
import Popup from './Popup'
import Button from './Button'
import { Lang } from '../util/langs'

interface Card
{
	lang: Lang
	text: string
}

interface WordListItemProps
{
	front: Card
	back: Card
	new: boolean
	onChange: (newFront: string, newBack: string, type: 'new-word' | 'update-word') => void
	onDelete: () => void
}

export default (props: WordListItemProps) =>
{
	const ref = React.createRef<HTMLDivElement>()
	const frontInputRef = React.createRef<HTMLInputElement>()
	const backInputRef = React.createRef<HTMLInputElement>()

	const [ inEditMode, setEditMode ] = useState(props.new)
	const [ deleteClicked, setDeleteClicked ] = useState(false)

	const editWord = (): SideSwipableOnClickAction =>
	{
		setEditMode(true)
		return 'close'
	}

	const finishEditWord = () =>
	{
		setEditMode(false)

		const frontInput = frontInputRef.current?.value || ''
		const backInput = backInputRef.current?.value || ''

		if (props.new)
		{
			props.onChange(frontInput, backInput, 'new-word')
			return
		}

		if (props.front.text != frontInput || props.back.text != backInput)
		{
			props.onChange(frontInput, backInput, 'update-word')
		}
	}

	const deleteWord = () =>
	{
		setDeleteClicked(true)
	}

	const deleteWordCancel = () =>
	{
		setDeleteClicked(false)
	}

	const deleteWordConfirm = () =>
	{
		setDeleteClicked(false)
		ref.current?.remove()
		props.onDelete()
	}

	const generateInnerInNormalMode = () =>
	{
		return (<>
			<p>{ props.front.text }</p>
			<p>{ props.back.text }</p>
		</>)
	}

	const generateInnerInEditMode = () =>
	{
		const enterCapture = (e: React.KeyboardEvent) =>
		{
			if (e.key == 'Enter')
			{
				finishEditWord()
			}
		}

		return (<>
			<input type="text" defaultValue={ props.front.text } placeholder={ `Enter ${ props.front.lang.name }...` } ref={ frontInputRef } onKeyUp={ enterCapture }/>
			<input type="text" defaultValue={ props.back.text } placeholder={ `Enter ${ props.back.lang.name }...` } ref={ backInputRef } onKeyUp={ enterCapture }/>
		</>)
	}

	const generateInner = () =>
	{
		if (inEditMode)
		{
			return generateInnerInEditMode()
		}

		return generateInnerInNormalMode()
	}

	return (
		<div className={ styles.wordListItem } ref={ ref }>
			<SideSwipable
				leftIcon={{
					Icon: EditIcon,
					colour: '#88AD64',
					onClick: editWord
				}}
				rightIcon={{
					Icon: DeleteIcon,
					colour: '#EC7272',
					onClick: deleteWord
				}}
				floatingIcon={ inEditMode ? {
					Icon: CheckIcon,
					colour: '#88AD64',
					onClick: finishEditWord
				} : undefined }
				iconSize={ 50 }
			>
				<div className={ styles.inner }>
					{ generateInner() }
				</div>
			</SideSwipable>
			{
				<Popup visible={ deleteClicked } title='Are you sure?'>
					<Button bgColour='#88AD64' fgColour='#fff' text='Cancel' onClick={ deleteWordCancel }></Button>
					<Button bgColour='#EC7272' fgColour='#fff' text='Delete word' onClick={ deleteWordConfirm }></Button>
				</Popup>
			}
		</div>
	)
}