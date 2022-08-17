import { Lang } from '../../util/langs'
import { request } from '../../util/request'

interface RequestModel
{
	text: string
	from: Lang
	to: Lang
}

export default async (req: RequestModel) =>
{
	const { text, from, to } = req

	return await request({
		method: 'GET',
		endpoint: '/translate',
		query: {
			text,
			from: from.langCode,
			to: to.langCode
		}
	}) as string[]
}