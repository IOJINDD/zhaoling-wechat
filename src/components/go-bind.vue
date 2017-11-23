<template>
  <div id="goBind">
    <!-- 跳转绑定页 -->
    <mu-dialog :open="!isBind" title="温馨提示" dialogClass="goBindDialog">
      该功能需要绑定手机号才能使用，是否现在前去绑定？
      <mu-flat-button label="暂不绑定" slot="actions" color="#bdbdbd" @click="isBind = true"/>
      <mu-flat-button label="前去绑定" slot="actions" color="#35c590" primary @click="goBind"/>
    </mu-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isBind: true // 是否绑定
      }
    },
    methods: {
      // 跳转绑定页
      goBind () {
        this.isBind = true
        this.$router.push({
          name: 'login'
        })
      }
    },
    activated () {
      // 判断当前用户是否绑定手机号
      let userData = JSON.parse(window.localStorage.getItem('authorizationInfo'))
      if (userData && userData.mobileNo) {
        this.isBind = true
      } else {
        this.isBind = false
      }
    }
  }
</script>
