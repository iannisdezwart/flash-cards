import { request } from "../../util/request"

export default async (username: string, password: string) =>
{
	await request({
		endpoint: '/signup',
		method: 'POST',
		body: { username, password }
	})
}