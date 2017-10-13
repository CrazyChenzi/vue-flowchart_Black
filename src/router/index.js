import Vue from 'vue'
import Router from 'vue-router'
import FlowDemo from '@/flowdemo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FlowDemo',
      component: FlowDemo
    }
  ]
})
