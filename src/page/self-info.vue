<template>
  <div id="self-info">
    <mu-appbar title="个人信息" class="appbar">
      <mu-icon-button icon="keyboard_arrow_left" @click="goBack" slot="left"/>
    </mu-appbar>
    <div style="width: 100%;height: 45px;"></div>
    <div class="weui-panel">
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_small-appmsg">
                <div class="weui-cells">
                    <a class="weui-cell weui-cell_access" href="javascript:;">
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>姓名</p>
                        </div>
                        <span class="weui-cell__ft">{{ userObj.realName }}</span>
                    </a>
                    <a class="weui-cell weui-cell_access" href="javascript:;">
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>手机号</p>
                        </div>
                        <span class="weui-cell__ft">{{ userObj.mobilePhone }}</span>
                    </a>
                    <a class="weui-cell weui-cell_access" href="javascript:;">
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>称谓</p>
                        </div>
                        <span class="weui-cell__ft">{{ userObj.sex }}</span>
                    </a>
                    <a class="weui-cell weui-cell_access" href="javascript:;">
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>邮箱</p>
                        </div>
                        <span class="weui-cell__ft">{{ userObj.email }}</span>
                    </a>
                    <a class="weui-cell weui-cell_access" href="javascript:;">
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>所在地区</p>
                        </div>
                        <span class="weui-cell__ft">{{ userObj.state }}{{ userObj.city }}{{ userObj.district }}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
  import { currentUserEntity } from 'services/service'

  export default {
    data () {
      return {
        userObj: {}
      }
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      }
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        currentUserEntity.bind(vm)().then(res => {
          vm.userObj = res.dataBody
        })
      })
    }
  }
</script>
<style lang="scss">
  #self-info {
    .appbar {
      text-align: center;
    }
    .weui-cells {
      line-height: 2.470588;
      font-size: 0.35rem;
    }
  }
</style>
