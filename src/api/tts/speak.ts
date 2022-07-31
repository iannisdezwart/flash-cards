import { Locale } from '../../util/langs'
import { request } from '../../util/request'

interface RequestModel
{
	text: string
	locale: Locale
	gender?: 'male' | 'female'
}

export default async (req: RequestModel) =>
{
	const locale = req.locale
	const text = req.text
	const gender = req.gender || 'male'

	return await request({
		method: 'GET',
		endpoint: '/tts/speak',
		query: { locale, text, gender },
		output: 'arraybuffer'
	}) as ArrayBuffer
}