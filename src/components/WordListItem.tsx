import React from 'react'
import { FlashCardProps } from './FlashCard'
import * as styles from './WordListItem.module.sass'

export default (props: FlashCardProps) =>
{
	return (
		<div className={ styles.wordListItem }>
			<p className={ styles.front }>{ props.front.text }</p>
			<p className={ styles.back }>{ props.back.text }</p>
		</div>
	)
}