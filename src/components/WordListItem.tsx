import React, { useState } from 'react'
import { FlashCardProps } from './FlashCard'
import SideSwipable from './SideSwipable'
import EditIcon from '../icons/edit.svg'
import DeleteIcon from '../icons/delete.svg'
import * as styles from './WordListItem.module.sass'
import Popup from './Popup'
import Button from './Button'

export default (props: FlashCardProps) =>
{
	const ref = React.createRef<HTMLDivElement>()
	const frontInputRef = React.createRef<HTMLInputElement>()
	const backInputRef = React.createRef<HTMLInputElement>()

	const [ inEditMode, setEditMode ] = useState(false)
	const [ deleteClicked, setDeleteClicked ] = useState(false)

	const editWord = () =>
	{
		if (inEditMode)
		{
			const front = frontInputRef.current?.value || ''
			const back = backInputRef.current?.value || ''

			if (front != props.front.text || back != props.back.text)
			{
				props.front.text = front
				props.back.text = back

				// TODO: Update word through API.
			}
		}

		setEditMode(!inEditMode)
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

		// TODO: Delete word through API.
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
		return (<>
			<input type="text" defaultValue={ props.front.text } ref={ frontInputRef }/>
			<input type="text" defaultValue={ props.back.text } ref={ backInputRef }/>
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
				LeftIcon={ EditIcon }
				leftIconColour='#88AD64'
				leftIconOnClick={ editWord }
				RightIcon={ DeleteIcon }
				rightIconColour='#EC7272'
				rightIconOnClick={ deleteWord }
				iconSize={ 50 }
			>
				<div className={ styles.inner }>
					{ generateInner() }
				</div>
			</SideSwipable>
			{ deleteClicked &&
				<Popup title='Are you sure?'>
					<Button bgColour='#88AD64' fgColour='#fff' text='Cancel' onClick={ deleteWordCancel }></Button>
					<Button bgColour='#EC7272' fgColour='#fff' text='Delete word' onClick={ deleteWordConfirm }></Button>
				</Popup>
			}
		</div>
	)
}