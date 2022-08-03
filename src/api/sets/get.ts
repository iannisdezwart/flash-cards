import { Locale } from '../../util/langs'
import { request } from '../../util/request'

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
	const apiToken = localStorage.getItem('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	return await request({
		method: 'GET',
		endpoint: '/sets',
		headers: {
			'X-Set-Name': setName
		},
		apiToken
	}) as ResponseModel
}