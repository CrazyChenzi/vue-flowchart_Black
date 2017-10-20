<template>
  <div id="app">
    <router-view/>
    <popper-details :popper="hoverPopper">
      <div v-if="hoverPopper.node !== undefined">{{ hoverPopper.node.title }}</div>
    </popper-details>
  </div>
</template>

<script>
  import popperDetails from '../src/components/gridLayout/popperDetails'
  import { mapState } from 'vuex'
  export default {
    name: 'app',
    components: {
      'popper-details': popperDetails
		},
    data() {
      return {
        styles: {
          width: 500
        }
      }
    },
    computed: {
      ...mapState({
        hoverPopper: state => state.layout.hoverPopper
      })
    }
  }
</script>

<style>
#app {
   margin: 0;
   padding: 0;
   font-size: 14px;
   border: none;
}
</style>
