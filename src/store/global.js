// import axios from 'axios'
import firebase from 'firebase/app'

// initial state
const state = {
	authed: '',
}

// getters
const getters = {
	authedtRef: state => state.authed,
}

const mutationTypes = {
	SET_REF: 'SET_REF',
}

// actions
const actions = {
	async readUser() {
		try {
			const result = firebase.auth().onAuthStateChanged(function(user) {
				console.log(user)
				return user ? true : false
			})
			console.log('read', result)
			return result
		} catch (error) {
			throw error
		}
	},
	async removeUser() {
		try {
			firebase.auth().signOut()
		} catch (error) {
			throw error
		}
	},
}

// mutations
const mutations = {
	// payload is parameter that mutation takes. Can be any shape
	[mutationTypes.SET_REF](state, payload) {
		state.ref_url = payload
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}

const jwt_token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

const client_uuid = '44988943'
