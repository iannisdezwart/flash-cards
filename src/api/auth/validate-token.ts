import { request } from '../../util/request'
import { LocalStorage } from '../../util/storage'

interface ResponseModel
{
	valid: boolean
}

export default async () =>
{
	const apiToken = LocalStorage.get('api-token')

	if (apiToken == null)
	{
		return false
	}

	const res = await request({
		method: 'GET',
		endpoint: '/validate-token',
		headers: {
			'Authorization': apiToken
		}
	}) as ResponseModel

	return res.valid
}