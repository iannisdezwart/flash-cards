import { request } from '../../../util/request'

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
	const apiToken = localStorage.getItem('api-token')

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