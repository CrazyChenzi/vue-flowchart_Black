<template>
  <div v-show="popper.showPopper" 
    :style="'left:' + this.popper.left + 'px; top:' + this.popper.top + 'px'" class="popper">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      popper: {
        type: Object
      }
    }
  }
</script>
<style scoped>
  .popper{
    width: 200px;
    position: absolute;
    background: #f3f3f3;
  }
</style>