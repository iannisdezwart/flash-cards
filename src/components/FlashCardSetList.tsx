import React from 'react'
import FlashCardSet, { FlashCardSetProps } from './FlashCardSet'
import * as styles from './FlashCardSetList.module.sass'

interface FlashCardSetListProps
{
	sets: FlashCardSetProps[]
}

 export default (props: FlashCardSetListProps) => (
	<div className={ styles.flashCardSetList }>
		{ props.sets.map((set, i) => (
			<FlashCardSet
				cards={ set.cards }
				name={ set.name }
				langFrom={ set.langFrom }
				langTo={ set.langTo }
				key={ i } />
		)) }
	</div>
)