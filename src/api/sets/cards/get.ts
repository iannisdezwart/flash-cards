import { request } from '../../../util/request'

export interface ResponseModel
{
	id: number
	front: string
	back: string
	starred: boolean
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
		endpoint: '/sets/cards',
		headers: {
			'Authorization': apiToken,
			'X-Set-Name': setName
		}
	}) as ResponseModel[]
}