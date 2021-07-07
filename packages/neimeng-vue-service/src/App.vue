<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import * as globalSetting from "@/setting";
import bus from "./bus/bus";
export default {
  name: "Home",
  provide: { globalSetting },
  components: {},
  created() {
    // console.log(this.enum.IndustryClassify());
    if (sessionStorage.getItem("vuex")) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("vuex"))))
      this.$store.dispatch("addloginStaues", true)
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里面
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("vuex", JSON.stringify(this.$store.state))
    })
  },
  mounted() {
    /* bus.$on('againLogin',()=>{
      this.$router.replace({
        path:'/login'
      })
    }) */
    // if(this.$store.state.loginCookie.access_token===""&&window.location.href.indexOf("#/login")===-1&&window.location.hash!="#/"&&window.location.hash!="#/login"){
    //   this.$router.push({ path: "/login" })
		// 	this.$message({
		// 		type: "warning",
		// 		center: true,
		// 		duration: 2000,
		// 		message: "未登陆,请先登陆系统!"
    //   });
    // }
  },
  methods: {

  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
</style>
