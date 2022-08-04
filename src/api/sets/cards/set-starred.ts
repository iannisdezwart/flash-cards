import { request } from '../../../util/request'

interface RequestModel
{
	setName: string
	cardId: number
	starred: boolean
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
		headers: {
			'Authorization': apiToken
		},
		body: {
			action: 'set-starred',
			...req
		}
	})
}