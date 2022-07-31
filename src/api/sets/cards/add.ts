import { request } from '../../../util/request'

interface RequestModel
{
	setName: string
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
		method: 'POST',
		endpoint: '/sets/cards',
		apiToken,
		body: req
	})
}