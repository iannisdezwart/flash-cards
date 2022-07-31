import { Locale } from '../../util/langs'
import { request } from '../../util/request'

interface RequestModel
{
	name: string
	localeFront: Locale
	localeBack: Locale
	cards: {
		front: string
		back: string
	}[]
}

export default async (req: RequestModel) =>
{
	const apiToken = localStorage.getItem('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	await request({
		method: 'POST',
		endpoint: '/sets',
		apiToken,
		body: req
	})
}