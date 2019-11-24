<template lang="pug">
	ul.pagination
		li.pagination__item
			button(type="button" @click="onClickFirstPage" :disabled="isInFirstPage") First

		li.pagination__item.pagination__item_mar
			button(
				type="button"
				@click="onClickPreviousPage"
				:disabled="isInFirstPage"
			) Previous

		li.pagination__item(v-for="page in pages")
			button(
				type="button"
				@click="onClickPage(page.name)"
				:disabled="page.isDisabled"
				:class="{ active: isPageActive(page.name) }"
			) {{ page.name }}

		li.pagination__item.pagination__item_mar
			button(type="button" @click="onClickNextPage" :disabled="isInLastPage") Next

		li.pagination__item
			button(type="button" @click="onClickLastPage" :disabled="isInLastPage") Last
</template>

<script>
export default {
	props: {
		maxVisibleButtons: {
			type: Number,
			required: false,
			default: 3,
		},
		totalPages: {
			type: Number,
			required: true,
		},
		currentPage: {
			type: Number,
			required: true,
		},
	},
	computed: {
		startPage() {
			if (this.currentPage === 1) {
				return 1
			}

			if (this.currentPage === this.totalPages) {
				const temp = this.totalPages - this.maxVisibleButtons + 1
				return temp <= 0 ? 1 : temp
			}

			return this.currentPage - 1
		},
		endPage() {
			return Math.min(
				this.startPage + this.maxVisibleButtons - 1,
				this.totalPages
			)
		},
		pages() {
			const range = []

			for (let i = this.startPage; i <= this.endPage; i += 1) {
				range.push({
					name: i,
					isDisabled: i === this.currentPage,
				})
			}

			return range
		},
		isInFirstPage() {
			return this.currentPage === 1
		},
		isInLastPage() {
			return this.currentPage === this.totalPages
		},
	},
	methods: {
		onClickFirstPage() {
			this.$emit('pagechanged', 1)
		},
		onClickPreviousPage() {
			this.$emit('pagechanged', this.currentPage - 1)
		},
		onClickPage(page) {
			this.$emit('pagechanged', page)
		},
		onClickNextPage() {
			this.$emit('pagechanged', this.currentPage + 1)
		},
		onClickLastPage() {
			this.$emit('pagechanged', this.totalPages)
		},
		isPageActive(page) {
			return this.currentPage === page
		},
	},
}
</script>

<style lang="scss" scoped>
.pagination {
	list-style-type: none;
}

.pagination__item {
	display: inline-block;
	list-style-type: none;
	&::before {
		display: none;
	}

	&_mar {
		margin: 0 5px;
	}
}

.active {
	background-color: #4aae9b;
	color: #ffffff;
}
</style>
