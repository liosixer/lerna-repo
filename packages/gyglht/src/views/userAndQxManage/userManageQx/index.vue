<template>
  <section class="container">
    <AsignRight></AsignRight>
    <AsignUser></AsignUser>
  </section>
</template>

<script>
import AsignRight from './assignRight'
import AsignUser from './assignUser'
export default {
  name: 'spPersonSz',
  data () {
    return {
    }
  },
  components: {
    AsignUser,
    AsignRight
  },
  methods: {},
  create () {
  },
  mounted () { },
  destroyed () { },
  watch: {
  },
}

</script>

<style lang="scss" scoped>
.container {
  width: 100%;
}
</style>