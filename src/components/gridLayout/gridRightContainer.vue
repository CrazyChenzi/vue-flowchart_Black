<template>
  <div 
    @drop="dropHandle($event)" 
    @dragover="allowDrop($event)" 
    class="layout-container" 
    @click="clickPanel"
    @contextmenu.stop.prevent="canvasRightClick">
    <mouse-right></mouse-right>
    <dbl-model :dblChildrenModel="dblChildrenModel" @dblReturn="getDblReturn"></dbl-model>
    <right-container :nodeList="layoutNodeList" @dblRightConrainer="toChildren"></right-container>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import equipment from './equipment'
  import mouseRight from './mouseRight'
  import dblModel from './dblModel'
  import rightContainer from './rightContainer'
  var testLayout = [
	];
  export default {
    components: {
      equipment,
      'mouse-right': mouseRight,
      'dbl-model': dblModel,
      'right-container': rightContainer
		},
    data() {
      return {
        layout: [],
        dblChildrenModel: false,
        index: 0
      }
    },
    computed: {
      ...mapState({
        layoutNodeList: state => state.layout.layoutNodeList,
        layoutNodeChildren: state => state.layout.layoutNodeChildren,
        layoutParentStyle: state => state.layout.layoutParentStyle,
        mouseRightMenu: state => state.layout.mouseRightMenu,
        parentParams: state => state.layout.parentParams,
        nodeListStorage: state => state.layout.nodeListStorage
      })
    },
    methods: {
      dropHandle: function(ev) {
        let setEv = JSON.parse(ev.dataTransfer.getData('Text'))
        setEv.width = 200
        setEv.height = 70
        setEv.background = '#2d8cf0'
        if(this.parentParams.parentKey !== undefined) {
          setEv.parentParams = this.parentParams
          setEv.background = '#e84646'
        }
        console.log(setEv)
        // setTimeout(()=> {
        //   setEv.width = this.$refs.gridItem[this.layoutNodeList.length-1].interactObj.target.offsetWidth,
        //   setEv.height = this.$refs.gridItem[this.layoutNodeList.length-1].interactObj.target.offsetHeight
        //   // this.layoutParentStyle.push(style);
        //   // this.$store.dispatch('layoutParentStyle', this.layoutParentStyle);
        // },100)
        this.layoutNodeList.push(setEv)
        this.$store.dispatch('layoutNodeList', this.layoutNodeList);
        this.layout = this.layoutNodeList;
        console.log(this.layoutNodeList)
      },
      allowDrop: function(ev) {
        ev.preventDefault();
      },
      canvasRightClick: function(event) {
        let offsetX = parseInt(event.layerX)
        let offsetY = parseInt(event.layerY)
        let params = {
          positionX: offsetX,
          positionY: offsetY,
          type: 'node',
          id: event.target.id,
          isShow: true
        }
        console.log(params)
        console.log(event)
        this.$store.dispatch('mouseRightMenu', params);
      },
      clickPanel: function() {
        this.$store.dispatch('mouseRightMenu', {});
      },
      toChildren: function(msg) {
        console.log(msg.i)
        if(this.parentParams.parentKey !== undefined) {
          this.dblChildrenModel = true;
        }else {
          this.$Modal.confirm({
            title: '编辑子集',
            content: '<p>面板中有内容尚未保存，确定继续？继续后将会为你暂存内容!</p>',
            onOk: () => {
              this.$Message.info('点击了确定');
              this.$store.dispatch('nodeListStorage', this.layoutNodeList);
              let params = {
                parentKey: msg.i,
                parentWidth: msg.width,
                parentHeight: msg.height,
                parentW: msg.w,
                parentH: msg.h,
                parentX: msg.x,
                parentY: msg.y
              }
              console.log(msg)
              this.$store.dispatch('parentParams', params);
              this.$store.dispatch('layoutNodeList', []);
            },
            onCancel: () => {
              this.$Message.info('点击了取消');
            }
          });
        }
      },
      getDblReturn: function(name) {
        switch(name) {
          case 'exit': 
            this.dblChildrenModel = false
            break;
          case 'ok':
            this.dblChildrenModel = false
            this.setLocalS(this.layoutNodeList, this.index)
            break;
          case 'return':
            this.dblChildrenModel = false
            let parentKey = this.layoutNodeList[0].parentParams.parentKey;
            for(let j = 0; j < this.nodeListStorage.length; j++) {
              if(this.nodeListStorage[j].i === parentKey) {
                this.nodeListStorage[j].children = [];
                this.layoutNodeList.forEach((item, index) => {
                  item.width = (item.width/(document.documentElement.clientWidth - 319.98 - 20)) * item.parentParams.parentWidth;
                  item.height = (item.height/(document.documentElement.clientHeight  - 20)) * item.parentParams.parentHeight;
                  item.drag = false;
                  item.w = (item.w / 12) * item.parentParams.parentW;
                  item.h = (item.h / 30) * item.parentParams.parentH;
                  // item.x = (item.x / 10) * item.parentParams.parentX;
                  item.testY = true;
                  // item.y = (item.parentParams.parentY + item.y/4*item.parentParams.parentH);
                  if(index === 1) {
                    // item.y = 2
                  }
                  // *(item.parentParams.parentH/document.documentElement.clientHeight)
                })
                console.log(this.layoutNodeList)
                setTimeout(() => {
                  this.nodeListStorage[j].children = this.layoutNodeList;
                  this.$store.dispatch('layoutNodeList', []);
                  this.$store.dispatch('layoutNodeList', this.nodeListStorage);
                  this.$store.dispatch('nodeListStorage', []);
                  console.log(this.layoutNodeList)
                }, 200)
                
              }
            }
            console.log(parentKey)
            // this.$store.dispatch('layoutNodeChildren', array)
            // this.$store.dispatch('layoutNodeList', parents);
            // console.log(this.layoutNodeChildren)
            break;
        }
        console.log(name)
      },
      moveEvent: function(i, newX, newY){
        console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
      },
      resizeEvent: function(i, newH, newW){
        console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW);
      },
      movedEvent: function(i, newX, newY){
        console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
      },
      /**
     * 
     * @param i the item id/index
     * @param newH new height in grid rows 
     * @param newW new width in grid columns
     * @param newHPx new height in pixels
     * @param newWPx new width in pixels
     * 
     */
      resizedEvent: function(i, newH, newW, newHPx, newWPx){
        styleBreak : for(let j = 0; j < this.layoutNodeList.length; j++) {
          if(this.layoutNodeList[j].i === i) {
            this.layoutNodeList[j].width = newWPx;
            this.layoutNodeList[j].height = newHPx;
          }
        }
        this.$store.dispatch('layoutNodeList', this.layoutNodeList);
        console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
      },
    }
  }
</script>
<style scoped>
  .layout-container {
    width: 100%;
    height: calc(100vh);
    overflow: hidden;
    padding: 10px;
    border: 2px solid red;
    position: absolute;
  }
</style>