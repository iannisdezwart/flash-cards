import React, { useState } from 'react'
import Flag from './Flag'
import * as styles from './Set.module.sass'
import DeleteIcon from '../icons/delete.svg'
import { navigate } from 'gatsby'
import SideSwipable from './SideSwipable'
import { Lang } from '../util/langs'
import Popup from './Popup'
import Button from './Button'
import Paragraph from './Paragraph'
import HorizontalFlexbox from './HorizontalFlexbox'

export interface SetProps
{
	name: string
	langFront: Lang
	langBack: Lang
	onDelete?: () => void
	deleteMessage?: string
	deleteConfirm?: string
}

export default (props: SetProps) =>
{
	const [ deleteSetErr, setDeleteSetErr ] = useState<string>()
	const [ deleteClicked, setDeleteClicked ] = useState(false)

	const deleteSet = (e: React.MouseEvent) =>
	{
		e.preventDefault()
		setDeleteClicked(true)
	}

	const deleteSetCancel = () =>
	{
		setDeleteClicked(false)
	}

	const deleteSetConfirm = async () =>
	{
		try
		{
			props.onDelete?.()
		}
		catch (err)
		{
			setDeleteSetErr(err as string)
		}
	}

	const openSet = () =>
	{
		navigate(`/set?name=${ props.name }`)
	}

	return (
		<div className={ styles.set }>
			<SideSwipable
				rightIcon={{
					Icon: DeleteIcon,
					colour: '#EC7272',
					onClick: deleteSet
				}}
				iconSize={ 80 }
				onClick={ openSet }
			>
				<div className={ styles.inner }>
					<Flag locale={ props.langFront.locale } />
					<p className={ styles.name }>{ props.name }</p>
					<Flag locale={ props.langBack.locale } />
				</div>
			</SideSwipable>

			<Popup
				visible={ deleteSetErr != null }
				title='Error deleting set'
				onClose={ () => setDeleteSetErr(undefined) }
			>
				<Paragraph colour='#CBD1DC' align='center' text={ deleteSetErr! } />
			</Popup>

			<Popup
				visible={ deleteClicked }
				title='Are you sure?'
				onClose={ deleteSetCancel }
			>
				{ props.deleteMessage &&
					<Paragraph colour='#CBD1DC' align='center' text={ props.deleteMessage } />
				}
				<HorizontalFlexbox>
					<Button bgColour='#88AD64' fgColour='#fff' text='Cancel' onClick={ deleteSetCancel } />
					<Button bgColour='#EC7272' fgColour='#fff' text={ props.deleteConfirm ?? 'Delete set' }
						onClick={ deleteSetConfirm } />
				</HorizontalFlexbox>
			</Popup>
		</div>
	)
}