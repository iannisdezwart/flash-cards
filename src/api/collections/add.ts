import { request } from '../../util/request'

interface RequestModel
{
	collectionName: string
	localeFront: string
	localeBack: string
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
		endpoint: '/collections',
		headers: {
			'Authorization': apiToken
		},
		body: req
	})
}