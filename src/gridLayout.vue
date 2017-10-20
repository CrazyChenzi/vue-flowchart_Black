<template>
	<layout :leftMenu="leftMenu"></layout>
</template>
<script>
	import layout from './components/gridLayout/layout'
	export default {
		components: {
			layout
		},
		data() {
			return {
				leftMenu: [
					{
						title: '测试1',
						draggable: true,
						img: '',
						backgroundImg: ''
					},
					{
						title: '测试2',
						draggable: true,
						img: '',
						backgroundImg: ''
					},
					{
						title: '图标1',
						draggable: true,
						img: '../static/img/demo.jpg',
						backgroundImg: ''
					},
					{
						title: '图标2',
						draggable: true,
						img: '../static/img/demo1.png',
						backgroundImg: ''
					},
					{
						title: '背景1',
						draggable: true,
						img: '',
						backgroundImg: '../static/img/demo1.png'
					}
				]
			}
		},
		methods: {
    }
	}
</script>
<style lang="scss" scoped>
  .layout {
    height: calc(100vh);
    overflow: hidden;
  }
  .layout-left {
    background: #f90;
    @extend .layout;
  }
</style>