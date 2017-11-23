<template>
    <div id="add-thank">
      <form action="" @submit.prevent="submit">
        <mt-field label="感谢内容" placeholder="请填写感谢内容" type="textarea" rows="20" v-model="formData.content">
        </mt-field>
        <getCode codeType="PUBLISH" @mobile="getMobile" @code="getCode"></getCode>
        <!--<mt-field label="悬赏金额" v-model="formData.awardBonus" type="number">

        </mt-field>-->
        <div class="com_btn_style">
          <mu-raised-button label="致谢" icon="favorite_border" class="publish-btn" backgroundColor="#009a61" :fullWidth='true' @click="saveData()"/>
        </div>
      </form>
    </div>
  </template>
  <script>
    import { addThanksEmail } from 'services/service'
    import getCode from 'components/get-code.vue'
    import { Toast } from 'mint-ui'
    export default {
      data () {
        return {
          formData: {
            serviceStation: this.$route.params.id,
            phone: null
          },
          hintMessage: '手机号码格式有误',
          message: '获取验证码',
          isInvalid: true
        }
      },
      methods: {
        // 获取验证码
        getCode (val) {
          this.formData.authCode = val
        },
        // 获取手机号
        getMobile (val) {
          this.formData.phone = val
        },
        // 保存
        saveData () {
          addThanksEmail.bind(this)(this.formData).then(res => {
            if (res.code === '200') {
              Toast('发布成功')
              this.$router.go(-1)
            }
          })
        }
      },
      components: {
        getCode
      }
    }
  </script>
  <style lang="scss">
   #add-thank {
    .legal {
      width: 80px;
      height: 30px;
      line-height: 30px;
      background-color: rgb(0, 154, 97);
      color: #fff;
      text-align: center;
      border-radius: 10px;
      font-size: 0.3rem;
    }
    .invalid {
      width: 80px;
      height: 30px;
      line-height: 30px;
      background-color: #909090;
      color: #fff;
      text-align: center;
      border-radius: 10px;
      font-size: 0.3rem;
    }
   }
  </style>
