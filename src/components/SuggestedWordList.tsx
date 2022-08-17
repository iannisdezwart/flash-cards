import React, { forwardRef } from 'react'
import * as styles from './SuggestedWordList.module.sass'

interface SuggestedWordListProps
{
	words: string[]
	left: number
	onSelect: (word: string) => void
}

export default (props: SuggestedWordListProps) => {
	return (
		<div className={ styles.suggestedWordList } style={{ left: `${ props.left * 100 }%` }}>
			{ props.words.map((word, i) =>
				<div
					key={ i }
					className={ styles.item }
					onMouseDown={ () => props.onSelect(word) }
				>
					{ word }
				</div> )
			}
		</div>
	)
}