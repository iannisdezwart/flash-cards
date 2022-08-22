import api from '../api'
import { TtsGender } from '../api/tts/speak'
import { Lang } from './langs'
import { LocalStorage } from './storage'

interface RequestModel
{
	text: string
	lang: Lang
	gender?: TtsGender
}

export const speak = async (req: RequestModel) =>
{
	try
	{
		const audioCtx = new AudioContext()
		const arrayBuffer = await api.tts.speak({
			text: req.text,
			locale: req.lang.locale,
			gender: req.gender
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