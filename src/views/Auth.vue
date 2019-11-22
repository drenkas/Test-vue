<template lang="pug">
	.auth
		SignIn(v-if="login" v-model="login")
		SignUp(v-else v-model="login")


</template>

<script>
import SignIn from './SignIn'
import SignUp from './SignUp'

export default {
	components: {
		SignIn,
		SignUp,
	},
	data() {
		return {
			login: true,
		}
	},
}
</script>

<style lang="scss"></style>
