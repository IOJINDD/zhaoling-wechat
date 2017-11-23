<template>
  <div id="lose-list">
    <searchBar @searchFun="searchFun" @touchSearch="touchSearch"  ref="searchBar" :itemTypes="itemTypes"> </searchBar>
  </div>
</template>
<script>
  import searchBar from 'components/search-bar'
  import { selectByType } from 'services/service.js'

  export default {
    data () {
      return {
        itemTypes: [] // 搜索框类型数组
      }
    },
    methods: {
      searchFun (val) {

      },
      touchSearch (val) {

      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        selectByType.bind(vm)({
          parameType: 'ITEMTYPE'
        }).then(res => {
          vm.itemTypes = res.dataBody
        })
      })
    },
    components: {
      searchBar
    }
  }
</script>
