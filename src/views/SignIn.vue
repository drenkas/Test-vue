<template lang="pug">
	.signIn.app__wrapper

		h3.app__title {{$t('signIn.title')}}
		.signIn__form
			ValidationObserver(ref="form" v-slot="{ valid, validate }" tag="form" @submit.prevent="onSubmit")
				ValidationProvider(name="email" ref="email" rules="required|email" v-slot="{ errors, valid }")
					.field.signIn__field
						.field__title {{$t('fields.email')}}
						.inputContainer(:class="{'inputContainer_error': errors[0],  'inputContainer_success': valid}")
							input.inputContainer__input(type="text"  :placeholder="$t('fields.email_placeholder')" name='email' @blur="resetValid"  v-model='email')
							img.inputContainer__icnStatus(v-show="errors[0]" src="~@/assets/icon_error.svg")
							img.inputContainer__icnStatus(v-show="valid" src="~@/assets/icon_success.svg")
						.inputContainer__errorMsg(v-show="errors[0]") {{ errors[0] }}
				ValidationProvider(name="password" ref="password" rules="required|min:8|haveChar|haveSymbol|haveNumber" v-slot="{ errors, valid }")
					.field
						.field__title {{$t('fields.password')}}
						.inputContainer(:class="{'inputContainer_error': errors[0], 'inputContainer_success': valid}")
							input.inputContainer__input(type="password" :placeholder="$t('fields.password_placeholder')" name='password' @blur="resetValid" v-model='password')
							img.inputContainer__icnStatus(v-show="errors[0]" src="~@/assets/icon_error.svg")
							img.inputContainer__icnStatus(v-show="valid" src="~@/assets/icon_success.svg")
						.inputContainer__errorMsg(v-show="errors[0]") {{ errors[0] }}
				.signIn__groupBtns
					.button.signIn__btn(@click="switchBlock")
						.button__text {{$t('signIn.signUp')}}
					button.button.button_bind.signIn__btn(type="submit" :disabled="!valid")
						.button__text {{$t('signIn.enter')}}
			

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'

export default {
	components: {
		ValidationProvider,
		ValidationObserver,
	},
	props: ['value'],
	data() {
		return {
			email: '',
			password: '',
		}
	},
	methods: {
		...mapActions({
			signIn: 'authentication/signIn',
		}),
		switchBlock() {
			this.$emit('input', !this.value)
		},
		resetValid() {
			this.$refs.email.reset()
			this.$refs.password.reset()
		},
		async onSubmit() {
			const res = await this.$refs.form.validate()

			if (res) {
				const result = await this.signIn({
					email: this.email,
					password: this.password,
				})
				if (!result.status) {
					if (result.code === 'auth/user-not-found')
						this.$refs.email.setErrors([result.message])
					if (result.code === 'auth/wrong-password')
						this.$refs.password.setErrors([result.message])
				}
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../common/shared.scss';

.signIn__form {
	width: 360px;
}

.signIn__field {
	margin-bottom: 16px;
}

.signIn__link {
	margin-top: 10px;
	display: inline-block;
	@include font(1, 12, r, 16px);
}

.signIn__groupBtns {
	display: flex;
	width: 100%;
	justify-content: center;
	margin-top: 36px;
}

.signIn__btn {
	/* width: 130px; */
	margin: 0 10px;
}
</style>
