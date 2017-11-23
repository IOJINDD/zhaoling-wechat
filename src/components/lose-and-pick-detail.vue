<template>
    <section id="lose-and-pick-detail" v-if="detailData">
      <div>
        <div class="border">
          <layout justify="space-between">
            <flex>
              <h1 class="title">
                {{ detailData.title }}
              </h1>
            </flex>
          </layout>
          <layout>
            <flex class="margin">
              <span class="com_labelStyle">
                {{ detailData.type }}
              </span>
            </flex>
            <flex :class="{'text-right': true, 'com_green': detailData.status == '未认领', 'com_gay': detailData.status == '已下架', 'com_bro': detailData.status == '待核查'}" style="font-size: 0.4rem" v-if="LoseOrPick !== 'Lose'">
              {{ detailData.status }}
            </flex>
          </layout>
          <layout justify="space-between">
            <flex>
              <!-- <span class="com_list_time">
                {{ detailData.picker }}
              </span> -->
              <span class="com_list_time">
                {{ detailData.createTime | date}}发布
                <span style="color: #6ca9da;" @click="watch" v-if="!ISALIPAY">关注招领台</span>
              </span>
            </flex>
          </layout>
          <div class="divide margin" v-if="detailData.publishPaths && detailData.publishPaths.length > 0"></div>
          <openPhoto :imgPaths="detailData.publishPaths"></openPhoto>
        </div>
        <mt-field label="物品描述" type="textarea" rows="4"
                  :value="detailData.content"
                  v-show="detailData.isPublicContent || detailData.isPublicContent == null"
                  :disabled="true">
        </mt-field>
        <mt-field :label="detailData.loseOrPick == '寻物' ? '丢失地区' : '拾取地区'"
                  :disabled="true"
                  :value="detailData.fieldArea">
        </mt-field>
        <mt-field :label="detailData.loseOrPick == '寻物' ? '丢失地址' : '拾取地址'"
                  :disabled="true" type="textarea"
                  :value="detailData.address"></mt-field>
        <mt-field :label="detailData.loseOrPick == '寻物' ? '丢失时间' : '拾取时间'"
                  :disabled="true"
                  :value="detailData.pickLoseTime | date"></mt-field>
        <mt-field v-if="!detailData.serviceStation"
                  label="联系人"
                  :disabled="true"
                  :value="detailData.pickerLoser" ></mt-field>
        <mt-field label="证件号码"
                  :disabled="true"
                  :value="detailData.cardNo"
                  v-if="detailData.cardNo"></mt-field>
        <mt-field label="证件姓名"
                  :disabled="true"
                  :value="detailData.cardName"
                  v-if="detailData.cardName"></mt-field>
        <mt-field label="发布方"
                  :disabled="true"
                  :value="pickerName"
                  v-if="detailData.serviceStation"></mt-field>
        <mt-field label="联系电话"
                  :disabled="true"
                  :value="detailData.pickerLoserPhone"
                  v-if="!detailData.serviceStation"></mt-field>
        <mt-field label="联系方式"
                  :disabled="true"
                  :value="pickerPhone"
                  v-if="detailData.serviceStation">
          <div class="legal" @click="callPickerPhone">
            <span>
              呼叫招领处
            </span>
          </div>
        </mt-field>
        <mt-field label="存放地点"
                  :disabled="true"
                  :value="detailData.storeAddress"
                  v-if="detailData.serviceStation"></mt-field>
        <mt-field label="物品编号"
                  :disabled="true"
                  :value="detailData.serialNo"
                  v-if="detailData.serviceStation"></mt-field>
        <mt-field label="信息编号"
                  :disabled="true"
                  :value="detailData.infoNo"></mt-field>
        <mt-field label="备注" type="textarea" rows="4"
                  :value="detailData.remark"
                  :disabled="true"
                  v-show="detailData.isPublicRemark || detailData.isPublicRemark == null"></mt-field>
      </div>
      <!-- 未登陆 -->
      <div class="btn-style"
            v-if="isSelf == '0' && detailData.loseOrPick == '招领' && detailData.serviceStation && (detailData.status == '未认领' || detailData.status == '待核查')">
        <mu-raised-button label="去认领" class="demo-raised-button"
                          backgroundColor="#1e9d5f"
                          :fullWidth=true
                          @click="goCheck"/>
      </div>
      <!-- 个人登录 -->
      <div class="btn-style" v-if="isSelf == '1' && detailData.status !== '已下架'">
        <mu-raised-button label="下架" class="demo-raised-button" style="margin-top: 20px;"
                          backgroundColor="#ef4f4f"
                          :fullWidth=true
                          @click="delProduct"/>
      </div>
    </section>
  </template>
  <script>
    import { Toast, MessageBox } from 'mint-ui'
    import { doubleCall, delLosePickInfo, applyToRefund } from 'services/service.js'
    import openPhoto from 'components/open-photo.vue'
    export default {
      data () {
        return {
          // address: '',
          pickTime: '',
          phone: '',
          hintMessage: '手机号码格式有误',
          isInvalid: true,
          fieldArea: null,
          isSelf: this.$route.params.isSelf, // 2是招领处登录，1是个人登录，0是没登录
          id: this.$route.params.id,
          pickerPhone: this.$route.query.phone, // 招领处联系方式
          ISALIPAY: false,
          pickerName: this.$route.query.name // 招领处名称
        }
      },
      props: {
        detailData: {
          type: Object
        },
        LoseOrPick: {
          type: String
        }
      },
      filters: {
        date (input) {
          if ((input + '').slice(-7) === '3600000') {
            return new Date(input).format('yyyy年MM月dd日')
          } else {
            return new Date(input).format('yyyy年MM月dd日 hh:mm')
          }
        }
      },
      methods: {
        // 打电话
        callPhone () {
          if (this.isInvalid) {
            Toast(this.hintMessage)
          } else {
            MessageBox.confirm('请确认手机号码是否正确').then(() => {
              doubleCall.bind(this)(this.phone, this.$route.params.id).then(res => {
                if (res.code === '200') {
                  Toast('呼叫成功')
                }
              })
            })
          }
        },
        // 打招领处电话
        callPickerPhone () {
          console.log(this.pickerPhone)
          window.location.href = 'tel:' + this.pickerPhone
        },
        // 前去修改
        goModify () {
          this.$router.push({
            name: 'modify-info',
            params: {
              type: 'picker-pick',
              id: this.id
            }
          })
        },
        // 追加悬赏
        addBonus () {
          this.$router.push({
            name: 'award-bonus',
            params: {
              id: this.id
            }
          })
        },
        // 前去填写认领信息
        goCheck () {
          this.$router.push({
            name: 'write-check-info',
            params: {
              id: this.id
            }
          })
        },
        // 关注公众号
        watch () {
          window.location = 'http://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI1MDcwNTUwNg==#wechat_redirect'
        },
        // 下架失物招领
        delProduct () {
          MessageBox.confirm('确定下架该信息吗？').then(action => {
            delLosePickInfo.bind(this)(this.id).then(res => {
              if (res.code === '200') {
                Toast('下架成功')
                this.$router.go(-1)
              }
            })
          })
        },
        // 申请退款
        applyToRefund () {
          MessageBox.confirm('是否确认申请退款？').then(() => {
            applyToRefund.bind(this)({
              id: this.id
            }).then(res => {
              if (res.code === '200') {
                Toast('申请成功')
              } else {
                Toast(res.msg)
              }
            })
          })
        }
      },
      watch: {
        phone: function (val) {
          if (!(/^1[3|4|5|7|8]\d{9}$/.test(val))) {
            this.isInvalid = true
          } else {
            this.isInvalid = false
          }
        }
      },
      components: {
        openPhoto
      },
      mounted () {

      }
    }
  </script>
  <style lang="scss">
    #lose-and-pick-detail {
      .title {
        font-size: 0.53rem;
        line-height: 0.8rem;
      }
      .border {
        margin: 20px 10px;
      }
      .margin {
        margin: 15px 0;
      }
      .legal {
        background-color: #35c590;
        color: #fff;
        text-align: center;
        padding: 8px;
        font-size: 0.3rem;
      }
      .mint-field .mint-cell-title {
        width: 5em;
      }
    }
  </style>
