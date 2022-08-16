import { request } from '../../../util/request'
import { LocalStorage } from '../../../util/storage'

interface RequestModel
{
	setName: string
	card: {
		front: string
		back: string
	}
}

interface ResponseModel
{
	cardId: number
}

export default async (req: RequestModel) =>
{
	const apiToken = LocalStorage.get('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	return await request({
		method: 'POST',
		endpoint: '/sets/cards',
		headers: {
			'Authorization': apiToken
		},
		body: req
	}) as ResponseModel
}