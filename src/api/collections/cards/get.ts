import { request } from '../../../util/request'
import { LocalStorage } from '../../../util/storage'

export interface ResponseModel
{
	id: number
	front: string
	back: string
	starred: boolean
	setName: string
}

export default async (collectionName: string) =>
{
	const apiToken = LocalStorage.get('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	return await request({
		method: 'GET',
		endpoint: '/collections/cards',
		headers: {
			'Authorization': apiToken,
			'X-Collection-Name': collectionName
		}
	}) as ResponseModel[]
}