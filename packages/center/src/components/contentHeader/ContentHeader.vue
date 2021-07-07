<template>
  <div class="global-title">
    <navigator />
    <div class="global-title-box" v-if="$slots.btns || title">
      <span class="global-title-name">{{ title }}</span>
      <div class="global-title-btns fr">
        <slot name="btns"></slot>
      </div>
    </div>
  </div>

</template>

<script>
  import navigator from '../navigator/Navigator'
  export default {
    props: {
      title: String,
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
    padding: 20px 0 5px;
  }
  .c-header-contr {
    display: flex;
    justify-content: space-between;
    clear: both;
    line-height: 50px;
    h2 {
      font-size: 16px;
      font-weight: normal;
    }
    // .c-header-box {
    // 	position: relative;
    // 	bottom: 5px;
    // }
  }
</style>
