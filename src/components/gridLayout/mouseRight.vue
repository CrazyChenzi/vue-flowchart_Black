<template>
  <div class="mouse-rightMenu" v-show="mouseRightMenu.isShow && mouseRightMenu.id !== ''" :style="style">
     <ul v-if="mouseRightMenu.id !== ''">
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
    computed: {
      ...mapState({
        mouseRightMenu: state => state.layout.mouseRightMenu,
        layoutNodeList: state => state.layout.layoutNodeList
      }),
      style: function () {
        let _t = this
        return {
          left: parseInt(_t.mouseRightMenu.positionX) + 'px',
          top: parseInt(_t.mouseRightMenu.positionY) + 'px'
        }
      }
    },
    methods: {
      handleClick: function(type, ev) {
        switch(type) {
          case 'node-edit':
            alert("未完成")
            break;
          case 'node-remove':
            for(let j = 0; j < this.layoutNodeList.length; j++) {
              if(this.layoutNodeList[j].i === this.mouseRightMenu.id) {
                this.layoutNodeList.splice(j, 1);
              }
            }
            this.$store.dispatch('layoutNodeList', this.layoutNodeList);
            break;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .mouse-rightMenu {
     position: absolute;
     z-index: 80;
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
  }
</style>