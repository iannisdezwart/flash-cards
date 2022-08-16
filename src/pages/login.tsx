import { navigate } from 'gatsby'
import React, { createRef, useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import api from '../api'
import Button from '../components/Button'
import Heading from '../components/Heading'
import Padding from '../components/Padding'
import Paragraph from '../components/Paragraph'
import VerticalFlexbox from '../components/VerticalFlexbox'

export default () =>
{
	const [ inputErr, setInputErr ] = useState<string>()

	const usernameRef = createRef<HTMLInputElement>()
	const passwordRef = createRef<HTMLInputElement>()

	const logIn = async () =>
	{
		const username = usernameRef.current!.value
		const password = passwordRef.current!.value

		try
		{
			await api.auth.login(username, password)
			navigate('/home')
		}
		catch (err)
		{
			setInputErr(err as string)
		}
	}

	const signUp = async () =>
	{
		const username = usernameRef.current!.value
		const password = passwordRef.current!.value

		try
		{
			await api.auth.signup(username, password)
			await logIn()
		}
		catch (err)
		{
			setInputErr(err as string)
		}
	}

	const enterSubmitsForm = (e: React.KeyboardEvent) =>
	{
		if (e.key == 'Enter')
		{
			logIn()
		}
	}

	return ( <>
		<Helmet>
			<title>Log In | Flash Cards</title>
		</Helmet>

		<VerticalFlexbox>
			<Heading text='Flash cards' />
			<Padding vertical={ 16 } />
			<Heading text='Log in' size={ 2.5 } colour='#CBD1DC' />

			<input ref={ usernameRef } className='big-input' type='text' placeholder='Username' onKeyUp={ enterSubmitsForm } />
			<input ref={ passwordRef } className='big-input' type='password' placeholder='Password' onKeyUp={ enterSubmitsForm } />
			{ inputErr && <Paragraph colour='#CBD1DC' size={ 1.25 } align='center' text={ inputErr } /> }

			<div>
				<Button text='Log in' fgColour='#fff' bgColour='#88AD64' onClick={ logIn } size={ 1.25 } />
				<Button text='Sign up' fgColour='#fff' bgColour='#3C8DEC' onClick={ signUp } size={ 1.25 } />
			</div>
		</VerticalFlexbox>
	</> )
}