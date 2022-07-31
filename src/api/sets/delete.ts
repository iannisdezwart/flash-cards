import { request } from '../../util/request'

interface RequestModel
{
	setName: string
}

export default async (req: RequestModel) =>
{
	const apiToken = localStorage.getItem('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	return await request({
		method: 'DELETE',
		endpoint: '/sets',
		apiToken,
		body: req
	})
}