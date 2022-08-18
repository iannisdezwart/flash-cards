import React, { createRef } from 'react'
import * as styles from './Heading.module.sass'
import { Property } from 'csstype'
import CheckIcon from '../icons/check.svg'
import RoundIcon from './RoundIcon'

interface HeadingProps
{
	text: string
	size?: number
	colour?: string
	weight?: Property.FontWeight
	leadingIcon?: React.ReactElement
	trailingIcon?: React.ReactElement
	align?: Property.TextAlign
	isBeingEdited?: boolean
	onEditSubmit?: (newValue: string) => void
}

export default (props: HeadingProps) =>
{
	const inputRef = createRef<HTMLInputElement>()

	const onEditSubmit = () =>
	{
		props.onEditSubmit?.(inputRef.current?.value || '')
	}

	const fontSize = props.size || 3
	const colour = props.colour || '#3C8DEC'
	const textAlign = props.align || 'center'
	const fontWeight = props.weight || 600

	const headingStyle: React.CSSProperties = {
		fontSize: `${ fontSize }rem`,
		fontWeight,
		color: colour,
		textAlign
	}

	const inputStyle: React.CSSProperties = {
		fontSize: `${ fontSize }rem`,
		fontWeight,
		textAlign,
		margin: `.42em 0`,
		width: '300px',
	}

	return (
		<div className={ styles.heading }>
			<div>{ props.leadingIcon }</div>

			{ !props.isBeingEdited &&
				<h1 style={ headingStyle }>{ props.text }</h1>
			}

			{ props.isBeingEdited &&
				<div style={{ position: 'relative' }}>
					<input
						ref={ inputRef }
						type='text'
						style={ inputStyle }
						defaultValue={ props.text }
					/>
					<RoundIcon
						colour='#88AD64'
						Icon={ CheckIcon }
						size={ 64 }
						onClick={ onEditSubmit }
					/>
				</div>
			}

			<div>{ props.trailingIcon }</div>
		</div>
	)
}