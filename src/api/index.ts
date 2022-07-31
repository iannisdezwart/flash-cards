import setsNew from './sets/add'
import setsGet from './sets/get'
import setsDelete from './sets/delete'
import authLogin from './auth/login'
import authSignup from './auth/signup'

export default {
	sets: {
		get: setsGet,
		new: setsNew,
		delete: setsDelete
	},
	auth: {
		login: authLogin,
		signup: authSignup
	}
}