<template>
  <div class="leftmenu">
     <div class="com_last" v-for="(item, index) in leftArray" :key="index">
        <span
            class="tree-node-title"
            :draggable="item.draggable"
            @dragstart="dragHandle"
            :id="item.id"
            :title="item.title"
            @click.stop.prevent="toggleTreeNode"
            v-if="!item.isImg"
           >
            {{ item.title }}
        </span>
        <img
          :src="item.img"
          :id="item.id"
          :title="item.title"
          @dragstart="dragHandle"
          @click.stop.prevent="toggleTreeNode"
          :draggable="item.draggable"
          class="tree-node-title"
          v-else />
     </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'leftmenu',
  props: {
    leftArray: {
      type: Array,
      default: [],
      required: true
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      treeNodeStatus: 'close'
    }
  },
  methods: {
    ...mapMutations([
      'SET_EVENTCHILD'
    ]),
    toggleTreeNode: function () {
      let _t = this
      _t.treeNodeStatus = _t.treeNodeStatus === 'open' ? 'close' : 'open'
    },
    dragHandle: function (event) {
      // 拖拽的节点数据
      let nodeInfo = {
        id: event.target.id,
        title: event.target.title,
        // 唯一标识，防止在画布上拖拽时重复生成
        nodeKey: 'node-' + ((new Date()).getTime())
      }
      let nodeImgInfo = {
        id: event.target.id,
        title: event.target.title,
        img: event.target.src,
        // 唯一标识，防止在画布上拖拽时重复生成
        nodeKey: 'node-' + ((new Date()).getTime())
      }
      if(event.target.src !== undefined) {
         event.dataTransfer.setData('Text', JSON.stringify(nodeImgInfo))
         this.SET_EVENTCHILD(event);
      }else {
         event.dataTransfer.setData('Text', JSON.stringify(nodeInfo))
         this.SET_EVENTCHILD(event);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
   .leftmenu {
      padding: 5px 10px;
   }
   .tree-node-title {
      padding: 10px 0;
      display: inline-block;
      border: 2px solid #fff;
      width: 100%;
      text-align: center;
      border-bottom: none;
   }
   .com_last:last-child {
      border-bottom: 2px solid #fff;
   }
</style>
