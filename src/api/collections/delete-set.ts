import { request } from '../../util/request'

interface RequestModel
{
	setName: string
	collectionName: string
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
		endpoint: '/collections',
		headers: {
			'Authorization': apiToken
		},
		body: {
			action: 'delete-set',
			...req
		}
	})
}