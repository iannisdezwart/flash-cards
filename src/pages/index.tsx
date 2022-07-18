import React from 'react'
import FlashCardSetList from '../components/FlashCardSetList'
import Heading from '../components/Heading'
import './global.sass'

export default () => {
	const sets = [
		{
			cards: [
				{
					front: { lang: 'en-GB', text: 'Cat' },
					back: { lang: 'ko-KR', text: '고양이' }
				},
				{
					front: { lang: 'en-GB', text: 'Dog' },
					back: { lang: 'ko-KR', text: '개' }
				}
			],
			name: 'Animals',
			langFrom: 'en-GB',
			langTo: 'ko-KR'
		}
	]

	return (<>
		<Heading text='Sets' />
		<FlashCardSetList sets={ sets } />
	</>)
}