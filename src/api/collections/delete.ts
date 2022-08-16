import { request } from '../../util/request'
import { LocalStorage } from '../../util/storage'

interface RequestModel
{
	collectionName: string
}

export default async (req: RequestModel) =>
{
	const apiToken = LocalStorage.get('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	await request({
		method: 'DELETE',
		endpoint: '/collections',
		headers: {
			'Authorization': apiToken
		},
		body: req
	})
}