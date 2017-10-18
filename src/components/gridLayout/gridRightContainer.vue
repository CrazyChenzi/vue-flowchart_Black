<template>
  <div 
    @drop="dropHandle($event)" 
    @dragover="allowDrop($event)" 
    class="layout-container" 
    @click="clickPanel"
    @contextmenu.stop.prevent="canvasRightClick">
    <mouse-right></mouse-right>
    <dbl-model :dblChildrenModel="dblChildrenModel" @dblReturn="getDblReturn"></dbl-model>
    <right-container :nodeList="layoutNodeList"></right-container>
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
        childrenKey: state => state.layout.childrenKey
      })
    },
    methods: {
      dropHandle: function(ev) {
        let setEv = JSON.parse(ev.dataTransfer.getData('Text'))
        if(this.childrenKey !== '') {
          setEv.childrenKey = this.childrenKey
        }
        setEv.children = [];
        setEv.children.push(JSON.parse(ev.dataTransfer.getData('Text')))
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
      toChildren: function(index) {
        this.index = index;
        if(this.childrenKey !== '') {
          this.dblChildrenModel = true;
        }else {
          this.$Modal.confirm({
            title: '编辑子集',
            content: '<p>面板中有内容尚未保存，确定继续？</p>',
            onOk: () => {
              this.$Message.info('点击了确定');
              this.setLocalS(this.layoutNodeList, index);
            },
            onCancel: () => {
              this.$Message.info('点击了取消');
            }
          });
        }
      },
      setLocalS: function(array, index) {
        localStorage.parents = {};
        localStorage.parents = JSON.stringify(array);
        console.log(localStorage.parents)
        this.$store.dispatch('childrenKey', array[index].i);
        this.$store.dispatch('layoutNodeList', []);
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
            let array = this.layoutNodeList;
            let parents = JSON.parse(localStorage.parents);
            for(let j = 0; j < array.length; j++) {
              for(let k = 0; k < parents.length; k++) {
                if(array[j].childrenKey === parents[k].i) {
                  array[j].parentsWidth = parents[k].width;
                  array[j].parentsHeight = parents[k].height;
                }
              }
            }
            console.log(array)
            console.log(parents)
            this.$store.dispatch('layoutNodeChildren', array)
            this.$store.dispatch('layoutNodeList', parents);
            console.log(this.layoutNodeChildren)
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