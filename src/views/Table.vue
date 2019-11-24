<template lang="pug">
	.tableComponent.app__wrapper

		.tableComponent__groupBtns
			router-link.button.button_bind(to="/task")
				.button__text {{$t('table.create')}}
			.button.tableComponent__btn(@click="logout")
				.button__text {{$t('table.logout')}}
		
		
		.tableComponent__table
			.tableComponent__thead
				.tableComponent__col.tcol__id(:class="{'tableComponent__col_active': getOrder === 'id'}" @click="onOrderChange('id')") {{$t('table.thead.id')}}
				.tableComponent__col.tcol__date(:class="{'tableComponent__col_active': getOrder === 'date'}" @click="onOrderChange('date')") {{$t('table.thead.date')}}
				.tableComponent__col.tcol__title(:class="{'tableComponent__col_active': getOrder === 'title'}" @click="onOrderChange('title')") {{$t('table.thead.title')}}
				.tableComponent__col.tcol__disc(:class="{'tableComponent__col_active': getOrder === 'text'}" @click="onOrderChange('text')") {{$t('table.thead.text')}}
				.tableComponent__col.tcol__action


			.tableComponent__tbody
				.tableComponent__row(v-for="(task, index) in getTasks")
					.tableComponent__rowWrapper
						.tableComponent__rowItem.tcol__id 
							.tableComponent__text {{task.id}}
						.tableComponent__rowItem.tcol__date 
							.tableComponent__text {{task.date}}
						.tableComponent__rowItem.tcol__title 
							.tableComponent__text {{task.title}}
						.tableComponent__rowItem.tcol__disc 
							.tableComponent__text {{task.text}}
						.tableComponent__rowItem.tcol__action
							.button.button_small(@click="editTask(task)") {{$t('table.edit')}}
							.button.button_small.tableComponent__btn(@click="deleteTask(task.id)") {{$t('table.remove')}}

			.tableComponent__footer
				Pagination(:total-pages="getTotalPages" :current-page="getPage" @pagechanged="onPageChange")
				Select(:items="listAmounts", :value="getAmount" @onChange="onAmountChange")
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Pagination from '../components/Pagination'
import Select from '../components/Select'
import route from '../../configRoutes'

export default {
	components: {
		ValidationProvider,
		ValidationObserver,
		Pagination,
		Select,
	},
	data() {
		return {
			listAmounts: [2, 5, 10, 20],
		}
	},
	computed: {
		...mapGetters({
			getTasks: 'tasks/getTasks',
			getPage: 'tasks/getPage',
			getOrder: 'tasks/getOrder',
			getAmount: 'tasks/getAmount',
			getTotalPages: 'tasks/getTotalPages',
		}),
	},
	created() {
		this.loadTasks()
	},
	methods: {
		...mapActions({
			removeUser: 'authentication/removeUser',
			loadTasks: 'tasks/loadTasks',
			deleteTask: 'tasks/deleteTask',
		}),
		...mapMutations({
			setPage: 'tasks/setPage',
			setOrder: 'tasks/setOrder',
			setAmount: 'tasks/setAmount',
			selectTask: 'tasks/selectTask',
		}),
		async logout() {
			await this.removeUser()
			this.$router.push(route.root)
		},
		onPageChange(page) {
			this.setPage(page)
		},
		onOrderChange(order) {
			if (order !== this.getOrder) {
				this.setOrder(order)
				this.setPage(1)
			}
		},
		onAmountChange(amount) {
			this.setAmount(amount)
			this.setPage(1)
		},
		editTask(task) {
			this.selectTask(task)
			this.$router.push(route.task)
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../common/shared.scss';

.tableComponent__btn {
	display: inline-block;
	margin-left: 10px;
}

.tableComponent__groupBtns {
	margin-bottom: 20px;
}

.tcol__id {
	width: 200px;
}
.tcol__date {
	width: 200px;
}
.tcol__title {
	width: 200px;
}
.tcol__disc {
	width: 200px;
}
.tcol__action {
	width: 250px;
}

.tableComponent__table {
	margin-top: 10px;
}

.tableComponent__thead {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;

	.tableComponent__col {
		cursor: pointer;
	}
}

.tableComponent__tbody {
	position: relative;
}

.tableComponent__empty {
	display: flex;
	align-items: center;

	span {
		margin-right: 10px;
	}

	img {
		margin-right: 10px;
	}
}

.tableComponent__col {
	@include font(1, 12, b, 16px);
	text-transform: uppercase;
	display: flex;
	align-items: center;

	&:not(:last-child) {
		margin-right: 15px;
	}

	&_active {
		&::after {
			content: '';
			width: 0;
			height: 0;
			margin-left: 10px;
			border-style: solid;
			border-width: 5px 3.75px 0 3.75px;
			border-color: $color_blue3 transparent transparent transparent;
			transition: 0.3s;
		}
	}
}

.tableComponent__row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid transparent;
	padding: 10px 0;
	&:hover {
		border-color: #81a6c3;
	}
}

.tableComponent__rowWrapper {
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: space-between;
	align-items: center;
}

.tableComponent__rowItem {
	display: flex;
	align-items: center;
	&:not(:last-child) {
		margin-right: 15px;
	}
}

.tableComponent__mainItem {
	margin-left: 10px;
	color: #b2bcca;
}

.tableComponent__submit {
	margin-top: 75px;
}

.tableComponent__footer {
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	margin-top: 20px;
}
</style>
