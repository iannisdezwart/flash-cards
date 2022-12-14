import { request } from '../../../../util/request'
import { LocalStorage } from '../../../../util/storage'

export interface RequestModel
{
	collectionName: string
	frontToBackEnabled: boolean
	backToFrontEnabled: boolean
	mcQuestionsEnabled: boolean
	openQuestionsEnabled: boolean
}

export interface MultipleChoiceLearnItem
{
	type: 'multiple-choice'
	cardId: number
	setName: string
	starred: boolean
	direction: 'front' | 'back'
	question: string
	choices: string[]
}

export interface FillInTheBlankLearnItem
{
	type: 'fill-in-the-blank'
	cardId: number
	setName: string
	starred: boolean
	direction: 'front' | 'back'
	question: string
}

export type LearnItem = MultipleChoiceLearnItem | FillInTheBlankLearnItem

export interface ResponseModel
{
	items: LearnItem[]
	numCards: number
}

export default async (req: RequestModel) =>
{
	const apiToken = LocalStorage.get('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	const toString = (bool: boolean) => bool ? 'true' : 'false'

	return await request({
		method: 'GET',
		endpoint: '/collections/cards/learn',
		headers: {
			'Authorization': apiToken,
			'X-Collection-Name': req.collectionName,
			'X-Front-To-Back-Enabled': toString(req.frontToBackEnabled),
			'X-Back-To-Front-Enabled': toString(req.backToFrontEnabled),
			'X-MC-Questions-Enabled': toString(req.mcQuestionsEnabled),
			'X-Open-Questions-Enabled': toString(req.openQuestionsEnabled)
		}
	}) as ResponseModel
}