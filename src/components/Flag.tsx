import React from 'react'
import { CountryCode, countryCodes } from '../util/langs'
import * as styles from './Flag.module.sass'

interface FlagProps
{
	lang: string
	size?: number
}

const flags = new Map(countryCodes.map(country => [ country, require(`../icons/flags/${ country }.svg`) ]))

export default (props: FlagProps) =>
{
	const size = props.size || 1
	const Icon = flags.get(props.lang.slice(-2) as CountryCode) || flags.get('XX')

	return (
		<div className={ styles.flagIcon } style={{ '--size': size } as React.CSSProperties}>
			<Icon />
		</div>
	)
}