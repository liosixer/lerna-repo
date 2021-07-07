<template>
  <div style="width: 400px; margin: 50px auto">
    <Tree
        :showCheckbox="false"
        :checkeds="val ? val.split(','): []"
        :nodes="data"
        v-model="val"
        treeId="hangYeFenLeiDaiMa"
        nodeKey="hangYeFenLeiDaiMa"
        refName="hangYeFenLei"
        :fullPath="true"
        objed
        :defaultProps="{ children: 'children', label: 'hangYeFenLeiName' }"
    />
    <p>{{val}}</p>
  </div>
</template>
<script>
import data from './data'
import Tree from '@/components/tree/Tree'
export default {
  data () {
    return {
      data,
      val: 'J664,J67'
    }
  },
  components: {
    Tree
  }
}
</script>
