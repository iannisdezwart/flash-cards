import { request } from '../../../../util/request'

export interface RequestModel
{
	setName: string
	cardId: number
	direction: 'front' | 'back'
	answer: string
}

export interface ResponseModel
{
	correct: boolean
	correctAnswer: string
	knowledgeLevel: number
	knowledgeLevelDelta: number
	timesRevised: number
}

export default async (req: RequestModel) =>
{
	const apiToken = localStorage.getItem('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	return await request({
		method: 'PATCH',
		endpoint: '/sets/cards/learn',
		headers: {
			'Authorization': apiToken
		},
		body: req
	}) as ResponseModel
}