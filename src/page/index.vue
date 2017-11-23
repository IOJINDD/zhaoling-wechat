<template>
  <div id="index">
    <mt-tabbar v-model="selected" class="index_a">
      <mt-tab-item id="losePick">
        <img slot="icon" src="../assets/losePick.svg">
        失物招领
      </mt-tab-item>
      <mt-tab-item id="pickers">
        <img slot="icon" src="../assets/location_city.svg">
        招领处
      </mt-tab-item>
      <mt-tab-item id="selfService">
        <img slot="icon" src="../assets/self_service.svg">
        自助服务
      </mt-tab-item>
      <mt-tab-item id="selfCenter">
        <img slot="icon" src="../assets/ic_person_black_24px.svg">
        个人中心
      </mt-tab-item>
    </mt-tabbar>
    <mt-tab-container v-model="selected">
      <keep-alive>
        <router-view style="width: 100%">
          <mt-tab-container-item id="losePick">

          </mt-tab-container-item>
          <mt-tab-container-item id="pickers">

          </mt-tab-container-item>
          <mt-tab-container-item id="selfService">

          </mt-tab-container-item>
          <mt-tab-container-item id="selfCenter">

          </mt-tab-container-item>
        </router-view>
      </keep-alive>
    </mt-tab-container>
    <div style="width: 100%;height: 55px;">

    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        selected: '',
        allLoaded: false
      }
    },
    methods: {

    },
    watch: {
      selected: function (val) {
        console.log(`index/${val}`)
        this.$router.push({
          name: `${val}`
        })
      }
    },
    mounted () {
      if (!this.selected) {
        this.selected = 'losePick'
      }
    }
  }
</script>
<style lang="scss">
  @import "../scss/index.scss";
  #index {
    .index_a {
      a {
        color: $borderColor;
      }
    }
    .mint-tabbar {
      position: fixed;
      z-index: 999;
      border-top: 1px solid #dadada;
    }
  }
</style>
