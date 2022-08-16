import { navigate } from 'gatsby'
import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import validateToken from '../api/auth/validate-token'
import Heading from '../components/Heading'
import VerticalFlexbox from '../components/VerticalFlexbox'
import { LocalStorage } from '../util/storage'

export default () =>
{
	useEffect(() =>
	{
		if (LocalStorage.get('api-token') != null)
		{
			(async () =>
			{
				if (await validateToken())
				{
					navigate('/home')
				}
				else
				{
					LocalStorage.remove('api-token')
					navigate('/login')
				}
			})()
		}
		else
		{
			navigate('/login')
		}
	}, [])

	return ( <>
		<Helmet>
			<title>Flashcards</title>
		</Helmet>

		<VerticalFlexbox>
			<Heading text='Flash cards' />
		</VerticalFlexbox>
	</> )
}