import Vue from 'vue'
import VueRouter from 'vue-router'
import route from '../../configRoutes'

Vue.use(VueRouter)

const routes = [
	{
		path: route.root,
		name: 'home',
		redirect: route.auth,
	},
	{
		path: route.auth,
		name: 'auth',
		component: () => import('../views/Auth.vue'),
	},

	{
		path: route.authed,
		name: 'authed',
		component: () => import('../views/TempHome.vue'),
	},

	{
		path: '*',
		name: 'notFound',
		component: () => import('../views/NotFound.vue'),
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
