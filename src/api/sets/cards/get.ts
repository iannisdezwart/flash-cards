import { request } from '../../../util/request'
import { LocalStorage } from '../../../util/storage'

export interface ApiResponseModel
{
	id: number
	front: string
	back: string
	starred: boolean
}

export interface ResponseModel
{
	id: number
	front: string
	back: string
	starred: boolean
	setName: string
}

export default async (setName: string) =>
{
	const apiToken = LocalStorage.get('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	const res = await request({
		method: 'GET',
		endpoint: '/sets/cards',
		headers: {
			'Authorization': apiToken,
			'X-Set-Name': setName
		}
	}) as ApiResponseModel[]

	return res.map<ResponseModel>(card => ({
		id: card.id,
		front: card.front,
		back: card.back,
		starred: card.starred,
		setName,
	}))
}