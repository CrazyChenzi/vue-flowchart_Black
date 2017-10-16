<template lang="html">
   <div class="canvas-node-options" :class="{ open: isShow }" @contextmenu.stop.prevent @wheel.stop>
     <!-- 表单 -->
     <div class="options-form">
       <div class="options-form-head">
         <div class="options-title">编辑节点</div>
         <div class="options-close" @click="handleClose">
           <Icon type="close"></Icon>
         </div>
       </div>
       <div class="options-form-body">
         <div class="nodata" v-if="!isNoData">暂无配置参数！</div>
         <Spin fix v-if="isLoading">
           <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
           <div>Loading</div>
         </Spin>
         <Form v-if="!isLoading" :model="nodeOptions" label-position="top">
           <FormItem
             v-for="(item, index) in nodeOptions.options"
             :key="index"
             :label="item.label"
             :prop="nodeOptions.options[index].label"
           >
            <div v-if="nodeOptions.options[index].value === 'true' || nodeOptions.options[index].value === 'false'">
               <i-switch size="large" v-model="nodeOptions.options[index].value === 'true' ? true : false">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
               </i-switch>
            </div>
            <Input v-model="nodeOptions.options[index].value"  v-else
            :disabled="index === 1 && nodeOptions.options[1].value === undefined ? true : false"
            :placeholder="index === 1 ? '暂无图标' : '请输入....'"
            ></Input>
          </FormItem>
         </Form>
       </div>
       <div class="options-form-foot">
         <Button type="primary" @click="saveNodeOptions">暂存</Button>
       </div>
     </div>
   </div>
</template>

<script>
   import { mapState } from 'vuex'
   export default {
      data() {
         return {
            nodeOptions: {
               options: []
            },
            isLoading: false,
            isNoData: false
         }
      },
      computed: {
         ...mapState({
           isShow: state => state.isShowEdit,
           nodeList: state => state.nodeList,
           contextmenu: state => state.contextmenu,
           editClickNum: state => state.editClickNum
         })
      },
      watch: {
         editClickNum : function(newVal) {
            let array = [];
            this.nodeOptions.options = [];
            for(let i = 0; i < this.nodeList.length; i++) {
               if(this.nodeList[i].nodeKey === this.contextmenu.id) {
                  array = [
                     {
                        label: '开启拖拽',
                        value: this.nodeList[i].draggable + ''
                     },
                     {
                        label: '图标',
                        value: this.nodeList[i].img
                     },
                     {
                        label: '名字',
                        value: this.nodeList[i].title
                     }
                  ]
                  this.isNoData = true
                  this.nodeOptions.options = array;
                  break;
               }else {
                  this.isNoData = false;
               }
            }
            this.$forceUpdate()
         }
      },
      mounted() {
         // for(let i = 0; i < this.nodeList.length; i++) {
         //    if(this.nodeList[i] === this.contextmenu.id) {
         //       this.nodeOptions = this.nodeList[i];
         //       console.log(this.nodeOptions)
         //       this.isNoData = true;
         //       break;
         //    }else {
         //       this.isNoData = false;
         //       this.$Message.warning("没有匹配到信息");
         //    }
         // }
      },
      methods: {
         saveNodeOptions : function() {

         },
         handleClose : function() {
            this.nodeOptions.options = [];
            this.$store.dispatch('isShowEdit', false)
         }
      }
   }
</script>

<style scoped lang="less">
  .canvas-node-options {
    position: absolute;
    z-index: 2000;
    top: 0;
    right: -300px;
    bottom: 0;
    width: 300px;
    border-left: 1px solid rgba(0, 0, 0, .1);
    transition: right .5s ease-in-out;
    background: #ffffff;
    /*display: none;*/

    &.open {
     right: 0;
     /*display: inline-block;*/
      .options-tab {
        &:hover {
          .ivu-icon {
            transform: rotate(360deg);
          }
        }
        .ivu-icon-chevron-right {
          transform: rotate(0deg);
        }
      }
    }

     .options-form {
       height: 100%;
       width: 100%;
       position: relative;

       .options-form-head {
         position: absolute;
         top: 0;
         width: 100%;
         height: 60px;
         line-height: 60px;
         background: #fff;
         border-bottom: 1px solid rgba(0, 0, 0, .1);

         .options-title {
           display: inline-block;
           float: left;
           padding: 0 15px;
         }
         .options-close {
           display: inline-block;
           float: right;
           padding: 0 15px;
           cursor: default;

           &:hover {
              color: red;
            }
         }
       }
        .options-form-body {
          position: absolute;
          top: 60px;
          bottom: 60px;
          left: 0;
          right: 0;
          overflow: auto;
          padding: 15px;
        }
        .options-form-foot {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 60px;
          line-height: 60px;
          border-top: 1px solid rgba(0, 0, 0, .1);
          text-align: center;
        }
     }

    .options-tab {
      position: absolute;
      left: -20px;
      top: 50%;
      width: 20px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-top: -20px;
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, .1);
      border-right-color: transparent;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
      font-size: 16px;
      cursor: default;

        &:hover {
          .ivu-icon {
            transform: rotate(180deg);
          }
        }

        .ivu-icon {
          transition: transform .5s ease-in-out .1s;
        }
        .ivu-icon-chevron-right {
          display: inline-block;
          transform: rotate(-180deg);
        }
    }

    .nodata {
      text-align: center;
    }
  }
  .spin-icon-load{
    animation: animation-spin 1s linear infinite;
  }
  @keyframes animation-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
</style>
