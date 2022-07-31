import { Locale } from '../../util/langs'
import { request } from '../../util/request'

interface ResponseModel
{
	name: string
	user: string
	localeFront: Locale
	localeBack: Locale
	cards: {
		front: string
		back: string
	}[]
}

export default async () =>
{
	const apiToken = localStorage.getItem('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	return await request({
		method: 'GET',
		endpoint: '/sets',
		apiToken
	}) as ResponseModel[]
}