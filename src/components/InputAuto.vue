<template lang="pug">
	.selectComponent(v-click-outside="hide")
		.selectComponent__wrap(:class="showList ? 'selectComponent__wrap_focus' : ''")
			input(:disabled="disabled" type='text', ref='input', :value="value", :placeholder="placehold",  @click="autocomplete", @input="autocomplete", @blur="checkField" ).selectComponent__input
		.selectComponent__listWrap
			PerfectScrollbar
				transition( name="slide")
					.selectComponent__list(v-if="showList")
						.selectComponent__listItem( v-for="(item) in listItems" @click="changeSelect(item)" v-html='item') 
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
export default {
	props: {
		items: {
			type: Array,
		},
		placehold: {
			type: String,
		},
		value: {
			type: String,
		},
		disabled: {
			type: Boolean,
		},
	},
	components: {
		PerfectScrollbar,
	},
	data() {
		return {
			showList: false,
			listItems: [],
		}
	},
	mounted() {
		this.listItems = [...this.items]
	},
	watch: {
		items(newItems) {
			this.listItems = [...newItems]
		},
	},
	methods: {
		hide() {
			this.showList = false
		},
		changeSelect(str) {
			this.$refs.input.value = str.replace('<b>', '').replace('</b>', '')
			this.showList = false
			this.$emit('input', this.$refs.input.value)
		},
		autocomplete(e) {
			this.showList = true
			this.listItems = this.items.filter(el => {
				let str = this.$refs.input.value.toUpperCase()
				if (el.toUpperCase().indexOf(str) !== -1) {
					return el
				}
			})
			this.listItems = this.listItems.map(el => {
				const str = this.$refs.input.value.toUpperCase()
				const index = el.toUpperCase().indexOf(str)
				const newStr = el.slice(index, index + str.length)
				return el.replace(newStr, newStr.bold())
			})
			this.$emit('input', e.target.value)
		},
		checkField() {
			this.items.forEach(el => {
				if (el.toUpperCase() === this.$refs.input.value.toUpperCase()) {
					this.$refs.input.value = el
				}
			})
			this.$emit('input', this.$refs.input.value)
			//this.listItems = [...this.items]
		},
	},
}
</script>

<style lang="scss" scoped>
.slide-enter-active {
	animation: slideToggle 0.2s;
}
.slide-leave-active {
	animation: slideToggle 0.2s reverse;
}

@keyframes slideToggle {
	0% {
		max-height: 0px;
	}
	100% {
		max-height: 180px;
	}
}

.selectComponent {
	position: relative;
	display: flex;
	width: auto;
	font-size: 16px;
	line-height: 22px;

	&:hover {
		.selectComponent__btn {
			background: rgba(247, 247, 247, 0.8);
		}
	}
}

.selectComponent__wrap {
	background: #ffffff;
	border: 1px solid #eeeeee;
	border-radius: 4px;
	display: flex;
	width: 100%;

	&_focus {
		border-color: #81a6c3;
	}
}

.selectComponent__input {
	border: none;
	width: 100%;
	border-radius: 4px;
	padding: 7px 9px;

	&::placeholder {
		opacity: 0.6;
	}
}

.selectComponent__listWrap {
	position: absolute;
	top: calc(100%);
	width: 100%;
	box-shadow: inset 0px 0px 0px 1px #81a6c3;
	background: #ffffff;
	z-index: 2;
	border-radius: 3px;
}

.selectComponent__list {
	max-height: 180px;
}

.selectComponent__listItem {
	padding: 10px 20px;
	cursor: pointer;
	margin: 1px;

	&:hover {
		background-color: #e9eaed;
	}
}
</style>

<style lang="scss"></style>
