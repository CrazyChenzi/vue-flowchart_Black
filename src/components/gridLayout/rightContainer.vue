<template>
  <div>
    <!--vertical-compact  是否采用上下布局 -->
    <grid-layout 
      :layout="nodeList" 
      :col-num="12" 
      :row-height="30" 
      :is-draggable="nodeList.length > 0 ? nodeList[0].drag || nodeList[0].drag === undefined ? true : false : true" 
      :is-resizable="nodeList.length > 0 ? nodeList[0].drag || nodeList[0].drag === undefined ? true : false : true" 
      :vertical-compact="true"  
      :margin="[10, 10]" 
      :use-css-transforms="true">
      <!--item.testY !== undefined ? item.x : item.testY !== undefined ? item.y :-->
      <grid-item v-for="(item,index) in nodeList" :key="index" 
        :x="item.x" 
        :y="item.testY !== undefined ? Number(2 * item.y) : item.y" 
        :w="item.w" 
        :h="item.h" 
        :i="item.i" 
        :id="item.i"
        @resize="resizeEvent" 
        @move="moveEvent" 
        @resized="resizedEvent" 
        @moved="movedEvent" 
        @dblclick.native="toChildren(index)"
        @mouseenter.native.prevent="handleShowPopper(item, $event)" 
        @mouseleave.native.prevent="handleClosePopper(item, $event)"
        ref="gridItem"
        :style="gridStyle(item)">
        <img :src="item.img" style="width: inherit; height: inherit; opacity: 0.7" v-if="item.img !== '' && item.backImg === ''"/>
        <!--<span v-else>{{ item.title }}</span>-->
        <right-container v-if="item.children !== undefined ? item.children.length > 0 ? true : false : false " :nodeList="item.children"></right-container>
      </grid-item>
		</grid-layout>
  </div>
</template>
<script>
  import { GridLayout, GridItem } from 'vue-grid-layout'
  import { mapState } from 'vuex'
  export default {
    name: 'rightContainer',
    components: {
			'grid-layout': GridLayout,
			'grid-item': GridItem
		},
    data() {
      return {
        showPopper: false,
        styles: {},
        mouseenterKey: ''
      }
    },
    props: {
      nodeList: {
        type: Array,
        default: []
      },
      type: {

      }
    },
    computed: {
      ...mapState({
        hoverPopper: state => state.layout.hoverPopper
      })
    },
    methods: {
      gridStyle: function(item) {
        // console.log(item)
        return 'background:' + item.background + ';background-image: url(' + item.img + ');background-repeat: no-repeat;'+
          'width:' + item.width + 'px;height:' + item.height + 'px;background-size:' + item.width + 'px ' + item.height + 'px'
      },
      toChildren: function(index) {
        this.$emit('dblRightConrainer', this.nodeList[index]);
      },
      handleShowPopper: function(item, ev) {
        let hover = {
          showPopper: true,
          node: item,
          left: ev.pageX,
          top: ev.pageY
        }
        this.$store.dispatch('hoverPopper', hover);
        // console.log(item.width)
        // console.log(item.height)
      },
      handleClosePopper: function(item, ev) {
        let hover = {
          showPopper: false,
          node: item,
          left: ev.pageX,
          top: ev.pageY
        }
        this.$store.dispatch('hoverPopper', hover);
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
        for(let j = 0; j < this.nodeList.length; j++) {
          if(this.nodeList[j].i === i) {
            this.nodeList[j].width = newWPx;
            this.nodeList[j].height = newHPx;
            break;
          }
        }
        console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
      },
    }
  }
</script>