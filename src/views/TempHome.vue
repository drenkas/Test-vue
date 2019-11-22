<template lang="pug">
	.TempHome.app__wrapper
		img.logo(src="~@/assets/logo.png")

		h3.app__title Времменная страница для авторизованого пользователя
		.TempHome__form
			.button.button_bind.TempHome__btn(@click="logout")
				.button__text Удалить куки

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'

export default {
	components: {
		ValidationProvider,
		ValidationObserver,
	},
	data() {
		return {}
	},
	methods: {
		...mapActions({
			removeCookie: 'global/removeCookie',
		}),
		async logout() {
			await this.removeCookie()
			this.$router.push('/')
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../common/shared.scss';
.TempHome__form {
	width: 380px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.TempHome__btn {
	display: inline-block;
	margin-top: 30px;
}
</style>
