<!-- 寻物详情 -->
<template>
  <div id="lose-detail" v-if="detailData">
    <mu-appbar :title="title" class="text-center">
      <mu-icon-button icon="keyboard_arrow_left" @click="goBack" slot="left"/>
      <mu-icon-button icon="favorite_border" slot="right"/>
    </mu-appbar>
    <div style="width: 100%;height: 45px;"></div>
    <detail class="border" :detailData="detailData">

    </detail>
  </div>
</template>
<script>
  import detail from 'components/lose-and-pick-detail'
  import { showInfoDetail } from 'services/service.js'
  export default {
    data () {
      return {
        detailData: {},
        title: '寻物信息详情'
      }
    },
    methods: {
      // 前去填写认领信息
      goCheck () {
        this.$router.push({
          name: 'writeCheckInfo',
          params: {
            id: this.detailData.id
          }
        })
      },
      // 返回上级
      goBack () {
        this.$router.go(-1)
      }
    },
    created () {
      window.scrollTo(0, 0)
    },
    components: {
      detail
    },
    beforeRouteEnter: (to, from, next) => {
      next((vm) => {
        // 获取信息详情
        showInfoDetail.bind(vm)(to.params.id).then(res => {
          vm.detailData = res.dataBody

          // 解析拾取地址
          if (vm.detailData.state === vm.detailData.city) {
            vm.detailData.fieldArea = vm.detailData.city + vm.detailData.district
          } else {
            vm.detailData.fieldArea = vm.detailData.state + vm.detailData.city + vm.detailData.district
          }
        })
      })
    }
  }
</script>
<style lang="scss">
  #lose-detail {
    background-color: #fff;
  }
</style>
