<template>
  <div class="layout">
    <Row>
      <Col span="4" class="layout-left">
        <grid-left-menu :leftMenu="leftMenu"></grid-left-menu>
      </Col>
      <Col span="20">
        <grid-right-container></grid-right-container>
      </Col>
    </Row>
  </div>
</template>
<script>
  import gridLeftMenu from './gridLeftMenu'
  import gridRightContainer from './gridRightContainer'
  export default {
    components: {
      'grid-left-menu': gridLeftMenu,
      'grid-right-container': gridRightContainer
    },
    data() {
      return {

      }
    },
    props: {
      leftMenu: {
        type: Array
      }
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