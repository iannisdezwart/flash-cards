import { request } from '../../../util/request'

interface RequestModel
{
	setName: string
	cardIndex: number
}

export default async (req: RequestModel) =>
{
	const apiToken = localStorage.getItem('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	await request({
		method: 'DELETE',
		endpoint: '/sets/cards',
		apiToken,
		body: req
	})
}