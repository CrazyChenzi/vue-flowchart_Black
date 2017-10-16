<template lang="html">
  <div class="flowchart-container" @drop.stop.prevent="dropHandle" @contextmenu.stop.prevent="canvasRightClick" @click="displayRightMenu">
     <node-container></node-container>
     <node-context-menu :menu="menu"></node-context-menu>
     <node-option></node-option>
  </div>
</template>

<script>
   import nodeContainer from './nodeContainer.vue'
   import nodeContextMenu from './nodeContextMenu.vue'
   import nodeOption from './nodeOption.vue'
   import { mapState, mapMutations } from 'vuex'
   export default {
      components: {
         'node-container': nodeContainer,
         'node-context-menu': nodeContextMenu,
         'node-option': nodeOption
      },
      data() {
         return {
            nodeArray: [],
            menu: {
               type: ''
            }
         }
      },
      props: {
         node: {
            type: Object
         }
      },
      computed: {
        ...mapState([
          'nodeList', 'contextmenu'
       ])
      },
      mounted() {
         console.log(this.nodeList)
      },
      watch: {

      },
      methods: {
         ...mapMutations([
   		   'SET_NODELIST'
   		]),
         displayRightMenu: function () {
            if(this.contextmenu.isShow !== undefined) {
               this.contextmenu.isShow = false;
            }
         },
         // 画布rightClick
         canvasRightClick: function (event) {
           let _this = this
           let offsetX
           let offsetY

           if (typeof event.target.className === 'string' && event.target.className.indexOf('node-box') < 0) {
             offsetX = parseInt(event.target.style.left) + parseInt(event.offsetX)
             offsetY = parseInt(event.target.style.top) + parseInt(event.offsetY)
             this.menu.type = "node"
           } else {
             this.menu.type = "canvas"
             offsetX = parseInt(event.offsetX)
             offsetY = parseInt(event.offsetY)
           }
           let rightMenu = {
             isShow: true,
             positionX: offsetX,
             positionY: offsetY,
             id: event.target.id
           }
           _this.$store.dispatch('contextmenu', rightMenu)
         },
         dropHandle : function(event) {
            let _this = this
            // 获取节点数据
            let nodeInfo = JSON.parse(event.dataTransfer.getData('Text'))
            let offsetX = event.offsetX
            let offsetY = event.offsetY
            let style = 'left: ' + offsetX + 'px; top: ' + offsetY + 'px'

            // 处理id
            nodeInfo['baseId'] = nodeInfo['id']
            nodeInfo['id'] = 'canvas-' + nodeInfo['id']
            // 处理样式
            nodeInfo['style'] = style
            // 处理拖拽
            nodeInfo['draggable'] = true
            // 节点索引
            let countNode = 0
            for (let nodeKey in _this.nodeList) {
              if (nodeKey && _this.nodeList[nodeKey]) {
                countNode++
              }
            }
            nodeInfo['index'] = countNode
            // 节点状态
            nodeInfo['status'] = ''
            // _this.nodeList[nodeInfo.nodeKey] = nodeInfo
            _this.nodeList.push(nodeInfo)
            _this.$store.dispatch('nodeLists', _this.nodeList)
            // console.log(this.nodeList)
         }
      }
   }
</script>

<style lang="less" scoped>
   .flowchart-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      padding: 10px;
      border: 1px solid red;
   }
</style>
