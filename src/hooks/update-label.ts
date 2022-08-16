export class UpdateLabel
{
	value = 0

	update()
	{
		this.value++
	}
}

export const useUpdateLabel = () =>
{
	return new UpdateLabel()
}