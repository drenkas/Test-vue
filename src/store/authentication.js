import firebase from 'firebase/app'

// initial state
const state = {}

// getters
const getters = {}

// eslint-disable-next-line no-unused-vars
const mutationTypes = {}

// actions
const actions = {
	// eslint-disable-next-line no-unused-vars
	async signIn({ state }, { email, password }) {
		try {
			const user = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
			console.log(user)
			return {
				status: true,
			}
		} catch (error) {
			console.log('error', error)
			return {
				status: false,
				code: error.code,
				message: error.message,
			}
		}
	},
	async signUp({ state }, { email, password }) {
		try {
			const user = await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
			console.log(user)
			return {
				status: true,
			}
		} catch (error) {
			console.log('error', error)
			return {
				status: false,
				message: error.message,
			}
		}
	},
}

// mutations
const mutations = {
	// payload is parameter that mutation takes. Can be any shape
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
