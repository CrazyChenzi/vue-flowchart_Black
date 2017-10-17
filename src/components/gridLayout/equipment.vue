<template>
  <div style="margin: 10px 10px">
    <img v-for="items in layoutNodeChildrens" :key="items.key" :src="items.src"
        :width="items.parentsWidth/4" :height="items.parentsHeight/3"
        style="margin: 10px 0; margin-left: 10px" draggable="false"/>
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
    }
  }
</script>
<style scoped>

</style>