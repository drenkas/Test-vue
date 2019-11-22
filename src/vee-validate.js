import { extend, configure } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'
import { i18n } from './i18n'

configure({
	defaultMessage: (field, values) => {
		// override the field name.
		values._field_ = i18n.t(`fields.${field}`)

		return i18n.t(`validation.${values._rule_}`, values)
	},
	classes: {
		valid: 'is-valid',
		invalid: 'is-invalid',
	},
	mode: 'lazy',
})

// Install required rule and message.
extend('required', required)

// Install email rule and message.
extend('email', email)

// Install min rule and message.
extend('min', min)

extend('haveChar', {
	message: () => {
		return `Пароль должен содержать минимум 1 букву`
	},

	validate: value => {
		let strongRegex = new RegExp(/(?=.*[a-zA-Z])/g)
		return strongRegex.test(value)
	},
})

extend('haveNumber', {
	message: () => {
		return `Пароль должен содержать минимум 1 цифру`
	},

	validate: value => {
		let strongRegex = new RegExp(/(?=.*[0-9])/g)
		return strongRegex.test(value)
	},
})

extend('haveSymbol', {
	message: () => {
		return `Пароль должен содержать минимум 1 специальный символ`
	},

	validate: value => {
		let strongRegex = new RegExp(/(?=.*[!@#$%^&*])/g)
		return strongRegex.test(value)
	},
})
