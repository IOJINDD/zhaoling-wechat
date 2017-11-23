<!-- 填写认领信息页面 -->
<template>
    <div id="write-check-info">
      <form action="" @submit.prevent="submit" v-if="!success">
        <mt-field label="姓名" placeholder="请填写姓名" v-model="formData.claimer"></mt-field>
        <mt-field label="身份证" placeholder="请填写身份证" v-model="formData.idCard"></mt-field>
        <mt-field label="物品描述" placeholder="请填写物品描述" type="textarea" rows="4" v-model="formData.content">
        </mt-field>
        <mt-field label="认领方式"
              placeholder="请选择认领方式"
              :value="claimType"
              v-tap="{methods: goSelectWay}" ></mt-field>
        <getCode codeType="CLAIM" @mobile="getMobile" @code="getCode"></getCode>
        <div class="com_btn_style">
          <mu-raised-button label="提交" class="publish-btn" backgroundColor="#009a61" :fullWidth='true' @click="saveData()"/>
        </div>
      </form>
      <div class="weui-msg" v-else>
        <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
        <div class="weui-msg__text-area">
            <h2 class="weui-msg__title">提交成功</h2>
            <p class="weui-msg__desc">我们会在48小时之内进行审核，审核通过，将以短信形式通知您，请注意及时查收！</p>
        </div>
        <div class="weui-msg__opr-area">
            <p class="weui-btn-area">
                <a href="javascript:history.back();" class="weui-btn weui-btn_primary">返回上级</a>
            </p>
        </div>
      </div>
      <!--认领方式-->
      <mu-popup
        :open="popupWay" @close="closePopWay"
        position="bottom"
        popupClass="publish-popup-bottom">
          <mt-radio v-model="wayValue"
                    align="right"
                    :options="wayOptions">

          </mt-radio>
      </mu-popup>
    </div>
  </template>
  <script>
    import { addCheckInfo } from 'services/service'
    import getCode from 'components/get-code.vue'
    import { checkData } from 'tools/index.js'
    import { Toast } from 'mint-ui'

    export default {
      data () {
        return {
          formData: {
            losePickInfo: this.$route.params.id,
            claimType: '', // 认领类型
            idCard: '', // 身份证
            claimer: '',
            phone: '',
            content: '',
            authCode: ''
          },
          claimType: '',
          wayValue: '',
          success: false,
          wayOptions: ['自行认领', '代领代寄'],
          popupWay: false, // 选择性别弹出框是否出现
          isInvalid: true,
          hintMessage: '手机号码格式有误',
          message: '获取验证码'
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
        // 打开方式选择弹窗
        goSelectWay () {
          this.popupWay = true
          this.blurFun()
        },
        // 关闭方式弹窗
        closePopWay (val) {
          this.popupWay = false
        },
        // 关闭软键盘
        blurFun () {
          Array.from(document.querySelectorAll('.mint-field-core')).forEach((ele) => {
            ele.blur()
          }, this)
        },
        // 保存
        saveData () {
          let params = [this.formData.claimer, this.formData.idCard, this.claimType, this.formData.phone]
          let toast = ['姓名不能为空', '身份证不能为空', '认领方式不能为空', '手机号码不能为空']
          checkData(params, toast, () => {
            if (this.formData.idCard.length !== 18) {
              Toast('身份证有误')
              return true
            }
            if (this.claimType === '自行认领') {
              this.formData.claimType = 'MYSELF'
            } else {
              this.formData.claimType = 'EXPRESS'
            }
            addCheckInfo.bind(this)(this.formData).then(res => {
              if (res.code === '200') {
                this.success = true
              } else {
                Toast(res.msg)
              }
            })
          })
        }
      },
      watch: {
        wayValue: function (val) {
          this.claimType = val
        }
      },
      components: {
        getCode
      }
    }
  </script>
  <style>
    #write-check-info .legal {
      width: 80px;
      height: 30px;
      line-height: 30px;
      background-color: rgb(0, 154, 97);
      color: #fff;
      text-align: center;
      border-radius: 10px;
      font-size: 1.2rem;
    }
    #write-check-info .invalid {
      width: 80px;
      height: 30px;
      line-height: 30px;
      background-color: #909090;
      color: #fff;
      text-align: center;
      border-radius: 10px;
      font-size: 1.2rem;
    }
  </style>
