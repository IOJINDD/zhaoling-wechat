<template>
  <div id="login"  :style="{height: screenHeight + 'px'}">
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="mesLogin" title="用户登录"/>
      <mu-tab value="psdLogin" title="招领处登录"/>
    </mu-tabs>
    <div v-if="activeTab === 'psdLogin'">
      <div class="from-row">
          <mu-text-field hintText="招领处名称" type="text" v-model="psd_phone" icon="account_box"/><br/>
          <mu-text-field hintText="密码" type="password" v-model="psd_password" icon="security"/><br/>
      </div>
      <div class="btn-top">
        <mu-raised-button backgroundColor="rgb(53, 197, 144)" label="登录" fullWidth @click="goPsdLogin()"/>
      </div>
    </div>
    <div v-if="activeTab === 'mesLogin'">
      <div class="from-row">
          <mu-text-field hintText="手机号" type="tel" v-model="mes_phone" icon="phone_iphone"/><br/>
          <mu-text-field hintText="验证码" type="text" v-model="mes_code" icon="security"/><br/>
          <span class="get-code" @click="getCode()">
            {{ message }}
          </span>
      </div>
      <div class="btn-top">
        <mu-raised-button backgroundColor="rgb(53, 197, 144)" label="登录" fullWidth @click="goMesLogin()"/>
      </div>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import { sendLoginVerifyCode, login } from 'services/service'
  import { checkData } from 'tools/index'
  let time = 0
  export default {
    data () {
      return {
        activeTab: 'psdLogin',
        screenHeight: window.screen.height,
        psd_phone: '', // 密码登录 手机号
        psd_password: '', // 密码登录 密码
        mes_phone: '', // 短信登录 手机号
        mes_code: '', // 短信登录 密码
        isInvalid: true, // 手机号是否正确
        hintMessage: '手机号码格式有误', // 提示语
        message: '获取验证码'
      }
    },
    watch: {
      // 监听手机号格式是否正确
      mes_phone: function (val) {
        if (!(/^1[3|4|5|7|8]\d{9}$/.test(val))) {
          if (time === 0) {
            this.isInvalid = true
            this.hintMessage = '手机号码格式有误'
          }
        } else {
          if (time === 0) {
            this.isInvalid = false
            this.hintMessage = '验证已发送，请稍后再试'
          }
        }
      }
    },
    methods: {
      // 切换登录方式
      handleTabChange (val) {
        this.activeTab = val
      },
      // 获取验证码
      getCode () {
        if (!this.isInvalid) {
          this.isInvalid = true
          sendLoginVerifyCode.bind(this)(this.mes_phone, 'LOGIN').then(res => {
            if (res.code === '200') {
              Toast(res.msg)
            }
            time = 60
            let countDown = setInterval(() => {
              this.message = '重新发送' + time
              time--
              if (time === 0) {
                clearInterval(countDown)
                this.isInvalid = false
                this.message = '获取验证码'
              }
            }, 1000)
          })
        } else {
          Toast(this.hintMessage)
        }
      },
      // 密码登录
      goPsdLogin () {
        checkData([this.psd_phone, this.psd_password], ['手机号不能为空', '密码不能为空'], () => {
          login.bind(this)({
            username: this.psd_phone,
            password: this.psd_password
          }).then(res => {
            Toast(res.msg)
            if (res.code === '200') {
              window.localStorage.setItem('userObj', JSON.stringify(res.dataBody))
              this.$router.push({
                name: 'index'
              })
            }
          })
        })
      },
      // 验证码登录
      goMesLogin () {
        checkData([this.mes_phone, this.mes_code], ['手机号不能为空', '验证码不能为空'], () => {
          login.bind(this)({
            mobilePhone: this.mes_phone,
            code: this.mes_code
          }).then(res => {
            Toast(res.msg)
            if (res.code === '200') {
              window.localStorage.setItem('userObj', JSON.stringify(res.dataBody))
              this.$router.push({
                name: 'index'
              })
            }
          })
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../scss/index.scss";
  #login {
    background-color: #fff;
    padding: 0px 20px;
    .mu-tabs {
      background-color: #fff;
    }
    .mu-tab-link {
      color: #9fa3b0;
    }
    .mu-tab-active {
      color: #414a60;
    }
    .mu-tab-link-highlight {
      background-color: $borderColor;
    }
    .mu-text-field-focus-line {
      background-color: $borderColor;
    }
    .mu-text-field.focus-state {
      color: $borderColor;
    }
    .mu-text-field {
      width: 100%;
    }
    .from-row {
      margin-top: 48px;
    }
    .btn-top {
      margin-top: 22px;
    }
    .mu-raised-button-label {
      font-size: 0.4rem;
      letter-spacing: 0.3rem;
    }
    .get-code {
      position: fixed;
      top: 165px;
      right: 26px;
      z-index: 20;
      color: rgb(53, 197, 144);
      font-size: 0.37rem;
      font-weight: 100;
    }
  }
</style>
