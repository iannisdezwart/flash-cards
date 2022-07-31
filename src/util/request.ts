interface RequestOptions
{
	method: 'GET' | 'POST' | 'DELETE' | 'PATCH'
	endpoint: string
	body?: any
	query?: { [ param: string ]: string }
	apiToken?: string
	headers?: { [ headerName: string ]: string }
	output?: 'json' | 'arraybuffer'
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

	const headers: { [ key: string ]: string } = options.headers || {}

	if (options.apiToken)
	{
		headers['Authorization'] = options.apiToken
	}

	const res = await fetch(API_URL + options.endpoint + queryParams, {
		method: options.method,
		body: JSON.stringify(options.body),
		headers
	})

	const output = options.output || 'json'

	const read = async () =>
	{
		if (output == 'json')
		{
			try
			{
				return await res.json()
			}
			catch
			{
				return {}
			}
		}
		else if (output == 'arraybuffer')
		{
			return await res.arrayBuffer()
		}

		return null
	}

	if (res.status >= 400)
	{
		const { err } = await read() as { err: string }
		throw err
	}

	return await read()
}