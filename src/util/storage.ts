export class LocalStorage
{
	static get(key: string)
	{
		if (typeof localStorage != 'undefined')
		{
			return localStorage.getItem(key)
		}

		return null
	}

	static set(key: string, value: string)
	{
		if (typeof localStorage != 'undefined')
		{
			localStorage.setItem(key, value)
		}
	}

	static remove(key: string)
	{
		if (typeof localStorage != 'undefined')
		{
			localStorage.removeItem(key)
		}
	}
}