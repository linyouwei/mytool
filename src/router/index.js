import Vue from 'vue'
import Router from 'vue-router'
import Floder from '@/page/Folder/folder'
import Json from '@/page/Json/json'
import Qrcode from '@/page/Qrcode/qrcode'
import Table from '@/page/Table/table'
import TableTest from '@/page/TableTest/table'
import Linkage from '@/page/Linkage/linkage'


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
    },
      {
          path: '/linkage',
          component: Linkage
      },
      {
          path: '/table',
          component: Table
      },
      ,
      {
          path: '/tabletest',
          component: TableTest
      }

  ]
})
