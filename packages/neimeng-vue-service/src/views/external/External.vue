<template>
  <div class="external">
    <nav-bar :padding="true" />
    <iframe
      id="Iframe"
      ref="externalIframe"
      width="100%"
      style="min-height: calc(100% - 50px);"
      frameborder="0"
      hspace="0"
      :src="src"
    ></iframe>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'External',
  components: { NavBar },
  data() {
    return {
      src: '', // iframe地址
    };
  },
  created() {
    this.src = this.$route.query.src;
  },
};
</script>
