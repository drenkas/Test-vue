/* eslint-disable no-undef */
!(function(n, e) {
	'object' == typeof exports && 'undefined' != typeof module
		? (module.exports = e())
		: 'function' == typeof define && define.amd
		? define(e)
		: (((n = n || self).__vee_validate_locale__ru =
				n.__vee_validate_locale__ru || {}),
		  (n.__vee_validate_locale__ru.js = e()))
})(this, function() {
	'use strict'
	let n,
		e = {
			name: 'ru',
			messages: {
				_default: function() {
					return 'Значение поля недопустимо.'
				},
				after: function(n, e) {
					let t = e[0]
					return (
						'В поле ' +
						n +
						' должна быть дата после ' +
						(e[1] ? 'или равная ' : '') +
						t +
						'.'
					)
				},
				alpha: function() {
					return 'Поле может содержать только буквы.'
				},
				alpha_dash: function() {
					return 'Поле может содержать только буквы, цифры и дефис.'
				},
				alpha_num: function() {
					return 'Поле может содержать только буквы и цифры.'
				},
				alpha_spaces: function() {
					return 'Поле  может содержать только буквы и пробелы.'
				},
				before: function(n, e) {
					let t = e[0]
					return (
						'В поле ' +
						n +
						' должна быть дата до ' +
						(e[1] ? 'или равная ' : '') +
						t +
						'.'
					)
				},
				between: function(n, e) {
					return 'Поле должно быть между ' + e[0] + ' и ' + e[1] + '.'
				},
				confirmed: function() {
					return 'пароли не сопадают'
				},
				credit_card: function() {
					return 'Поле должно быть действительным номером карты'
				},
				date_between: function(n, e) {
					return 'Поле должно быть между ' + e[0] + ' и ' + e[1] + '.'
				},
				date_format: function(n, e) {
					return 'Поле должно быть в формате ' + e[0] + '.'
				},
				decimal: function(n, e) {
					void 0 === e && (e = [])
					let t = e[0]
					return (
						void 0 === t && (t = '*'),
						'Поле ' +
							n +
							' должно быть числовым и может содержать' +
							('*' === t
								? ' десятичные числа'
								: ' ' + t + ' десятичных чисел') +
							'.'
					)
				},
				digits: function(n, e) {
					return (
						'Поле ' +
						n +
						' должно быть числовым и точно содержать ' +
						e[0] +
						' цифры.'
					)
				},
				dimensions: function(n, e) {
					return (
						'Поле ' +
						n +
						' должно быть ' +
						e[0] +
						' пикселей на ' +
						e[1] +
						' пикселей.'
					)
				},
				email: function() {
					return 'Необходимо ввести действительный электронный адрес.'
				},
				excluded: function() {
					return 'Поле должно быть допустимым значением.'
				},
				ext: function(n, e) {
					return (
						'Поле ' +
						n +
						' должно быть действительным файлом. (' +
						e.slice(0) +
						')'
					)
				},
				image: function() {
					return 'Поле должно быть изображением.'
				},
				included: function() {
					return 'Поле должно быть допустимым значением.'
				},
				integer: function() {
					return 'Поле должно быть целым числом.'
				},
				ip: function() {
					return 'Поле должно быть действительным IP-адресом.'
				},
				length: function(n, e) {
					let t = e[0],
						r = e[1]
					return r
						? 'Длина поля должна быть между ' + t + ' и ' + r + '.'
						: 'Длина поля должна быть ' + t + '.'
				},
				max: function(n, e) {
					return 'Поле не может быть более ' + e[0] + ' символов.'
				},
				max_value: function(n, e) {
					return 'Поле должно быть ' + e[0] + ' или менее.'
				},
				mimes: function(n, e) {
					return (
						'Поле ' +
						n +
						' должно иметь допустимый тип файла. (' +
						e.slice(0) +
						')'
					)
				},
				min: function(n, e) {
					return 'Поле должно быть не менее ' + e[0] + ' символов.'
				},
				min_value: function(n, e) {
					return 'Поле должно быть ' + e[0] + ' или больше.'
				},
				numeric: function() {
					return 'Поле должно быть числом.'
				},
				regex: function() {
					return 'Поле имеет ошибочный формат.'
				},
				required: function() {
					return 'Поле обязательно для заполнения.'
				},
				size: function(n, e) {
					return (
						'Поле ' +
						n +
						' должно быть меньше, чем ' +
						(function(n) {
							let e = 1024,
								t =
									0 === (n = Number(n) * e)
										? 0
										: Math.floor(Math.log(n) / Math.log(e))
							return (
								1 * (n / Math.pow(e, t)).toFixed(2) +
								' ' +
								['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][t]
							)
						})(e[0]) +
						'.'
					)
				},
				url: function() {
					return 'Поле имеет ошибочный формат URL.'
				},
			},
			attributes: {},
		}
	return (
		'undefined' != typeof VeeValidate &&
			VeeValidate.Validator.localize((((n = {})[e.name] = e), n)),
		e
	)
})
