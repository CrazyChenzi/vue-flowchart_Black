<template>
  <div 
    @drop="dropHandle($event)" 
    @dragover="allowDrop($event)" 
    class="layout-container" 
    @click="clickPanel"
    @contextmenu.stop.prevent="canvasRightClick">
    <grid-layout 
			:layout="layoutNodeList" 
			:col-num="12" 
			:row-height="30" 
			:is-draggable="true" 
			:is-resizable="true" 
			:vertical-compact="true" 
			:margin="[10, 10]" 
			:use-css-transforms="true">
			<grid-item v-for="(item,index) in layoutNodeList" :key="index" 
				:x="item.x" 
				:y="item.y" 
				:w="item.w" 
				:h="item.h" 
				:i="item.i" 
        :id="item.i"
				@resize="resizeEvent" 
				@move="moveEvent" 
				@resized="resizedEvent" 
				@moved="movedEvent" 
        @dblclick.native="toChildren(index)"
        ref="gridItem"
				style="background-color:#e9eaec">
				<!--{{ item.i }} "+" {{ item.title }}-->
        <equipment :layoutNodeChildrens="layoutNodeChildren" 
        v-if="layoutNodeChildren.length > 0 ? layoutNodeChildren[0].key === item.i ? true : false : false"></equipment>
			</grid-item>
		</grid-layout>
    <mouse-right></mouse-right>
  </div>
</template>
<script>
  import { GridLayout, GridItem } from 'vue-grid-layout'
  import { mapState } from 'vuex'
  import equipment from './equipment'
  import mouseRight from './mouseRight'
  var testLayout = [
	];
  export default {
    components: {
			'grid-layout': GridLayout,
			'grid-item': GridItem,
      equipment,
      'mouse-right': mouseRight
		},
    data() {
      return {
        layout: []
      }
    },
    computed: {
      ...mapState({
        layoutNodeList: state => state.layout.layoutNodeList,
        layoutNodeChildren: state => state.layout.layoutNodeChildren,
        layoutParentStyle: state => state.layout.layoutParentStyle,
        mouseRightMenu: state => state.layout.mouseRightMenu
      })
    },
    methods: {
      dropHandle: function(ev) {
        let setEv = JSON.parse(ev.dataTransfer.getData('Text'))
        this.layoutNodeList.push(JSON.parse(ev.dataTransfer.getData('Text')))
        this.$store.dispatch('layoutNodeList', this.layoutNodeList);
        this.layout = this.layoutNodeList;
        setTimeout(()=> {
          let style = {
            key: setEv.i,
            width: this.$refs.gridItem[this.layoutNodeList.length-1].interactObj.target.offsetWidth,
            height: this.$refs.gridItem[this.layoutNodeList.length-1].interactObj.target.offsetHeight
          }
          this.layoutParentStyle.push(style);
          this.$store.dispatch('layoutParentStyle', this.layoutParentStyle);
        },100)
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
        this.$store.dispatch('mouseRightMenu', params);
      },
      clickPanel: function() {
        this.$store.dispatch('mouseRightMenu', {});
      },
      toChildren: function(index) {
         let params = [
          {
            src: '../../../static/img/demo.jpg',
            title: '设备1',
            key: this.layoutNodeList[index].i,
            parentsWidth: this.layoutParentStyle[index].width,
            parentsHeight: this.layoutParentStyle[index].height
          },
          {
            src: '../../../static/img/demo1.png',
            title: '设备2',
            key: this.layoutNodeList[index].i,
            parentsWidth: this.layoutParentStyle[index].width,
            parentsHeight: this.layoutParentStyle[index].height
          }
        ];
        if(this.layoutNodeList.length === 1) {
          this.$store.dispatch('layoutNodeChildren', params);
        }
        this.$Modal.confirm({
          title: '编辑子集',
          content: '<p>面板中有内容尚未保存，确定继续？</p>',
          onOk: () => {
            this.$Message.info('点击了确定');
            this.$store.dispatch('layoutNodeList', []);
          },
          onCancel: () => {
            this.$Message.info('点击了取消');
          }
        });
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
        styleBreak : for(let j = 0; j < this.layoutParentStyle.length; j++) {
          if(this.layoutParentStyle[j].key === i) {
            this.layoutParentStyle[j].width = newWPx;
            this.layoutParentStyle[j].height = newHPx;
            for(let k = 0; k < this.layoutNodeChildren.length; k++) {
              if(this.layoutNodeChildren[k].key === this.layoutParentStyle[j].key) {
                this.layoutNodeChildren[k].parentsWidth = newWPx;
                this.layoutNodeChildren[k].parentsHeight = newHPx;
              }
              if(k === this.layoutNodeChildren.length) {
                break styleBreak
              }
            }
          }
        }
        this.$store.dispatch('layoutParentStyle', this.layoutParentStyle);
        this.$store.dispatch('layoutNodeChildren', this.layoutNodeChildren);
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