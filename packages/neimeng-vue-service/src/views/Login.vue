<template>
	<div class="login">
		<div class="login-box">
			<el-button @click="login" type="primary">点击登录</el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: "Home",
	components: {},
	methods: {
		async login() {
			// var result = await this.portService.Login({EnumUserType: 1, UserCode: '01'})
			this.$router.push({ path: "/dashboard" });
			// this.$store.dispatch("user/login", { username: "admin", password: 123 });
		},
	},
};
</script>
<style lang="scss" scoped>
.login {
	height: 100%;
	background: url("../assets/images/login/bg.jpg") center center no-repeat;
	background-size: cover;

	.login-box {
		position: absolute;
		top: 40%;
		left: 50%;
	}
}
</style>
