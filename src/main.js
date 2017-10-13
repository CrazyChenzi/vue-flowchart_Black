// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Vuex from 'vuex'
import store from './store/index';

Vue.config.productionTip = false

Vue.use(iView);
Vue.use(Vuex);

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })
new Vue({
   store,
   router,
   render: h => h(App)
}).$mount('#app')
