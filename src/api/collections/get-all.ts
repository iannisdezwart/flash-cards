import { Locale } from '../../util/langs'
import { request } from '../../util/request'

export interface ResponseModel
{
	name: string
	localeFront: Locale
	localeBack: Locale
}

export default async () =>
{
	const apiToken = localStorage.getItem('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	return await request({
		method: 'GET',
		endpoint: '/collections',
		headers: {
			'Authorization': apiToken
		}
	}) as ResponseModel[]
}