import { Locale } from '../../util/langs'
import { request } from '../../util/request'
import { LocalStorage } from '../../util/storage'

interface RequestModel
{
	ofCollection?: string
	fitsCollection?: string
}

interface ResponseModel
{
	id: number
	name: string
	user: string
	localeFront: Locale
	localeBack: Locale
}

export default async (req: RequestModel) =>
{
	const apiToken = LocalStorage.get('api-token')

	if (apiToken == null)
	{
		throw 'Not authenticated. Please log in again.'
	}

	return await request({
		method: 'GET',
		endpoint: '/sets',
		headers: {
			'Authorization': apiToken,
			...(req.ofCollection != null && {
				'X-Of-Collection': req.ofCollection
			}),
			...(req.fitsCollection != null && {
				'X-Fits-Collection': req.fitsCollection
			})
		}
	}) as ResponseModel[]
}