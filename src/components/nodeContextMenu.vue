<template lang="html">
  <div class="canvas-contextmenu" v-show="contextmenu.isShow" :style="style" :menu="menu">
     <ul v-if="menu.type === 'canvas'">
       <li @click="handleClick('canvas-create', $event)">新建</li>
       <li @click="handleClick('canvas-save', $event)">保存</li>
       <li @click="handleClick('canvas-empty', $event)">清空面板</li>
     </ul>
     <ul v-if="menu.type === 'node'">
       <li @click="handleClick('node-edit', $event)">编辑节点</li>
       <li @click="handleClick('node-remove', $event)">删除节点</li>
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
      props: {
         menu: {
            type: Object
         }
      },
      computed: {
        ...mapState([
          'nodeList', 'contextmenu', 'editClickNum', 'editNodeKey'
       ]),
       style: function () {
         let _t = this
         return {
           left: parseInt(_t.contextmenu.positionX) + 'px',
           top: parseInt(_t.contextmenu.positionY) + 'px'
         }
       }
      },
      methods: {
         handleClick: function(type, event) {
            switch(type) {
               case 'canvas-create':
                  if(this.nodeList.length > 0) {
                     this.$Modal.confirm({
                       title: '新建面板',
                       content: '<p>面板中有内容尚未保存，确定新建？</p>',
                       onOk: () => {
                           this.$Message.info('点击了确定');
                           this.$store.dispatch('nodeLists', [])
                           this.$store.dispatch('editClickNum', 0)
                           this.$store.dispatch('isShowEdit', false)
                       },
                       onCancel: () => {
                           this.$Message.info('点击了取消');
                       }
                     });
                  }else {
                     this.$store.dispatch('nodeLists', [])
                  }
                  break;
               case 'canvas-save':
                  alert("尚未完成")
                  break;
               case 'canvas-empty':
                  if(this.nodeList.length > 0) {
                     this.$Modal.confirm({
                       title: '清空面板',
                       content: '<p>面板中有内容尚未保存，确定清空？</p>',
                       onOk: () => {
                           this.$Message.info('点击了确定');
                           this.$store.dispatch('nodeLists', [])
                           this.$store.dispatch('editClickNum', 0)
                           this.$store.dispatch('isShowEdit', false)
                       },
                       onCancel: () => {
                           this.$Message.info('点击了取消');
                       }
                     });
                  }else {
                     this.$store.dispatch('nodeLists', [])
                  }
                  break;
               case 'node-edit':
                  this.$store.dispatch('isShowEdit', true)
                  this.$store.dispatch('editClickNum', this.editClickNum + 1)
                  break;
               case 'node-remove':
                  this.nodeList.forEach((item, index) => {
                     if(item.nodeKey === this.contextmenu.id) {
                        if(this.editNodeKey === item.nodeKey) {
                           this.$Modal.confirm({
                             title: '确认删除',
                             content: '<p>该面板正处于编辑状态，确认删除？</p>',
                             onOk: () => {
                                 this.$Message.info('点击了确定');
                                 this.$store.dispatch('isShowEdit', false)
                                 this.$store.dispatch('editNodeKey', '')
                                 this.nodeList.splice(index, 1)
                             },
                             onCancel: () => {
                                 this.$Message.info('点击了取消');
                             }
                           });
                        }else {
                           this.nodeList.splice(index, 1)
                        }
                     }
                  })
                  break;
            }
         }
      }
   }
</script>

<style lang="less" scoped>
   .canvas-contextmenu {
     position: absolute;
     z-index: 2500;
     display: inline-block;
     /*height: 120px;*/
     /*width: 100px;*/
     min-width: 100px;
     background: #ffffff;
     border: 1px solid rgba(0, 0, 0, .1);
     box-shadow: 0 0 5px 2px rgba(0, 0, 0, .1);

     ul {
       margin: 0;
       padding: 0;
       border-bottom: 1px solid rgba(0, 0, 0, .1);

       li {
         margin: 0;
         padding: 5px 30px 5px 15px;
         cursor: default;

         &:hover {
           background: #f3f3f3;
         }
       }
     }
     .canvas-contextmenu-item {

     }
   }
</style>
