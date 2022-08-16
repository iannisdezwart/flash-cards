import { request } from '../../../util/request'
import { LocalStorage } from '../../../util/storage'

interface RequestModel
{
	setName: string
	cardId: number
	card: {
		front: string
		back: string
		starred: boolean
	}
}

export default async (req: RequestModel) =>
{
	const apiToken = LocalStorage.get('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	await request({
		method: 'PATCH',
		endpoint: '/sets/cards',
		headers: {
			'Authorization': apiToken
		},
		body: {
			action: 'update',
			...req
		}
	})
}