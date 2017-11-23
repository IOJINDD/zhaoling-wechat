<template>
    <div id="picker-detail2">
      <mu-grid-list class="gridlist-demo" :cols=1>
        <mu-grid-tile>
          <img :src="dataDetail.headIcon" style="max-width: 100%;max-height: 100%;" v-if="dataDetail.headIcon"/>
          <img :src="defaultImg" style="max-width: 80%;max-height: 80%;margin-top:5%;" v-else/>
          <span slot="title">{{dataDetail.name}}</span>
          <mu-badge :content="String(dataDetail.thanksNum)" class="demo-icon-badge" circle color="#3dab80" slot="action" v-tap="{methods: goThankList}">
            <mu-icon value="mail_outline"/>
          </mu-badge>
          <!--<mu-icon-button icon="star_border" slot="action"/>-->
        </mu-grid-tile>
      </mu-grid-list>
      <mt-field label="电话" :disabled="true" :value="dataDetail.phone"></mt-field>
      <mt-field label="工作时间" :disabled="true" :value="dataDetail.workTime"></mt-field>
      <mt-field label="所在区域" :disabled="true" :value="fieldArea"></mt-field>
      <mt-field label="详细地区" :disabled="true" :value="dataDetail.address"></mt-field>
      <mt-field label="简介" :disabled="true" :rows="Math.ceil(dataDetail.introduction.length/25) + ''" type="textarea" :value="dataDetail.introduction" v-if="dataDetail.introduction"></mt-field>
      <openPhoto :imgPaths="dataDetail.paths" v-if="dataDetail.paths"></openPhoto>
      <div style="height: 56px;width: 100%">

      </div>
      <!-- <div class="com_btn_style">
        <mu-raised-button label="填写感谢信" backgroundColor="#009a61" :fullWidth='true' icon="favorite_border" @click="goAddThank()"/>
      </div> -->
      <br>
    </div>
  </template>
  <script>
    import { showServiceStationDetail, logout } from 'services/service.js'
    import { MessageBox } from 'mint-ui'
    import defaultImg from 'assets/logo.png'
    import openPhoto from 'components/open-photo.vue'
    export default {
      data () {
        return {
          dataDetail: {},
          defaultImg,
          fieldArea: null,
          id: this.$route.params.id
        }
      },
      methods: {
        // 查看感谢信列表
        goThankList () {
          this.$router.push({
            name: 'thankNoteList',
            params: {
              id: this.id
            }
          })
        },
        // 发布感谢信
        goAddThank () {
          this.$router.push({
            name: 'addThank',
            params: {
              id: this.id
            }
          })
        },
        // 退出登录
        logout () {
          MessageBox.confirm('确定要退出吗？').then(() => {
            logout.bind(this)().then(res => {
              window.localStorage.removeItem('userId')
              window.localStorage.removeItem('pickerObj')
              this.$router.push({
                name: 'Picker-login'
              })
            })
          })
        }
      },
      components: {
        openPhoto
      },
      beforeRouteEnter (to, from, next) {
        next((vm) => {
          showServiceStationDetail.bind(vm)(to.params.id).then((res) => {
            vm.dataDetail = res.dataBody
            window.document.title = vm.dataDetail.name + '详情'
            if (vm.dataDetail.state === vm.dataDetail.city) {
              vm.fieldArea = vm.dataDetail.city + vm.dataDetail.district
            } else {
              vm.fieldArea = vm.dataDetail.state + vm.dataDetail.city + vm.dataDetail.district
            }
          })
        })
      }
    }
  </script>
  <style lang="scss">
    #picker-detail2 {
      background-color: #fff;
      .demo-icon-badge {
        margin-right: 20px;
      }
    }
    #picker-detail2 {
      .mint-field {
        .mint-cell-title {
          width: 77px;
        }
      }
    }
  </style>
