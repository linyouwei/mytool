import Vue from 'vue'
import Router from 'vue-router'
import Floder from '@/page/Folder/folder'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Floder
    }
  ]
})
