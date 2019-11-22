import axios from 'axios'
import firebase from 'firebase/app'

// initial state
const state = {
	tokenList: ['soghGg8g9DD8j4', 'GJhfv87hG090', 'GJdfgvbcv5454k'],
}

// getters
const getters = {}

// eslint-disable-next-line no-unused-vars
const mutationTypes = {}

// actions
const actions = {
	// eslint-disable-next-line no-unused-vars
	async signIn({ state }, { email, password }) {
		try {
			console.log('signIn')
		} catch (error) {
			throw error
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
