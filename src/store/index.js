import Vue from 'vue'
import Vuex from 'vuex'
import global from './global'
import authentication from './authentication'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		global,
		authentication,
	},
	strict: debug,
})
