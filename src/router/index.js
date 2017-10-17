import Vue from 'vue'
import Router from 'vue-router'
import FlowDemo from '@/flowdemo.vue'
import GridLayout from '@/gridLayout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GridLayout',
      component: GridLayout
    },
    {
      path: '/a',
      name: 'FlowDemo',
      component: FlowDemo
    }
  ]
})
