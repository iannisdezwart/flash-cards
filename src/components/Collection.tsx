import React, { useState } from 'react'
import Flag from './Flag'
import * as styles from './Collection.module.sass'
import DeleteIcon from '../icons/delete.svg'
import { navigate } from 'gatsby'
import SideSwipable from './SideSwipable'
import { Lang } from '../util/langs'
import api from '../api'
import Popup from './Popup'
import Button from './Button'
import Paragraph from './Paragraph'

export interface CollectionProps
{
	name: string
	langFront: Lang
	langBack: Lang
	onDelete?: () => void
}

export default (props: CollectionProps) =>
{
	const [ deleteCollectionErr, setDeleteCollectionErr ] = useState<string>()
	const [ deleteClicked, setDeleteClicked ] = useState(false)

	const deleteCollection = (e: React.MouseEvent) =>
	{
		e.preventDefault()
		setDeleteClicked(true)
	}

	const deleteCollectionCancel = () =>
	{
		setDeleteClicked(false)
	}

	const deleteCollectionConfirm = async () =>
	{
		try
		{
			await api.collections.delete({
				collectionName: props.name
			})

			props.onDelete?.()
		}
		catch (err)
		{
			setDeleteCollectionErr(err as string)
		}
	}

	const openCollection = () =>
	{
		navigate(`/collection/?name=${ props.name }`)
	}

	return (
		<div className={ styles.collection }>
			<SideSwipable
				rightIcon={{
					Icon: DeleteIcon,
					colour: '#EC7272',
					onClick: deleteCollection
				}}
				iconSize={ 80 }
				onClick={ openCollection }
			>
				<div className={ styles.inner }>
					<Flag locale={ props.langFront.locale } />
					<p className={ styles.name }>{ props.name }</p>
					<Flag locale={ props.langBack.locale } />
				</div>
			</SideSwipable>

			<Popup
				visible={ deleteCollectionErr != null }
				title='Error deleting collection'
				onClose={ () => setDeleteCollectionErr(undefined) }
			>
				<Paragraph colour='#CBD1DC' align='center' text={ deleteCollectionErr! } />
			</Popup>

			<Popup
				visible={ deleteClicked }
				title='Are you sure?'
				onClose={ () => setDeleteClicked(false) }
			>
				<Button bgColour='#88AD64' fgColour='#fff' text='Cancel' onClick={ deleteCollectionCancel }></Button>
				<Button bgColour='#EC7272' fgColour='#fff' text='Delete collection' onClick={ deleteCollectionConfirm }></Button>
			</Popup>
		</div>
	)
}