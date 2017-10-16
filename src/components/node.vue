<template>
   <div>
      <div
         class="node"
         name="node"
         :key="nodeInfo.nodeKey"
         :nodeKey="nodeInfo.nodeKey"
         :style="nodeInfo.style"
         :title="nodeInfo.title"
         :draggable="nodeInfo.draggable"
         :id="nodeInfo.nodeKey"
         @dragstart="dropHandle(nodeInfo.index, $event)"
         v-if="nodeInfo.img === undefined"
         @click="clickNode(nodeInfo.nodeKey)"
      >
         <span class="node-content">
            {{ nodeInfo.title }}
         </span>
      </div>
      <div
         class="node"
         name="node"
         :key="nodeInfo.nodeKey"
         :nodeKey="nodeInfo.nodeKey"
         :style="nodeInfo.style"
         :title="nodeInfo.title"
         :draggable="nodeInfo.draggable"
         :id="nodeInfo.nodeKey"
         @dragstart="dropHandle(nodeInfo.index, $event)"
         v-else
         @click="clickNode(nodeInfo.nodeKey)"
      >
         <img :src="nodeInfo.img" class="img-node" :id="nodeInfo.nodeKey" :style="nodeInfo.style"/>
      </div>
   </div>
</template>
<script>
   import { mapMutations } from 'vuex'
   export default {
      data() {
         return {

         }
      },
      props: {
         nodeInfo: {
            type: Object
         }
      },
      watch: {
         nodeInfo: function(newVal) {
            console.log(newVal)
         }
      },
      methods: {
         dropHandle : function(index, event) {
            this.$emit("indexReturn", index);
         },
         clickNode : function(nodeId) {
            this.$Modal.confirm({
                 title: '确定编辑子级面板？',
                 content: '唯一标识：' + nodeId,
                 onOk: () => {
                     this.$Message.info('点击了确定');
                     this.$store.dispatch('nodeLists', [])
                 },
                 onCancel: () => {
                     this.$Message.info('点击了取消');
                 }
            });
         }
      }
   }
</script>
<style lang="less" scoped>
   .node {
      position: absolute;
      width: 50px;
      height: 50px;
      color: #fff;
      background: red;
   }
   .node:hover {
      opacity: 0.8;
   }
   .img-node {
      width: 100px;
      height: 100px;
   }
</style>
