import setsNew from './sets/add'
import setsGet from './sets/get'
import setsGetAll from './sets/get-all'
import setsDelete from './sets/delete'
import setsReorder from './sets/reorder'
import setsCardsGet from './sets/cards/get'
import setsCardsAdd from './sets/cards/add'
import setsCardsDelete from './sets/cards/delete'
import setsCardsUpdate from './sets/cards/update'
import setsCardsReorder from './sets/cards/reorder'
import setsCardsSetStarred from './sets/cards/set-starred'
import setsCardsLearnGet from './sets/cards/learn/get'
import setsCardsLearnAnswer from './sets/cards/learn/answer'
import authLogin from './auth/login'
import authSignup from './auth/signup'
import ttsSpeak from './tts/speak'

export default {
	sets: {
		get: setsGet,
		getAll: setsGetAll,
		new: setsNew,
		delete: setsDelete,
		reorder: setsReorder,
		cards: {
			get: setsCardsGet,
			add: setsCardsAdd,
			delete: setsCardsDelete,
			update: setsCardsUpdate,
			reorder: setsCardsReorder,
			setStarred: setsCardsSetStarred,
			learn: {
				get: setsCardsLearnGet,
				answer: setsCardsLearnAnswer
			}
		}
	},
	auth: {
		login: authLogin,
		signup: authSignup
	},
	tts: {
		speak: ttsSpeak
	}
}