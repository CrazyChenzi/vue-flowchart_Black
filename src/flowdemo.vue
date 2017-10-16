<template>
   <div class="flowdemo">
      <Row>
         <Col span="4" class="flowdemo" style="background: #f90">
            <left-menu :leftArray="leftArray"></left-menu>
         </Col>
         <Col span="20" class="flowdemo" style="background: #19be6b">
            <right-container :node="node"></right-container>
         </Col>
      </Row>
   </div>
</template>
<script>
   import leftmenu from './components/leftmenu.vue'
   import rightContainer from './components/rightContainer.vue'
   import { mapState, mapMutations } from 'vuex'
   export default {
      data() {
         return {
            leftArray: [
               {
                   id: '1',
                   title: '组件1',
                   isImg: false,
                   draggable: true
               },
               {
                   id: '2',
                   title: '组件2',
                   isImg: false,
                   draggable: true
               },
               {
                   id: '3',
                   title: '组件3',
                   isImg: false,
                   draggable: true
               },
               {
                  id: '4',
                  title: '组件4',
                  isImg: true,
                  img: '../static/img/demo.jpg',
                  draggable: true
               },
               {
                   id: '5',
                   title: '组件5',
                   isImg: false,
                   draggable: true
               },
            ],
            node: {}
         }
      },
      computed: {
         ...mapState([
			   'eventChild'
		   ]),
      },
      components: {
         'left-menu': leftmenu,
         'right-container': rightContainer
      },
      methods: {
         allowDrop : function(event) {
            event.preventDefault();
         },
         drop : function(event) {
            var data=JSON.parse(event.dataTransfer.getData("Text"));
            let offsetX
            let offsetY
            if (typeof event.target.className === 'string' && event.target.className.indexOf('canvas-node-box') > -1) {
              if(event.target.style.left === "" || event.target.style.top === "") {
                 offsetX = parseInt(event.offsetX)
                 offsetY = parseInt(event.offsetY)
              }else {
                 offsetX = parseInt(event.target.style.left) + parseInt(event.offsetX)
                 offsetY = parseInt(event.target.style.top) + parseInt(event.offsetY)
              }
            } else {
              offsetX = parseInt(event.offsetX)
              offsetY = parseInt(event.offsetY)
            }
            var para=document.createElement("div");
            var node=document.createTextNode(data.title);
            para.setAttribute("class", data.nodeKey)
            para.appendChild(node);
            para.draggable = true;
            // para.ondrop = this.drop(event);
            para.ondragover = this.allowDrop(event);
            para.style.position = "absolute";
            para.style.left = offsetX + 'px';
            para.style.top = offsetY + 'px';
            para.style.background = 'red';
            para.style.width = '100px';
            para.style.height = '100px';
            event.target.appendChild(para);
            event.preventDefault();
            console.log(para)
         },
         drag : function(event) {
            event.dataTransfer.setData("Text",event.target.id);
         }
      }
   }
</script>
<style lang="less" scoped>
   .flowdemo {
      height: calc(100vh);
      overflow: hidden;
   }
   #div1 {width:100%;height:100%;padding:10px;border:1px solid red;}
</style>
