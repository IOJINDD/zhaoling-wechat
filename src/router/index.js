import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import loseList from 'page/lose-list'
import login from 'page/login'
import index from 'page/index'
import searchPage from 'page/search-page'
import pickDetail from 'page/pick-detail'
import pickerDetail from 'page/picker-detail'
import thankNoteList from 'page/thank-note-list'
import writeCheckInfo from 'page/write-check-info'
import thankDetail from 'page/thank-detail'
import addThank from 'page/add-thank'
import pickerPickList from 'page/picker-pick-list'

import losePick from 'page/losePick/lose-pick' // 失物招领列表
import loseDetail from 'page/lose-detail'
import pickers from 'page/pickers'
import pickerInfo from 'page/picker-detail2' // 招领处个人信息
import selfInfo from 'page/self-Info' // 招领处个人信息
import selfService from 'page/self-service'
import selfCenter from 'page/self-center'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      redirect: '/index',
      component: HelloWorld
    }, {
      path: '/login',
      name: 'login',
      meta: {
        title: '招领登录'
      },
      component: login
    }, {
      path: '/index',
      name: 'index',
      meta: {
        title: '招领台'
      },
      component: index,
      children: [{  // tab栏
        path: '/index/losePick',
        name: 'losePick',
        component: losePick,
        meta: {
          title: '失物招领',
          keepAlive: true
        }
      }, {
        path: '/index/pickers',
        name: 'pickers',
        component: pickers,
        meta: {
          title: '招领处',
          keepAlive: true
        }
      }, {
        path: '/index/selfService',
        name: 'selfService',
        component: selfService,
        meta: {
          title: '自助服务',
          keepAlive: true
        }
      }, {
        path: '/index/selfCenter',
        name: 'selfCenter',
        component: selfCenter,
        meta: {
          title: '个人中心',
          keepAlive: true
        }
      }]
    }, {
      path: '/loseDetail/:id',
      name: 'loseDetail',
      meta: {
        title: '寻物详情'
      },
      component: loseDetail
    }, {
      path: '/searchPage',
      name: 'searchPage',
      meta: {
        title: '搜索'
      },
      component: searchPage
    }, {
      path: '/loseList',
      name: 'loseList',
      meta: {
        title: '寻物信息列表',
        keepAlive: true
      },
      component: loseList
    }, {
      path: '/pickDetail/:id',
      name: 'pickDetail',
      meta: {
        title: '招领信息详情'
      },
      component: pickDetail
    }, {
      path: '/pickerInfo/:id',
      name: 'pickerInfo',
      meta: {
        title: '个人信息' // 招领处
      },
      component: pickerInfo
    }, {
      path: '/selfInfo',
      name: 'selfInfo',
      meta: {
        title: '个人信息'
      },
      component: selfInfo
    }, {
      path: '/pickerDetail/:id',
      name: 'pickerDetail',
      meta: {
        title: '招领处详情',
        keepAlive: true
      },
      component: pickerDetail
    }, {
      path: '/thankNoteList/:id',
      name: 'thankNoteList',
      meta: {
        title: '感谢信'
        // keepAlive: true
      },
      component: thankNoteList
    }, {
      path: '/thankDetail',
      name: 'thankDetail',
      meta: {
        title: '感谢信'
      },
      component: thankDetail
    }, {
      path: '/writeCheckInfo/:id',
      name: 'writeCheckInfo',
      meta: {
        title: '填写认领信息'
      },
      component: writeCheckInfo
    }, {
      path: '/addThank/:id',
      name: 'addThank',
      meta: {
        title: '填写感谢信'
      },
      component: addThank
    }, {
      path: '/pickerPickList/:id',
      name: 'pickerPickList',
      meta: {
        title: '招领处招领信息列表',
        keepAlive: true
      },
      component: pickerPickList
    }
  ]
})
