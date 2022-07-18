import React from 'react'
import * as styles from './Flag.module.sass'

interface FlagProps
{
	lang: string
}

export default (props: FlagProps) =>
{
	const Icon = require(`../icons/flags/${ props.lang.slice(-2) }.svg`)
	return (
		<div className={ styles.flagIcon }>
			<Icon />
		</div>
	)
}