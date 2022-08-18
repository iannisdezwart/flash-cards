import setsNew from './sets/add'
import setsGet from './sets/get'
import setsGetAll from './sets/get-all'
import setsDelete from './sets/delete'
import setsReorder from './sets/reorder'
import setsRename from './sets/rename'
import setsCardsGet from './sets/cards/get'
import setsCardsGetById from './sets/cards/get-by-id'
import setsCardsAdd from './sets/cards/add'
import setsCardsDelete from './sets/cards/delete'
import setsCardsUpdate from './sets/cards/update'
import setsCardsReorder from './sets/cards/reorder'
import setsCardsSetStarred from './sets/cards/set-starred'
import setsCardsLearnGet from './sets/cards/learn/get'
import setsCardsLearnAnswer from './sets/cards/learn/answer'
import collectionsGetAll from './collections/get-all'
import collectionsNew from './collections/add'
import collectionsDelete from './collections/delete'
import collectionsAddSet from './collections/add-set'
import collectionsDeleteSet from './collections/delete-set'
import authLogin from './auth/login'
import authSignup from './auth/signup'
import ttsSpeak from './tts/speak'
import translationTranslate from './translation/translate'

export default {
	sets: {
		get: setsGet,
		getAll: setsGetAll,
		new: setsNew,
		delete: setsDelete,
		reorder: setsReorder,
		rename: setsRename,
		cards: {
			get: setsCardsGet,
			getById: setsCardsGetById,
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
	collections: {
		getAll: collectionsGetAll,
		new: collectionsNew,
		delete: collectionsDelete,
		addSet: collectionsAddSet,
		deleteSet: collectionsDeleteSet
	},
	auth: {
		login: authLogin,
		signup: authSignup
	},
	tts: {
		speak: ttsSpeak
	},
	translate: translationTranslate
}