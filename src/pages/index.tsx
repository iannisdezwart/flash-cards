import React, { createRef } from 'react'
import Button from '../components/Button'
import Heading from '../components/Heading'
import Padding from '../components/Padding'
import VerticalFlexbox from '../components/VerticalFlexbox'
import { request } from '../util/request'

export default () =>
{
	const usernameRef = createRef<HTMLInputElement>()
	const passwordRef = createRef<HTMLInputElement>()

	const logIn = async () =>
	{
		const username = usernameRef.current!.value
		const password = passwordRef.current!.value

		const { token } = await request({
			endpoint: '/login',
			method: 'POST',
			body: { username, password }
		}) as { token: string }

		localStorage.setItem('api-token', token)
	}

	const signUp = async () =>
	{
		const username = usernameRef.current!.value
		const password = passwordRef.current!.value

		await request({
			endpoint: '/signup',
			method: 'POST',
			body: { username, password }
		})
	}

	return (
		<VerticalFlexbox>
			<Heading text='Flash cards' />
			<Padding vertical={ 16 } />
			<Heading text='Log in' size={ 2.5 } colour='#CBD1DC' />

			<input ref={ usernameRef } className='big-input' type='text' placeholder='Username' />
			<input ref={ passwordRef } className='big-input' type='password' placeholder='Password' />

			<div>
				<Button text='Log in' fgColour='#fff' bgColour='#88AD64' onClick={ logIn } size={ 1.25 } />
				<Button text='Sign up' fgColour='#fff' bgColour='#3C8DEC' onClick={ signUp } size={ 1.25 } />
			</div>
		</VerticalFlexbox>
	)
}