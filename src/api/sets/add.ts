import { Locale } from '../../util/langs'
import { request } from '../../util/request'
import { LocalStorage } from '../../util/storage'

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
	const apiToken = LocalStorage.get('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	await request({
		method: 'POST',
		endpoint: '/sets',
		headers: {
			'Authorization': apiToken
		},
		body: req
	})
}