import { request } from '../../util/request'

interface ResponseModel
{
	valid: boolean
}

export default async () =>
{
	const apiToken = localStorage.getItem('api-token')

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