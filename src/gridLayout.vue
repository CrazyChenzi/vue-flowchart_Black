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
						draggable: true
					},
					{
						title: '测试2',
						draggable: true
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