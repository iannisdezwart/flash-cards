import { request } from '../../util/request'

export default async (oldIndex: number, newIndex: number) =>
{
	const apiToken = localStorage.getItem('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	return await request({
		method: 'PATCH',
		endpoint: '/sets',
		apiToken,
		body: {
			action: 'reorder',
			oldIndex,
			newIndex
		}
	})
}