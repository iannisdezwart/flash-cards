import { request } from '../../util/request'
import { LocalStorage } from '../../util/storage'

export default async (oldSetName: string, newSetName: string) =>
{
	const apiToken = LocalStorage.get('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	return await request({
		method: 'PATCH',
		endpoint: '/sets',
		headers: {
			'Authorization': apiToken
		},
		body: {
			action: 'rename',
			oldSetName,
			newSetName
		}
	})
}