<template>
  <div class="card-header">
    <div class="tab-groups">
      <div
        v-for="(item, index) in tabs"
        :key="index"
        class="tab-item"
        :class="[
          item.code == tabValue ? 'active' : '',
          index == 0
            ? 'tab-item__first'
            : index == tabs.length - 1
            ? ' tab-item__last'
            : ' tab-item__center',
        ]"
        @click="btnTab(item.code)"
      >
        {{ item.name + (item.suffix ? item.suffix : '') }}
      </div>
    </div>
    <div class="tools-group">
      <el-button type="text" @click="onSearch">
        <img
          src="../../../../../assets/images/frame/filter.png"
          class="i-filter"
        />高级筛选
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardHeader',
  props: {
    tabs: {
      type: Array,
      default: () => [],
      required: true,
    },
    tabValue: {
      type: String | Number,
      required: true,
    },
    onSearch: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    btnTab(val) {
      this.$emit('update:tabValue', val);
    },
  },
};
</script>
