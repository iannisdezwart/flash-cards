import { Locale } from '../../util/langs'
import { request } from '../../util/request'
import { LocalStorage } from '../../util/storage'

export interface ResponseModel
{
	id: number
	name: string
	user: string
	localeFront: Locale
	localeBack: Locale
}

export default async (setName: string) =>
{
	const apiToken = LocalStorage.get('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	return await request({
		method: 'GET',
		endpoint: '/sets',
		headers: {
			'Authorization': apiToken,
			'X-Set-Name': setName
		},
	}) as ResponseModel
}