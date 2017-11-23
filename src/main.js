// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import MintUI from 'mint-ui'
import MuseUI from 'muse-ui'
import 'mint-ui/lib/style.css'
import 'muse-ui/dist/muse-ui.css'
import 'scss/index.scss'
import 'weui/dist/style/weui.min.css'
import vueTap from 'v-tap'
import layout from 'components/layout'
import flex from 'components/flex'
import { prototypeJS } from 'tools/prototype.js'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(MintUI)
Vue.use(MuseUI)
Vue.use(vueTap)
Vue.component('layout', layout)
Vue.component('flex', flex)

// 执行方法
prototypeJS()

// 添加一个请求拦截器
axios.interceptors.request.use(function (request) {
  MintUI.Indicator.open('Loading')
  return request
}, function (err) {
  return Promise.reject(err)
})

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.code === '400' && response.data.msg) {
    MintUI.Toast(response.data.msg)
  }
  MintUI.Indicator.close()
  return response
}, function (err) {
  console.log(typeof err)
  if (err.toString().indexOf('401') > 0) {
    window.localStorage.removeItem('userObj')
    window.location = '/#/login'
  }
  MintUI.Indicator.close()
  return Promise.reject(err)
})

// 注册一个名为 v-focus 的全局自定义指令
Vue.directive('focus', {
  // 当绑定的元素插入到 DOM 时调用此函数……
  inserted: function (el) {
    // 元素调用 focus 获取焦点
    el.focus()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
