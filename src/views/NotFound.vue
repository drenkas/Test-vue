<template lang="pug">
	.notFound.app__wrapper

		h3.app__title {{$t('notFound')}}
		.notFound__form
			router-link.button.button_bind.notFound__btn(to="/")
				.button__text {{$t('recoverComplete.enter')}}

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
	components: {
		ValidationProvider,
		ValidationObserver,
	},
	data() {
		return {}
	},
	methods: {},
}
</script>

<style lang="scss" scoped>
@import '../common/shared.scss';
.notFound__form {
	width: 380px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.recover__field {
	margin-bottom: 25px;
}

.recover__desc {
	text-align: center;
}

.notFound__btn {
	display: inline-block;
	margin-top: 30px;
}
</style>
