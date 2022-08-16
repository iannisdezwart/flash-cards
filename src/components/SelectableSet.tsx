import React from 'react'
import Flag from './Flag'
import * as styles from './SelectableSet.module.sass'
import { Lang } from '../util/langs'
import ClickDetector from './ClickDetector'

export interface SetProps
{
	name: string
	langFront: Lang
	langBack: Lang
	onClick: () => void
}

export default (props: SetProps) =>
{
	return (
		<ClickDetector onClick={ () => props.onClick() }>
			<div className={ styles.selectableSet }>
				<div className={ styles.inner }>
					<Flag locale={ props.langFront.locale } />
					<p className={ styles.name }>{ props.name }</p>
					<Flag locale={ props.langBack.locale } />
				</div>
			</div>
		</ClickDetector>
	)
}