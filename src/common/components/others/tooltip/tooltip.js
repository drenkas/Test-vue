export default function() {
	const tooltips = document.querySelectorAll('.tooltip')
	tooltips.forEach(tooltip => {
		tooltip.addEventListener('mouseenter', showTooltip)
		tooltip.addEventListener('mouseleave', hideTooltip)
	})
}

export function showTooltip() {
	const info = this.querySelector('.tooltip__info')
	info.classList.remove('tooltip__info_hidden')
	info.classList.add('fadeIn')
	info.classList.remove('fadeOut')
}

export function hideTooltip() {
	const info = this.querySelector('.tooltip__info')
	info.classList.add('fadeOut')
	info.classList.remove('fadeIn')
}
