import api from '../api'
import { Lang } from './langs'

interface RequestModel
{
	text: string
	lang: Lang
}

export const speak = async (req: RequestModel) =>
{
	try
	{
		const audioCtx = new AudioContext()
		const arrayBuffer = await api.tts.speak({
			text: req.text,
			locale: req.lang.locale
		})

		audioCtx.decodeAudioData(arrayBuffer, audio =>
		{
			const audioBuf = audioCtx.createBufferSource()
			audioBuf.buffer = audio
			audioBuf.connect(audioCtx.destination)
			audioBuf.start()
		})
	}
	catch (err)
	{
		console.error('Error fetching audio', err)
	}
}