<!-- tab个人中心 -->
<template>
  <div id="self-center">
    <div v-if="role === 'ROLE_S_ADMIN'">
      <mt-cell :title="userObj.username" is-link @click.native="viewInfo">
        <span>查看个人信息</span>
      </mt-cell>

    </div>
    <div v-if="role === 'ROLE_USER'">
      <mt-cell :title="userObj.username" is-link @click.native="goSelfInfo">
        <span>完善个人信息</span>
      </mt-cell>
      <mu-flexbox>
        <mu-flexbox-item class="flex-item">
          <span>11</span><br>
          <label for="">我的寻物</label>
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-item">
          <span>11</span><br>
          <label for="">我的招领</label>
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-item">
          <span>11</span><br>
          <label for="">我的认领</label>
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
    <div class="weui-panel" v-if="role === 'ROLE_S_ADMIN'">
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_small-appmsg">
                <div class="weui-cells">
                    <a class="weui-cell weui-cell_access" href="javascript:;" @click="modifyPassPop = true">
                        <div class="weui-cell__bd">
                            <p>修改密码</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                    <!-- <a class="weui-cell weui-cell_access" href="javascript:;">
                        <div class="weui-cell__bd">
                            <p>切换身份</p>
                        </div>
                        <span class="weui-cell__ft" v-if="role === 'ROLE_USER'">普通用户</span>
                        <span class="weui-cell__ft" v-if="role === 'ROLE_S_ADMIN'">招领处</span>
                    </a> -->
                </div>
            </div>
        </div>
    </div>
    <div class="com_btn_div">
      <mu-raised-button label="退出登录" class="demo-raised-button" backgroundColor="#fff" color="#ef4f4f" :fullWidth=true @click="logout" style="margin-top: 20px;"/>
    </div>

    <mt-popup
      position="right"
      v-model="modifyPassPop">
        <div id="modify-password">
          <mu-appbar title="修改密码" class="text-center">
            <mu-icon-button icon="keyboard_arrow_left" slot="left" @click.native="modifyPassPop = false"/>
          </mu-appbar>
          <div style="width: 100%;height: 45px;"></div>
          <mt-field label="原密码" placeholder="输入旧密码" type="password" v-model="oldPassword" style="margin-top: 20px;"></mt-field>
          <mt-field label="新密码" placeholder="请设置新密码" type="password" v-model="newPassword" style="margin-top: 30px;"></mt-field>
          <mt-field label="确认密码" placeholder="再次输入新密码" type="password" v-model="surePassword" style="border-top: 1px solid #ccc;"> </mt-field>
          <div class="com_btn_div">
            <mu-raised-button label="修改密码" class="demo-raised-button" backgroundColor="#35c590" color="#fff" :fullWidth=true @click="modifyPsd()" style="margin-top: 20px;"/>
          </div>
        </div>
    </mt-popup>
  </div>
</template>
<script>
  import { currentUserEntity, logout, modifyPassword } from 'services/service'
  import { checkData } from 'tools/index'
  import { MessageBox, Toast } from 'mint-ui'
  export default {
    data () {
      return {
        role: '', // 角色
        userObj: {}, // 用户信息
        oldPassword: '', // 旧密码
        newPassword: '', // 新密码
        surePassword: '', // 确认密码
        modifyPassPop: false // 修改密码弹出框
      }
    },
    methods: {
      // 退出登录
      logout () {
        MessageBox.confirm('确定要退出吗？').then(() => {
          logout.bind(this)().then(res => {
            window.localStorage.removeItem('userObj')
            this.$router.push({
              name: 'login'
            })
          })
        })
      },
      // 招领处查看个人信息
      viewInfo () {
        this.$router.push({
          name: 'pickerInfo',
          params: {
            id: this.userObj.serviceStation
          }
        })
      },
      // 个人用户编辑信息
      goSelfInfo () {
        this.$router.push({
          name: 'selfInfo'
        })
      },
      // 修改密码
      modifyPsd () {
        let params = [this.oldPassword, this.newPassword, this.surePassword]
        let toast = ['旧密码不能为空', '新密码不能为空', '确认密码不能为空']
        checkData(params, toast, () => {
          modifyPassword.bind(this)({
            id: this.userObj.id,
            oldPassword: this.oldPassword,
            password: this.newPassword
          }).then(res => {
            if (res.code === '200') {
              Toast('修改成功')
              this.modifyPassPop = false
            }
          })
        })
      }
    },
    components: {
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        // vm.userObj = JSON.parse(window.localStorage.getItem('userObj'))
        currentUserEntity.bind(vm)().then(res => {
          vm.role = res.dataBody.role
          vm.userObj = res.dataBody
        })
        console.log(vm.userObj)
      })
    }
  }
</script>
<style lang="scss">
  @import '../scss/variables.scss';
  #self-center {
    .mint-cell:first-child .mint-cell-wrapper {
      height: 120px;
      font-weight: 200;
      color: #fff;
      background-color: #35c590;
    }
    .mint-cell-text {
      font-size: 0.4rem;
      font-weight: 500;
    }
    .mint-cell-value {
      color: #fff;
      font-weight: 500;
    }
    .mu-flexbox {
      background-color: #fff;
    }
    .flex-item {
      text-align: center;
      line-height: 0.6rem;
      padding: 15px;
      span {
        font-size: 0.5rem;
      }
      label {
        font-size: 0.35rem;
        color: #9e9e9e;
      }
    }
    .weui-cell__bd {
      font-size: 0.4rem;
    }
    .weui-cell__ft {
      font-size: 0.35rem;
    }
    .weui-cell_access .weui-cell__ft:after {
      border-color: $textColor;
    }
    .mint-popup-right {
      height: 100%;
      width: 100%;
    }
    .mint-popup {
      background-color: #f3f3f3;
    }
  }
  .mint-toast {
    z-index: 99999;
  }
  .mint-indicator-wrapper {
    z-index: 99999;
  }
</style>
