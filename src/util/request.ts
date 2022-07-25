interface RequestOptions
{
	method: 'GET' | 'POST' | 'DELETE'
	endpoint: string
	body?: any
	query?: { [ param: string ]: string }
	apiToken?: string
}

const API_URL = 'http://localhost:3000'

export const request = async (options: RequestOptions) =>
{
	let queryParams = ''

	if (options.query != null)
	{
		const queryParamParts: string[] = []

		for (const param in options.query)
		{
			queryParamParts.push(`${ param }=${ encodeURIComponent(options.query[param]) }`)
		}

		queryParams = `?${ queryParamParts.join('&') }`
	}

	const headers: { [ key: string ]: string } = {}

	if (options.apiToken)
	{
		headers['Authorization'] = options.apiToken
	}

	const res = await fetch(API_URL + options.endpoint + queryParams, {
		method: options.method,
		body: JSON.stringify(options.body),
		headers
	})

	return await res.json()
}