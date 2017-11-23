<template>
  <div id="picker-pick-list">
    <searchBar  ref="searchBar"
                @isSearch="isSearchFun"
                @searchFun="searchFun"
                :itemTypes="itemTypes"
                :areaIsShow=false> </searchBar>
    <div v-if="!isSearch">
      <div class="fixedDiv"></div>
      <mu-grid-list class="gridlist-demo" :cols=1 :rows=1>
        <mu-grid-tile>
          <img :src="detailData.headIcon" style="max-width: 100%;max-height: 100%;" v-if="detailData.headIcon"/>
          <img :src="defaultImg" style="max-width: 80%;max-height: 80%;margin-top:5%;" v-else/>
          <span slot="title" v-tap="{methods: goDetail, id: detailData.id}">{{detailData.name}}</span>
          <span slot="subTitle"><br>
          <b>{{detailData.state}}{{detailData.city}}{{detailData.district}}{{detailData.address}}</b>
          <!--<mu-icon-button icon="star_border" slot="action"/>-->
          </span>
        </mu-grid-tile>
      </mu-grid-list>
      <pick-list :dataBody="dataBody" :pickerDetail="detailData">
      </pick-list>
      <div @click="loadBottom" class="com_more" v-if="allLoaded">点击加载更多</div>
    </div>
  </div>
</template>
<script>
  import searchBar from 'components/search-bar'
  import pickList from 'components/pick-list'
  import defaultImg from 'assets/logo.png'
  import { selectByType, showServiceStationDetail, listLosePickInfo } from 'services/service.js'

  // 获取招领处详情列表，多传一个 招领处id(serviceStation)
  function getInfo (vue) {
    vue.allLoaded = false
    listLosePickInfo.bind(vue)(vue.searchData, vue.infoData.pageNum, vue.infoData.pageSize).then(res => {
      if (vue.infoData.pageNum < res.dataBody.totalPages) {
        vue.allLoaded = true
      }
      res.dataBody.data.forEach(function (element) {
        vue.dataBody.push(element)
      }, vue)
      console.log(vue.dataBody)
    })
  }
  export default {
    data () {
      return {
        itemTypes: [], // 搜索框类型数组
        detailData: {}, // 招领处详情
        isSearch: false, // 是否显示搜索列表
        defaultImg, // 招领处默认logo
        searchData: { // 搜索参数
          serviceStation: this.$route.params.id,
          keyword: '', // 模糊查询的字段
          parameType: '' // 筛选类别(参数类别)
        },
        infoData: {
          pageNum: 1,
          pageSize: 10
        },
        dataBody: [], // 招领信息
        allLoaded: true
      }
    },
    methods: {
      goDetail (param) {
        this.$router.push({
          name: 'pickerDetail',
          params: {
            id: param.id
          }
        })
      },

      // 获取搜索页状态
      isSearchFun (val) {
        this.isSearch = val
      },

      // 执行搜索方法
      searchFun (val) {
        this.isSearch = false
        this.dataBody = [] // 第一次搜索清空数据
        // 设置搜索参数
        this.searchData.keyword = val.keyword
        this.searchData.parameType = val.parameType
        this.searchData.state = val.state
        this.searchData.city = val.city
        // 执行方法
        getInfo(this)
      },

      // 加载更多
      loadBottom () {
        this.infoData.pageNum++
        getInfo(this)
      }
    },
    mounted () {
      getInfo(this)
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 获取类型
        selectByType.bind(vm)({
          parameType: 'ITEMTYPE'
        }).then(res => {
          vm.itemTypes = res.dataBody
        })
        // 获取招领处详情
        showServiceStationDetail.bind(vm)(to.params.id).then(res => {
          vm.detailData = res.dataBody
          window.document.title = vm.detailData.name
        })
      })
    },
    components: {
      searchBar,
      pickList
    }
  }
</script>
<style lang="scss">
  #picker-pick-list {
    .fixedDiv {
      width: 100%;
      height: 81px;
    }
    .material-icons {
      font-size: 0.4rem;
      color: #35c590;
    }
  }
</style>
