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

	static getOrDefault(key: string, defaultValue: any)
	{
		const value = LocalStorage.get(key)

		if (value == null)
		{
			LocalStorage.set(key, defaultValue)
			return defaultValue
		}

		return value
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