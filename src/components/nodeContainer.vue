<template lang="html">
   <div class="node-box"
      @drop.prevent="dropHandle"
      @dragover.stop.prevent
   >
      <node
         v-for="item in nodeList"
         :nodeInfo="item"
         :key="item.nodeKey"
         @indexReturn="selectIndex"
      ></node>
      <!-- {{nodeLists[0].nodeKey}} -->
   </div>
</template>

<script>
   import node from './node.vue'
   import { mapState, mapMutations } from 'vuex'
   export default {
      components: {
         node
      },
      data() {
         return {
            index: 0
         }
      },
      props: {
         nodeLists: {
            type: Array
         }
      },
      computed: {
         ...mapState([
            'nodeList'
         ])
      },
      watch: {

      },
      mounted() {
      },
      methods: {
         ...mapMutations([
   			'SET_NODELIST'
   		]),
         selectIndex : function(index) {
            this.index = index;
         },
         isJSON : function(str) {
             if (typeof str == 'string') {
                 try {
                     JSON.parse(str);
                     return true;
                 } catch(e) {
                     // console.log(e);
                     return false;
                 }
             }
             console.log('It is not a string!')
         },
         dropHandle : function(event) {
            console.log(event)
            // 更新当前节点位置信息
            let _this = this
            // 获取节点数据
            let nodeInfo
            if(this.isJSON(event.dataTransfer.getData('Text'))) {
               nodeInfo = JSON.parse(event.dataTransfer.getData('Text'))
               let nodeKey = nodeInfo['nodeKey']
               let offsetX = event.offsetX
               let offsetY = event.offsetY
               let style
               if (event.target.tagName.toLowerCase() === 'svg') {
                  style = 'left: ' + offsetX + 'px; top: ' + offsetY + 'px'
               } else {
                  style = 'left: ' + offsetX + 'px; top: ' + offsetY + 'px'
               }
               // 处理样式
               nodeInfo['style'] = style
               // 处理拖拽 FIXME !!! 后期应该是只有在编辑状态时才可以拖动
               nodeInfo['draggable'] = true
            }else {
               let offsetX = event.offsetX
               let offsetY = event.offsetY
               this.nodeList[this.index].style = 'left: ' + offsetX + 'px; top: ' + offsetY + 'px';
               // let offsetX = event.offsetX
               // let offsetY = event.offsetY
               // console.log(event.dataTransfer.getData('Text'))
               // nodeInfo = event.dataTransfer.getData('Text')
               // console.log(JSON.parse(event.dataTransfer.getData('Text')))
            }

            // let nodeKey = nodeInfo['nodeKey']
            // 如果不存在则退出
            // if (!_this.nodeList[nodeKey]) {
            //   return
            // }
            // let offsetX = event.offsetX
            // let offsetY = event.offsetY
            // let style
            // if (event.target.tagName.toLowerCase() === 'svg') {
            //   style = 'left: ' + offsetX + 'px; top: ' + offsetY + 'px'
            // } else {
            //   let nodeDom = document.querySelector('[nodeKey="' + nodeKey + '"]')
            //   console.log(nodeDom)
            //   offsetX = parseInt(nodeDom.style.left) + offsetX
            //   offsetY = parseInt(nodeDom.style.top) + offsetY
            //   style = 'left: ' + offsetX + 'px; top: ' + offsetY + 'px'
            // }

            // 处理样式
            // nodeInfo['style'] = style
            // 处理拖拽 FIXME !!! 后期应该是只有在编辑状态时才可以拖动
            // nodeInfo['draggable'] = true
            // _this.nodeList[nodeKey] = {
            //   ..._this.nodeList[nodeKey],
            //   ...nodeInfo
            // }
            // _this.$store.dispatch('flowchartNodeList', _this.nodeList)
            // this.array.push(nodeInfo)
         }
      }
   }
</script>

<style lang="less" scoped>
   .node-box {
      position: absolute;
      z-index: 1000;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
   }
</style>
