import { request } from '../../../../util/request'

export interface MultipleChoiceLearnItem
{
	type: 'multiple-choice'
	cardId: number
	starred: boolean
	direction: 'front' | 'back'
	question: string
	choices: string[]
}

export interface FillInTheBlankLearnItem
{
	type: 'fill-in-the-blank'
	cardId: number
	starred: boolean
	direction: 'front' | 'back'
	question: string
}

export type ResponseModel = MultipleChoiceLearnItem | FillInTheBlankLearnItem

export default async (setName: string) =>
{
	const apiToken = localStorage.getItem('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	return await request({
		method: 'GET',
		endpoint: '/sets/cards/learn',
		headers: {
			'Authorization': apiToken,
			'X-Set-Name': setName
		}
	}) as ResponseModel[]
}