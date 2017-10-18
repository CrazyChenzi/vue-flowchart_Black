<template>
  <div>
    <!--vertical-compact  是否采用上下布局 -->
    <grid-layout 
			:layout="nodeList" 
			:col-num="12" 
			:row-height="30" 
			:is-draggable="true" 
			:is-resizable="true" 
			:vertical-compact="true"  
			:margin="[10, 10]" 
			:use-css-transforms="true">
			<grid-item v-for="(item,index) in nodeList" :key="index" 
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
        <img :src="item.img" style="width: inherit; height: inherit; opacity: 0.7" v-if="item.img !== ''"/>
        <span v-else>{{ item.title }}</span>
        <right-container v-if="item.children !== undefined ? item.children.length > 0 ? true : false : false " :nodeList="item.children"></right-container>
			</grid-item>
		</grid-layout>
  </div>
</template>
<script>
  import { GridLayout, GridItem } from 'vue-grid-layout'
  export default {
    name: 'rightContainer',
    components: {
			'grid-layout': GridLayout,
			'grid-item': GridItem
		},
    data() {
      return {

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
    methods: {
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
        console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
      },
    }
  }
</script>