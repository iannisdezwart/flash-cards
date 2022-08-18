import { Locale } from '../../util/langs'
import { request } from '../../util/request'
import { LocalStorage } from '../../util/storage'

export interface ResponseModel
{
	name: string
	localeFront: Locale
	localeBack: Locale
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
		endpoint: '/collections',
		headers: {
			'Authorization': apiToken,
			'X-Collection-Name': collectionName
		},
	}) as ResponseModel
}