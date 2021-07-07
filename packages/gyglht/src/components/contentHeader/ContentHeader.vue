<template>
  <div class="c-header global-title">
    <!-- <div class="c-header-breadcrumb" v-if="showBreadcrumb">
      <navigator />
    </div> -->
    <div class="c-header-contr">
      <h2 class="c-header-title">{{ title }}</h2>
      <div class="c-header-box">
        <slot name="btns"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import navigator from '../navigator/Navigator'
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    showBreadcrumb: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    navigator,
  },
}
</script>

<style lang="scss" scoped>
.c-header {
  background: #fff;
  overflow: hidden;
  padding: 0 20px;
  border-bottom: #e9e9e9;
  /*margin-bottom: 20px;*/
}
.c-header-breadcrumb {
  width: 100%;
  padding: 25px 0 5px;
}
.c-header-contr {
  display: flex;
  justify-content: space-between;
  clear: both;
  line-height: 50px;
  h2 {
    font-size: 16px;
  }
  // .c-header-box {
  // 	position: relative;
  // 	bottom: 5px;
  // }
}
</style>
