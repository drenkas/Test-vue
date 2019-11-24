<template lang="pug">
	.task.app__wrapper
		h3.app__title {{editing ? $t('task.edit') : $t('task.create')}}
		ValidationObserver.task__form(ref="form" mode="aggressive" v-slot="{ valid, validate }" tag="form" @submit.prevent="onSubmit")
			ValidationProvider(name="title" ref="title" rules="required" v-slot="{ errors, valid }")
				.field.task__field
					.field__title {{$t('fields.title') + ':'}}
					.inputContainer(:class="{'inputContainer_error': errors[0]}")
						input.inputContainer__input(type="text"  :placeholder="$t('fields.title_placeholder')"  v-model='title')
						img.inputContainer__icnStatus(v-show="errors[0]" src="~@/assets/icon_error.svg")
					.inputContainer__errorMsg(v-show="errors[0]") {{ errors[0] }}
			ValidationProvider(name="text" ref="text" rules="required" v-slot="{ errors, valid }")
				.field.task__field
					.field__title {{$t('fields.text') + ':'}}
					.inputContainer(:class="{'inputContainer_error': errors[0]}")
						textarea.inputContainer__input(:placeholder="$t('fields.text_placeholder')"  v-model='text')
						img.inputContainer__icnStatus(v-show="errors[0]" src="~@/assets/icon_error.svg")
					.inputContainer__errorMsg(v-show="errors[0]") {{ errors[0] }}
			.task__btnGroup
				.button.task__btn(@click="back") 
					.button__text {{$t('task.back')}}
				button.button.button_bind(type="submit" :disabled="!valid")
					.button__text {{$t('task.enter')}}
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import route from '../../configRoutes'

export default {
	components: {
		ValidationProvider,
		ValidationObserver,
	},
	data() {
		return {
			title: '',
			text: '',
		}
	},
	computed: {
		...mapGetters({
			selectedTask: 'tasks/getSelectedTask',
		}),
		editing() {
			if (this.selectedTask.id) {
				return true
			} else return false
		},
	},
	mounted() {
		if (this.selectedTask.id) {
			this.title = this.selectedTask.title
			this.text = this.selectedTask.text
		}
	},
	methods: {
		...mapActions({
			newTask: 'tasks/newTask',
			editTask: 'tasks/editTask',
		}),
		...mapMutations({
			selectTask: 'tasks/selectTask',
		}),
		back() {
			if (this.editing) this.selectTask({})
			this.$router.back()
		},
		async onSubmit() {
			const res = await this.$refs.form.validate()
			if (res) {
				if (!this.editing)
					await this.newTask({
						title: this.title,
						text: this.text,
						date: new Date().toLocaleString(false, { hour12: false }),
					})
				else {
					await this.editTask({
						id: this.selectedTask.id,
						title: this.title,
						text: this.text,
					})
				}

				this.$router.push(route.table)
			}
		},
	},
}
</script>

<style lang="scss">
.task__field {
	margin-bottom: 10px;
}
.task__btnGroup {
	display: flex;
}
.task__btn {
	margin-right: 10px;
}
.task__form {
	width: 500px;
}
textarea.inputContainer__input {
	height: 150px;
}
</style>
