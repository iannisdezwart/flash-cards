import React from 'react'
import FlashCardSetList from '../components/FlashCardSetList'
import Heading from '../components/Heading'
import './global.sass'

export default () => {
	const sets = [
		{
			cards: [
				{
					front: 'Cat',
					back: '고양이'
				},
				{
					front: 'Dog',
					back: '개'
				}
			],
			name: 'Animals',
			langFrom: 'en-GB',
			langTo: 'ko-KR'
		}
	]

	return (<>
		<Heading text='Sets'  />
		<FlashCardSetList sets={ sets } />
	</>)
}