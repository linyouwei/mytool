import Vue from 'vue'
import Router from 'vue-router'
import Floder from '@/page/Folder/folder'
import Json from '@/page/Json/json'
import Qrcode from '@/page/Qrcode/qrcode'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Floder
    },
    {
      path: '/json',
      component: Json
    },
    {
       path: '/qrcode',
       component: Qrcode
    }
  ]
})
