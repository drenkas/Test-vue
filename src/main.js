import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { i18n } from './i18n'
import './vee-validate'
import * as VueSpinnersCss from 'vue-spinners-css'

import * as firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

Vue.use(VueSpinnersCss)

Vue.config.productionTip = false

new Vue({
	router,
	i18n,
	store,
	render: h => h(App),
	created() {
		let firebaseConfig = {
			apiKey: 'AIzaSyAQWH92AAhW-Stj6HqyKMAVX_NQ0cbs3g4',
			authDomain: 'testtask-38cc1.firebaseapp.com',
			databaseURL: 'https://testtask-38cc1.firebaseio.com',
			projectId: 'testtask-38cc1',
			storageBucket: 'testtask-38cc1.appspot.com',
			messagingSenderId: '985241763245',
			appId: '1:985241763245:web:fa7686074f635b1125b524',
			measurementId: 'G-9ZH778W63N',
		}
		// Initialize Firebase
		firebase.initializeApp(firebaseConfig)
		firebase.analytics()
	},
}).$mount('#app')
