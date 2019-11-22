// import axios from 'axios'
import Cookies from 'js-cookie'

// initial state
const state = {
	ref_url: '',
}

// getters
const getters = {
	getRef: state => state.ref_url,
}

const mutationTypes = {
	SET_REF: 'SET_REF',
}

// actions
const actions = {
	async setRef({ commit }, url) {
		try {
			commit('SET_REF', url)
		} catch (error) {
			throw error
		}
	},
	async setCookie() {
		try {
			Cookies.set('jwt_token', jwt_token)
			Cookies.set('client_uuid', client_uuid)
		} catch (error) {
			throw error
		}
	},
	async readCookie() {
		try {
			const token = Cookies.get('jwt_token')
			const id = Cookies.get('client_uuid')
			if (token && id) return true
			return false
		} catch (error) {
			throw error
		}
	},
	async removeCookie() {
		try {
			Cookies.remove('jwt_token')
			Cookies.remove('client_uuid')
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
