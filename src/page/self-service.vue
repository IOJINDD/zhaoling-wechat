<!-- tab自助服务 -->
<template>
  <div id="self-service">
    <mu-appbar title="自助服务" class="appbar">
    </mu-appbar>
    <div style="width: 100%;height: 55px;"></div>
    <mu-list>
      <mu-list-item title="发布失物信息" class="border" v-if="role === 'ROLE_USER'">
        <mu-icon slot="left" value="note_add"/>
        <mu-icon slot="right" value="chevron_right"/>
      </mu-list-item>
      <mu-list-item title="发布招领信息" class="border" @click="getPayment()">
        <mu-icon slot="left" value="note_add"/>
        <mu-icon slot="right" value="chevron_right"/>
      </mu-list-item>
      <mu-list-item title="快捷认领" class="border" v-if="role === 'ROLE_USER'">
        <mu-icon slot="left" value="flight_takeoff"/>
        <mu-icon slot="right" value="chevron_right"/>
      </mu-list-item>
      <mu-list-item title="证件挂失/查询" class="border" v-if="role === 'ROLE_USER'">
        <mu-icon slot="left" value="find_in_page"/>
        <mu-icon slot="right" value="chevron_right"/>
      </mu-list-item>
      <mu-list-item title="招领处自助申请" class="border">
        <mu-icon slot="left" value="library_add"/>
        <mu-icon slot="right" value="chevron_right"/>
      </mu-list-item>
    </mu-list>
  </div>
</template>
<script>
  import { currentUserEntity } from 'services/service'
  // import { MessageBox, Toast } from 'mint-ui'

  export default {
    data () {
      return {
        role: ''
      }
    },
    methods: {
      // getPayment () {
      //   getPayment.bind(this)('苏志明', '330327199408231333').then(res => {

      //   })
      // }
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        if (window.localStorage.getItem('userObj')) {
          currentUserEntity.bind(vm)().then(res => {
            vm.role = res.dataBody.role
          })
        }
      })
    }
  }
</script>
<style lang="scss">
  @import '../scss/variables.scss';
  #self-service {
    .appbar {
      text-align: center;
      .mu-appbar-title {
        font-size: 0.4rem;
      }
    }
    .mu-list {
      background-color: #fff;
    }
    .border {
      margin-bottom: 10px;
    }
    .mu-item-left {
      .material-icons {
        color: $textColor;
      }
    }
  }
</style>
