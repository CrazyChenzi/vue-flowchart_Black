<template>
  <div style="margin: 10px 10px">
    <span  v-for="items in layoutNodeChildrens" :key="items.i" style="margin: 10px 10px">
      <img v-if="items.img !== ''" :src="items.img"
          :width="(items.width/1600) * items.parentsWidth" :height="(items.height/567) * items.parentsHeight" draggable="false" :id="items.childrenKey" />
      <span v-else style="background: red" draggable="false" :style="divStyle(items)" :id="items.childrenKey">{{ items.title }}</span>
    </span>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {

      }
    },
    props: {
      layoutNodeChildrens: {
        type: Array
      }
    },
    computed: {
      ...mapState({
        layoutNodeChildren: state => state.layout.layoutNodeChildren
      })
    },
    methods: {
      divStyle: function(item) {
        console.log(item)
        return 'width:' + item.width/item.w + 'px' + ';' + 'height:' + item.height/item.h + 'px' + ';' 
        + 'display: inline-block' + ';' + 'line-height:' + item.height/item.h + 'px' + ';' + 'text-align: center'
      }
    }
  }
</script>
<style scoped>

</style>