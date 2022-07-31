import { request } from '../../util/request'

export default async (username: string, password: string) =>
{
	const { token } = await request({
		endpoint: '/login',
		method: 'POST',
		body: { username, password }
	}) as { token: string }

	localStorage.setItem('api-token', token)
}