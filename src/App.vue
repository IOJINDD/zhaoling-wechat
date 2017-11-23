<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { JsJdkParams } from './services/service.js'
import clientInfo from 'lm-se-client-info'
export default {
  name: 'app',
  mounted () {
    let ua = navigator.userAgent
    // 判断是否在支付宝内
    if (ua.match(/Alipay/i) !== null) {
      global.ISALIPAY = true
    } else {
      global.ISALIPAY = false
    }
    /* eslint-disable */
    // 判断是否在微信环境里
    if (clientInfo.render.isWechatWebView) {
      global.ISWX = true
      JsJdkParams.bind(this)({
        url: window.location.href.split('#')[0]
      }).then(res => {
        global.WXSDK = res
      })
    } else {
      global.ISWX = false
    }
  }
}
</script>

<style lang="scss">
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
