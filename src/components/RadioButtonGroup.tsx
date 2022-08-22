import React from 'react'
import * as styles from './RadioButtonGroup.module.sass'

interface RadioButtonGroupProps
{
	label: string
	default: string
	options: string[]
	onChange: (choice: string) => void
}

const capitalise = (text: string) =>
{
	return text.charAt(0).toUpperCase() + text.slice(1)
}

export default (props: RadioButtonGroupProps) =>
{
	return (
		<div className={ styles.radioButtonGroup }>
			<div className={ styles.labelContainer }>
				<label>{ props.label }</label>
			</div>

			<div className={ styles.buttons }>
				{ props.options.map((option, i) => (
					<label key={ i }>
						<input
							name={ props.label }
							type='radio'
							defaultChecked={ props.default == option }
							onChange={ () => props.onChange(option) }
						/>
						<div className={ styles.checkmark } />
						{ capitalise(option) }
					</label>
				)) }
			</div>
		</div>
	)
}