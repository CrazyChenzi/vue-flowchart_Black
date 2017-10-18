<template>
  <div>
   <ul v-for="(item, index) in leftMenu" :key="index" class="leftUl">
      <li 
        :draggable="item.draggable"
        @dragstart="drag"
        :title="item.title"
        :img="item.img"
      >
      <img :src="item.img" v-if="item.img !== ''" style="width: inherit; height: inherit;" :title="item.title" />
      <span v-else>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapState({
        layoutNodeList: state => state.layout.layoutNodeList
      })
    },
    props: {
      leftMenu: {
        type: Array
      }
    },
    methods: {
      drag: function(event) {
        let params = {
          title: event.target.title,
          img: event.target.src === undefined ? '' : event.target.src,
          i: 'black'+new Date().getTime(),
          x: 0,
          y: 0,
          w: 2,
          h: 2
        }
        // console.log(params)
        // console.log(event)
        // this.layoutNodeList.push(params)
        event.dataTransfer.setData("Text",JSON.stringify(params));
        // this.$store.dispatch('layoutNodeList', this.layoutNodeList);
      }
    }
  }
</script>
<style scoped>
  .leftUl {
    display: inline-block;
    text-align: center;
  }
  .leftUl li {
    height: 50px;
    line-height: 50px;
    border: 1px solid #eee;
    border-bottom:none;
    width: calc(100/24*3.9vw);
    margin-left: calc(100/24*0.05vw);
    margin-top: calc(100/24*0.05vw);
    cursor: move;
  }
  .leftUl li:last-child {
    border-bottom: 1px solid #eee;
  }
</style>