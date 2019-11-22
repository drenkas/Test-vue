<template lang="pug">
	.tooltip(ref="tooltip")
		<svg class="tooltip__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7.5" fill="white" stroke="#81A6C3"/><rect x="7" y="6" width="2" height="6" fill="#81A6C3"/><rect x="7" y="3" width="2" height="2" fill="#81A6C3"/></svg>
		.tooltip__info.tooltip__info_hidden {{text}}
</template>

<script>
import {
	showTooltip,
	hideTooltip,
} from '../common/components/others/tooltip/tooltip'

export default {
	props: {
		text: String,
	},
	mounted() {
		this.$refs.tooltip.addEventListener('mouseenter', showTooltip)
		this.$refs.tooltip.addEventListener('mouseleave', hideTooltip)
	},
}
</script>
