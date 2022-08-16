import { navigate } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import validateToken from '../api/auth/validate-token'
import Heading from '../components/Heading'
import VerticalFlexbox from '../components/VerticalFlexbox'

export default () =>
{
	if (localStorage.getItem('api-token') != null)
	{
		(async () =>
		{
			if (await validateToken())
			{
				navigate('/home')
			}
			else
			{
				localStorage.removeItem('api-token')
				navigate('/login')
			}
		})()
	}
	else
	{
		navigate('/login')
	}

	return ( <>
		<Helmet>
			<title>Flashcards</title>
		</Helmet>

		<VerticalFlexbox>
			<Heading text='Flash cards' />
		</VerticalFlexbox>
	</> )
}