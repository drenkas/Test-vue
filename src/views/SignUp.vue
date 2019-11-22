<template lang="pug">
	.signUp.app__wrapper

		h3.app__title {{$t('signUp.title')}}
		.signUp__form
			ValidationObserver(ref="form" v-slot="{ valid, validate }" tag="form" @submit.prevent="onSubmit")
				ValidationProvider(name="email" ref="email" rules="required|email" v-slot="{ errors, valid }")
					.field.signUp__field
						.field__title {{$t('fields.email')}}
						.inputContainer(:class="{'inputContainer_error': errors[0],  'inputContainer_success': valid}")
							input.inputContainer__input(type="text"  :placeholder="$t('fields.email_placeholder')" name='email'  v-model='email' @blur="resetValid")
							img.inputContainer__icnStatus(v-show="errors[0]" src="~@/assets/icon_error.svg")
							img.inputContainer__icnStatus(v-show="valid" src="~@/assets/icon_success.svg")
						.inputContainer__errorMsg(v-show="errors[0]") {{ errors[0] }}
				ValidationProvider(name="password" ref="password" rules="required|min:8|haveChar|haveSymbol|haveNumber" v-slot="{ errors, valid }")
					.field
						.field__title {{$t('fields.password')}}
						.inputContainer(:class="{'inputContainer_error': errors[0], 'inputContainer_success': valid}")
							input.inputContainer__input(type="password" :placeholder="$t('fields.password_placeholder')" name='password' v-model='password')
							img.inputContainer__icnStatus(v-show="errors[0]" src="~@/assets/icon_error.svg")
							img.inputContainer__icnStatus(v-show="valid" src="~@/assets/icon_success.svg")
						.inputContainer__errorMsg(v-show="errors[0]") {{ errors[0] }}
				.signUp__groupBtns
					.button.signUp__btn(@click="switchBlock")
						.button__text {{$t('signUp.signIn')}}
					button.button.button_bind.signUp__btn(type="submit" :disabled="!valid")
						.button__text {{$t('signUp.enter')}}
			

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapActions, mapGetters } from 'vuex'

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
	computed: {
		...mapGetters({
			getRef: 'global/getRef',
		}),
	},
	created() {},

	methods: {
		...mapActions({
			signUp: 'authentication/signUp',
			setCookie: 'global/setCookie',
		}),
		switchBlock() {
			this.$emit('input', !this.value)
		},
		resetValid() {
			this.$refs.email.reset()
		},
		async onSubmit() {
			const res = await this.$refs.form.validate()

			if (res) {
				const result = await this.signUp({
					email: this.email,
					password: this.password,
				})
				if (result.status) {
					this.$emit('input', !this.value)
				} else {
					this.$refs.email.setErrors([result.message])
				}
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../common/shared.scss';

.signUp__form {
	width: 360px;
}

.signUp__field {
	margin-bottom: 16px;
}

.signUp__link {
	margin-top: 10px;
	display: inline-block;
	@include font(1, 12, r, 16px);
}

.signUp__groupBtns {
	display: flex;
	width: 100%;
	justify-content: center;
	margin-top: 36px;
}

.signUp__btn {
	/* width: 130px; */
	margin: 0 10px;
}
</style>
