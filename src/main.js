// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import api from './api/index.js'

import VueResource from 'vue-resource'
Vue.use(VueResource)
// 将API方法绑定到全局
Vue.prototype.$api = api


Vue.config.productionTip = false

Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
