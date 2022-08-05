import React from 'react'
import * as styles from './Checkbox.module.sass'
import FakeCheckboxMark from '../icons/fake-checkbox-mark.svg'

interface CheckboxProps
{
	default?: boolean
	label: string
	onChange: (checked: boolean) => void
}

export default (props: CheckboxProps) =>
{
	const inputRef = React.createRef<HTMLInputElement>()

	return (
		<div className={ styles.checkbox } onClick={ () => inputRef.current?.click() }>
			<input
				type='checkbox'
				onChange={ e => props.onChange(e.target.checked) }
				defaultChecked={ props.default || false }
				ref={ inputRef }
			/>

			<div className={ styles.fakeCheckbox }>
				<FakeCheckboxMark />
			</div>

			<label>
				{ props.label }
			</label>
		</div>
	)
}