import firebase from 'firebase/app'

// initial state
const state = {
	authed: false,
}

// getters
const getters = {
	getAuthed: state => state.authed,
}

// actions
const actions = {
	async signIn({ dispatch }, { email, password }) {
		try {
			await firebase.auth().signInWithEmailAndPassword(email, password)
			dispatch('readUser')
			return {
				status: true,
			}
		} catch (error) {
			return {
				status: false,
				code: error.code,
				message: error.message,
			}
		}
	},
	// eslint-disable-next-line no-unused-vars
	async signUp({ state }, { email, password }) {
		try {
			await firebase.auth().createUserWithEmailAndPassword(email, password)
			return {
				status: true,
			}
		} catch (error) {
			return {
				status: false,
				message: error.message,
			}
		}
	},
	async readUser({ commit }) {
		try {
			firebase.auth().onAuthStateChanged(function(user) {
				commit('setAuthed', user ? true : false)
			})
		} catch (error) {
			throw error
		}
	},
	async removeUser({ dispatch }) {
		try {
			await firebase.auth().signOut()
			dispatch('readUser')
		} catch (error) {
			throw error
		}
	},
}

// mutations
const mutations = {
	// payload is parameter that mutation takes. Can be any shape
	setAuthed(state, payload) {
		state.authed = payload
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
