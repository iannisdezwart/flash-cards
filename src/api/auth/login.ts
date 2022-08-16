import { request } from '../../util/request'
import { LocalStorage } from '../../util/storage'

export default async (username: string, password: string) =>
{
	const { token } = await request({
		endpoint: '/login',
		method: 'POST',
		body: { username, password }
	}) as { token: string }

	LocalStorage.set('api-token', token)
}