import { request } from '../../util/request'
import { LocalStorage } from '../../util/storage'

interface RequestModel
{
	collectionName: string
	localeFront: string
	localeBack: string
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
		endpoint: '/collections',
		headers: {
			'Authorization': apiToken
		},
		body: req
	})
}