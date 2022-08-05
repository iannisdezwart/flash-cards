import { request } from '../../../util/request'

export interface ResponseModel
{
	id: number
	front: string
	back: string
	starred: boolean
	knowledgeLevel: number
	timesRevised: number
}

export default async (setName: string, cardId: number) =>
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
			'X-Set-Name': setName,
			'X-Card-Id': cardId.toString()
		}
	}) as ResponseModel
}