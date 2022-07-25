import React, { useEffect, useState } from 'react'
import { reorder } from '../util/reorder'
import DraggableList from './DraggableList'
import FlashCardSet, { FlashCardSetProps } from './FlashCardSet'
import ClickDetector from '../components/ClickDetector'
import Heading from '../components/Heading'
import PlusIcon from '../icons/plus.svg'
import SvgIcon from './SvgIcon'
import { navigate } from 'gatsby'
import { request } from '../util/request'

 export default () =>
 {
	const [ sets, setSets ] = useState<FlashCardSetProps[]>([])

	const loadSets = async () =>
	{
		const res = await request({
			method: 'GET',
			endpoint: '/sets',
			apiToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTg4NTk0MDgsInVzZXJuYW1lIjoiSWFubmlzIiwiaWF0IjoxNjU4NzczMDA4fQ.O9kh7QchxH6U9M_VK0CneQ9NVUfUgK5n5DZNIY5Vm90'
		}) as FlashCardSetProps[]

		setSets(res)
	}

	useEffect(() => { loadSets() }, [])

	const addSet = () =>
	{
		navigate('/new-set')
	}

	const onReorder = (oldIndex: number, newIndex: number) =>
	{
		setSets(reorder(sets, oldIndex, newIndex))

		// TODO: Reorder sets through API.
	}

	return ( <>
		<Heading text='Sets' trailingIcon={
			<ClickDetector onClick={ addSet }>
				<SvgIcon Icon={ PlusIcon } width={ 32 } height={ 32 } />
			</ClickDetector>
		} />

		<DraggableList onReorder={ onReorder }>
			{ sets.map((set, i) => (
				<FlashCardSet
					cards={ set.cards }
					name={ set.name }
					langFrom={ set.langFrom }
					langTo={ set.langTo }
					key={ i } />
			)) }
		</DraggableList>
	</> )
}