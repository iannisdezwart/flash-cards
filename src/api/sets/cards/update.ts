import { request } from '../../../util/request'

interface RequestModel
{
	setName: string
	cardIndex: number
	card: {
		front: string
		back: string
	}
}

export default async (req: RequestModel) =>
{
	const apiToken = localStorage.getItem('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	await request({
		method: 'PATCH',
		endpoint: '/sets/cards',
		apiToken,
		body: {
			action: 'update',
			...req
		}
	})
}