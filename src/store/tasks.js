import firebase from 'firebase/app'

import Task from './task_help'

// initial state
const state = {
	tasks: [],
	order: 'date',
	page: 1,
	amount: 2,
	selectedTask: {},
}

// getters
const getters = {
	getTasks: state => {
		const res = []
		const start = (state.page - 1) * state.amount
		const end = start + state.amount
		const temp = [...state.tasks]
		//dunk sort
		temp.sort((a, b) => {
			if (a[state.order] < b[state.order]) {
				return -1
			}
			if (a[state.order] > b[state.order]) {
				return 1
			}
			return 0
		})
		for (let i = start; i < end; i++) {
			if (!temp[i]) break
			res.push(temp[i])
		}
		return res
	},
	getPage: state => state.page,
	getOrder: state => state.order,
	getAmount: state => state.amount,
	getSelectedTask: state => state.selectedTask,
	getTotalPages: state => {
		return Math.ceil(state.tasks.length / state.amount)
	},
}

// actions
const actions = {
	async loadTasks({ commit }) {
		try {
			const task = await firebase
				.database()
				.ref('tasks')
				.once('value')
			// Get value
			const tasks = task.val()

			// New array
			const tasksArray = []
			// Get task key (id)
			Object.keys(tasks).forEach(key => {
				const t = tasks[key]
				tasksArray.push(new Task(t.title, t.text, t.date, key))
			})
			// Send mutation
			commit('loadTasks', tasksArray)
		} catch (error) {
			throw error
		}
	},
	// Create new Task
	// eslint-disable-next-line no-unused-vars
	async newTask({ dispatch }, payload) {
		try {
			// Use helped class
			const newTask = new Task(payload.title, payload.text, payload.date)
			await firebase
				.database()
				.ref('tasks')
				.push(newTask)
			return true
		} catch (error) {
			throw error
		}
	},
	// Edit Task (popup)
	async editTask({ commit }, { id, title, text }) {
		try {
			// Update title & descr
			await firebase
				.database()
				.ref('tasks')
				.child(id)
				.update({
					title,
					text,
				})
			commit('selectTask', {})
		} catch (error) {
			throw error
		}
	},
	// Remove Task
	async deleteTask({ dispatch, commit }, id) {
		try {
			await firebase
				.database()
				.ref('tasks')
				.child(id)
				.remove()
			dispatch('loadTasks')
			commit('setPage', 1)
		} catch (error) {
			throw error
		}
	},
}

// mutations
const mutations = {
	loadTasks(state, payload) {
		state.tasks = payload
	},
	setPage(state, payload) {
		state.page = payload
	},
	setOrder(state, payload) {
		state.order = payload
	},
	setAmount(state, payload) {
		state.amount = payload
	},
	selectTask(state, payload) {
		state.selectedTask = payload
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
