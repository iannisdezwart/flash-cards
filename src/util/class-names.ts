export const classNames = (obj: { [ className: string ]: boolean }) =>
{
	let classNames = []

	for (const className in obj)
	{
		if (obj[className])
		{
			classNames.push(className)
		}
	}

	return classNames.join(' ')
}