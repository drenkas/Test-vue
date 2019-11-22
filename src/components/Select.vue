<template lang="pug">
	.selectComponent(v-click-outside="hide" :class="alternate ? 'selectComponent_alt' : ''")
		.selectComponent__wrap(:class="showList ? 'selectComponent__wrap_focus' : ''")
			input(:disabled="disabled" type='text', readonly ref='input', :value="value", :placeholder="placehold",  @click="toogleList" ).selectComponent__input
		transition( name="slide")
			.selectComponent__listWrap(v-if="showList")
				PerfectScrollbar
					
					.selectComponent__list
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
		alternate: {
			type: Boolean,
			default: false,
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
		toogleList() {
			if (!this.disabled) this.showList = !this.showList
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
	align-items: center;
	width: 100%;
	position: relative;

	&_focus {
		border-color: #81a6c3;
	}

	&::after {
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		right: 10px;
		margin-left: auto;
		border-style: solid;
		border-width: 5px 3.75px 0 3.75px;
		border-color: #81a7c3 transparent transparent transparent;
		transition: 0.3s;
	}

	&_focus {
		border-radius: 3px 3px 0px 0px;
		border-color: #81a6c3;
		border-bottom-color: #81a6c3;
		&::after {
			transform: rotate(180deg);
			border-color: #4a6c87 transparent transparent transparent;
		}
	}
}

.selectComponent__input {
	border: none;
	width: 100%;
	border-radius: 4px;
	padding: 7px 9px;
	cursor: pointer;

	&::placeholder {
		opacity: 0.6;
	}
}

.selectComponent__listWrap {
	position: absolute;
	top: calc(100%);
	width: 100%;
	border: 1px solid #81a6c3;
	background: #ffffff;
	z-index: 3;
	border-radius: 3px;
	overflow: hidden;
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

.selectComponent_alt {
	.selectComponent__wrap_focus {
		border-radius: 3px 3px 0px 0px;
		border-bottom-color: #d8e0e6;
	}

	.selectComponent__listWrap {
		border-radius: 0 0 3px 3px;
		border-top: none;
	}
}
</style>

<style lang="scss"></style>
