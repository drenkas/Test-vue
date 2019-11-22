<template lang="pug">
	#app
		.container.container_centered
			transition( name="fade")
				router-view
	
</template>
<script>
import { mapActions } from 'vuex'
import route from '../configRoutes'
export default {
	data: function() {
		return {}
	},
	watch: {
		$route(to) {
			this.changeRoute(to)
		},
	},
	methods: {
		...mapActions({
			readCookie: 'global/readCookie',
			setRef: 'global/setRef',
		}),
		async changeRoute(to) {
			if (to.query.ref_url) {
				this.setRef(to.query.ref_url)
			}
			const cookie = await this.readCookie()
			console.log(cookie)
			if (cookie && to.fullPath !== route.authed)
				this.$router.push(route.authed)
			if (!cookie && to.fullPath === route.authed) this.$router.push(route.auth)
		},
	},
}
</script>

<style lang="scss">
@import './common/style.scss';

.fade-enter-active {
	animation: fadeToggle 1s;
}

.fade-leave {
	display: none !important;
}

.fade-leave-active {
	display: none !important;
}

@keyframes fadeToggle {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

#app {
	padding-top: 30px;
	padding-bottom: 30px;
	min-height: 100vh;
	position: relative;
}

.app__wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.app__title {
	margin-top: 34px;
	margin-bottom: 32px;
}

.footer {
	font-size: 14px;
	line-height: 19px;
	position: absolute;
	bottom: 15px;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	text-align: center;

	a {
		margin: 0 5px;
	}
}
</style>
